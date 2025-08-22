import { useState, useEffect } from "react";
import Layout from '../components/admin_manage_place/AdminLayout';
import StatsCards from "../components/dashboard/StatsCards";
import PlaceStatisticsGrid from "../components/dashboard/PlaceStatisticsGrid";
import {
    Input,
    Popover,
    PopoverHandler,
    PopoverContent
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
        // eslint-disable-next-line
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
            <div className="w-full max-w-5xl flex flex-col lg:flex-row md:items-center justify-between gap-4 mt-14 md:mt-0 border border-gray-200 rounded-lg p-8 shadow-md bg-gradient-to-r from-blue-gray-50 to-cyan-50 hover:shadow-lg transition-all">
                {/* Title */}
                <div>
                    <span className="text-2xl font-semibold">Dashboard</span>
                </div>

                {/* Date Picker */}
                <div className="flex flex-col md:flex-row items-center gap-3 self-center">
                    <span className="text-base text-gray-900 whitespace-nowrap">View statistics for</span>

                    <Popover placement="bottom">
                        <PopoverHandler>
                            <Input
                                label="Select a Date"
                                color="black"
                                readOnly
                                value={format(date, "PPP")}
                                className="cursor-pointer hover:bg-teal-100 min-w-[160px] transition-all"
                            />
                        </PopoverHandler>

                        <PopoverContent className="relative p-4">
                            {/* Floating 'Today' Button */}
                            <button
                                onClick={() => setDate(new Date())}
                                className="absolute top-3 right-3 bg-white border border-gray-300 rounded-full px-3 py-1 text-xs font-medium shadow-sm hover:bg-gray-100 transition"
                            >
                                Today
                            </button>

                            {/* Calendar */}
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
                                    day: "rounded text-sm hover:bg-gray-200",
                                    day_button: "p-2",
                                    selected: "bg-gray-200",
                                    today: "text-cyan-700"
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
                date={date}
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