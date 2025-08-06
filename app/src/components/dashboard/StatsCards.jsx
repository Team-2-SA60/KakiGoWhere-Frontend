import { Card, CardBody } from "@material-tailwind/react";

export default function StatsCards({ stats }) {
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
