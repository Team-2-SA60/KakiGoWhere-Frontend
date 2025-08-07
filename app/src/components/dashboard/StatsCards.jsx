import { Card, Spinner } from "@material-tailwind/react";

export default function StatsCards({ stats, loading, error }) {

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <p className={"text-gray-500 text-center"}>{error}</p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="py-3 px-5">
                <div>
                    <p className="text-lg font-medium text-gray-600">No. of Sign-ups</p>
                    <span className="block text-3xl font-bold mt-1">{stats.signUps}</span>
                </div>
            </Card>
            <Card className="py-3 px-5">
                <div>
                    <p className="text-lg font-medium text-gray-600">No. of Unique Visits</p>
                    <span className="block text-3xl font-bold mt-1">{stats.uniqueVisits}</span>
                </div>
            </Card>
        </div>
    );
}
