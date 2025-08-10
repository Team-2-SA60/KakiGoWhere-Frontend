import { useState, useEffect } from "react";
import Layout from '../components/admin/AdminLayout';
import StatsCards from "../components/dashboard/StatsCards";
import PlaceStatisticsGrid from "../components/dashboard/PlaceStatisticsGrid";
import {
    Input,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import api from "../utils/axios";

const AdminDashboard = () => {
    const [date, setDate] = useState(new Date());

    const dateParam = format(date, "yyyy-MM-dd");
    const monthParam = dateParam.slice(0, 7); // "YYYY-MM"

    // track stats state
    const [stats, setStats] = useState({ signUps: 0, uniqueVisits: 0 });
    const [loadingStats, setLoading] = useState(true);
    const [statsError, setStatsError] = useState("");

    // fetch stats
    useEffect(() => {
        setLoading(true);
        setStatsError("");
        getStats();
    }, [dateParam]);

    async function getStats() {
        try {
            const resp = await api.get(`/stats?date=${dateParam}`);
            const data = resp.data;
            setStats({
                signUps: data.numberOfSignUps,
                uniqueVisits: data.numberOfUniqueVisits,
            })
        } catch (err) {
            setStatsError("No stats to show.");
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    // track selected place id
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);

    return (
        <Layout>
            <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <div className="text-3xl font-semibold">Statistics for</div>

                <div>
                    <Popover placement="bottom">
                        <PopoverHandler>
                            <Input
                                label="Select a Date"
                                readOnly
                                value={format(date, "PPP")}
                            />
                        </PopoverHandler>
                        <PopoverContent>
                            <DayPicker
                                mode="single"
                                selected={date}
                                onSelect={d => d && setDate(d)}
                                showOutsideDays
                                className="border-0"
                                classNames={{
                                    caption_label: "font-bold mb-2",
                                    month_caption: "flex justify-center",
                                    nav: "flex justify-center",
                                    day: "p-1.5 rounded text-sm",
                                }}
                                components={{
                                    IconLeft: props => <ChevronLeftIcon {...props} className="h-4 w-4" />,
                                    IconRight: props => <ChevronRightIcon {...props} className="h-4 w-4" />,
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <StatsCards
                stats={stats}
                loading={loadingStats}
                error={statsError}
            />

            <PlaceStatisticsGrid
                selectedPlaceId={selectedPlaceId}
                onSelectPlace={setSelectedPlaceId}
                month={monthParam}
            />
        </Layout>
    )
}

export default AdminDashboard;