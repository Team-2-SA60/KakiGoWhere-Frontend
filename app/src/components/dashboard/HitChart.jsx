import { useState, useEffect } from "react";
import { Card, CardBody, Spinner } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import api from "../../utils/axios";

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

            try {
                const resp = await api.get(
                    `/places/${placeId}/visits?month=${encodeURIComponent(month)}`
                );
                const list = Object.entries(resp.data)
                    .map(([day, count]) => ({ date: day, count }));
                visitsCache[cacheKey] = list;
                setVisits(list);
            } catch (err) {
                console.error(err);
                setErrMsg("Could not load visits");
            } finally {
                setLoading(false);
            }
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
        <Card className="h-full w-full place-content-center hover:shadow-lg transition-all">
            <CardBody className="p-2">
                <h3 className="text-l font-semibold mb-4">
                    Page Visits for {headerLabel} (Unique Users)
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
                    />
                )}

                {!loading && !errMsg && visits.length === 0 && (
                    <p className="text-gray-500 text-center">No visit data</p>
                )}
            </CardBody>
        </Card>
    );
}
