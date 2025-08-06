import React, { useState, useEffect } from "react";
import { Card, CardBody, Spinner } from "@material-tailwind/react";
import Chart from "react-apexcharts";

const visitsCache = {};

export default function HitChart({ placeId, month }) {
    const [visits, setVisits]   = useState([]);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg]   = useState("");

    useEffect(() => {
        if (placeId == null || !month) return;

        const cacheKey = `${placeId}|${month}`;
        if (visitsCache[cacheKey]) {
            setVisits(visitsCache[cacheKey]);
            return;
        }

        async function loadVisits() {
            setLoading(true);
            setErrMsg("");

            // MOCK DATA phase
            const mockData = Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const dateStr = `${month}-${String(day).padStart(2, "0")}`;
                return { date: dateStr, count: Math.floor(Math.random() * 100) + 1 };
            });
            visitsCache[cacheKey] = mockData;
            setVisits(mockData);

            // end mock, stop spinner
            setLoading(false);

            // When your real API is ready, you can replace the above with:
            /*
            try {
              const resp = await fetch(
                `/api/visits?placeId=${placeId}&month=${encodeURIComponent(month)}`
              );
              if (!resp.ok) throw new Error(`Status ${resp.status}`);
              const data = await resp.json();
              visitsCache[cacheKey] = data;
              setVisits(data);
            } catch (err) {
              console.error(err);
              setErrMsg("No visit data.");
            } finally {
              setLoading(false);
            }
            */
        }

        loadVisits();
    }, [placeId, month]);

    // format header
    const headerLabel = new Date(`${month}-01`).toLocaleString(undefined, {
        year:  "numeric",
        month: "long",
    });

    // chart config
    const chartOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: visits.map(v => v.date),
            tickAmount: 4,
            axisTicks: { show: false },
            labels: {
                style: { fontSize: "12px", colors: "#6B7280" },
            },
        },
        yaxis: {
            axisBorder: { show: true },
            labels: {
                style: { fontSize: "12px", colors: "#6B7280" },
            },
        },
        grid: {
            show: false
        },
        tooltip: {
            theme: "dark",
        },
        colors: ["#3B82F6"],
    };

    const chartSeries = [{ name: "Visits", data: visits.map(v => v.count) }];

    // render chart
    return (
        <Card className="h-64">
            <CardBody className="p-2">
                <h3 className="text-l font-semibold mb-4">
                    Page Visits ({headerLabel})
                </h3>

                {loading && (
                    <div className="flex items-center justify-center h-full">
                        <Spinner />
                    </div>
                )}

                {errMsg && (
                    <p className="text-gray-500 text-center">{errMsg}</p>
                )}

                {!loading && !errMsg && visits.length > 0 && (
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="line"
                        height={220}
                    />
                )}

                {!loading && !errMsg && visits.length === 0 && (
                    <p className="text-gray-500 text-center">No visit data</p>
                )}
            </CardBody>
        </Card>
    );
}
