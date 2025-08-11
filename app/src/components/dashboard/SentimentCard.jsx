import { useState, useEffect } from "react";
import { Card, CardBody, Spinner } from "@material-tailwind/react";
import { mlApi } from "../../utils/axios";

const sentimentCache = {}; // keep a cache for fetched sentiments
export default function SentimentCard({ placeId }) {
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading]   = useState(false);
    const [errMsg, setErrMsg]     = useState("");

    useEffect(() => {
        if (placeId == null) {
            setKeywords([]);
            return;
        }

        if (sentimentCache[placeId]) {
            setKeywords(sentimentCache[placeId]);
            return;
        }

        async function loadKeywords() {
            setLoading(true);
            setErrMsg("");

            try {
                const resp = await mlApi.get(`/adjectives?placeId=${placeId}`);
                const data = await resp.data;

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

    const Sentiments = () => {
        return keywords.map(keyword => (
            <p className="border px-2 py-1 rounded-xl bg-teal-50 text-sm cursor-pointer hover:scale-[102%] hover:bg-gray-200">{keyword}</p>
        ))
    }

    return (
        <Card className="h-fit w-full hover:bg-gray-50 hover:shadow-lg p-2 transition-all">
            <CardBody>
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
                            <div className="flex flex-wrap gap-3 place-content-center">
                                <Sentiments />
                            </div>
                        ) : (
                            <p className="text-red-800 text-sm italic">Not enough ratings to determine sentiments.</p>
                    )
                )}
            </CardBody>
        </Card>
    );
}