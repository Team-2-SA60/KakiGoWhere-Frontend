import React, { useState, useEffect } from "react";
import { Card, CardBody, Spinner } from "@material-tailwind/react";

const sentimentCache = {}; // keep a cache for fetched sentiments
export default function SentimentCard({ placeId }) {
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading]   = useState(false);
    const [errMsg, setErrMsg]     = useState("");

    useEffect(() => {
        if (sentimentCache[placeId]) {
            setKeywords(sentimentCache[placeId]);
            return;
        }

        async function loadKeywords() {
            setLoading(true);
            setErrMsg("");

            try {
                const resp = await fetch(`/adjectives?placeId=${placeId}`);
                if (!resp.ok) throw new Error(`Status ${resp.status}`);
                const data = await resp.json();

                // pull common & noteworthy into arrays
                const commonArr     = Array.isArray(data.common)     ? data.common     : [];
                const noteworthyArr = Array.isArray(data.noteworthy) ? data.noteworthy : [];

                const merged = [...commonArr, ...noteworthyArr];
                sentimentCache[placeId] = merged;
                setKeywords(merged);
            } catch (err) {
                console.error(err);
                setErrMsg("No sentiment data.");
            } finally {
                setLoading(false);
            }
        }

        loadKeywords();
    }, [placeId]);

    return (
        <Card className="h-full">
            <CardBody className="p-6">
                <h3 className="text-l font-semibold mb-4">
                    People think this place is...
                </h3>

                {/*  Loading spinner  */}
                {loading && (
                    <div className="flex justify-center py-8">
                        <Spinner />
                    </div>
                )}

                {/*  Error message  */}
                {errMsg && (
                    <p className="text-gray-500">{errMsg}</p>
                )}

                {/*  Keywords list  */}
                {!loading && !errMsg && (
                    keywords.length > 0? (
                            <p className = "text-gray-700 text-sm">{keywords.join(", ")}</p>
                        ) : (
                            <p className="text-red-800 text-sm italic">Not enough ratings to determine sentiments.</p>
                    )
                )}
            </CardBody>
        </Card>
    );
}