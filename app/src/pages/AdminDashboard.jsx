import { useState } from "react";
import Layout from '../components/admin/AdminLayout';
import StatsCards from "../components/dashboard/StatsCards";
import DateHeader from "../components/dashboard/DateHeader";
import PlaceStatisticsGrid from "../components/dashboard/PlaceStatisticsGrid";

const AdminDashboard = () => {
    const yesterday = new Date(Date.now() - 86400_000);
    const dateLabel = yesterday.toLocaleDateString(undefined, {
        year:  "numeric",
        month: "long",
        day:   "numeric",
    });

    // hard-coded stats for testing
    const sampleStats = { signUps: 42, uniqueVisits: 123 };
    const mockMonth = "2025-08";

    // track selected place id
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);

    return (
        <Layout>
            <DateHeader dateLabel={dateLabel} />
            <StatsCards stats={sampleStats} />

            <PlaceStatisticsGrid
                selectedPlaceId={selectedPlaceId}
                onSelectPlace={setSelectedPlaceId}
                month={mockMonth}
            />
        </Layout>
    )
}

export default AdminDashboard;