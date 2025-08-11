import { Card, Spinner } from "@material-tailwind/react";
import { format } from "date-fns";

export default function StatsCards({ stats, loading, error, date }) {

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Spinner />
            </div>
        );
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl mt-5">
            {/* Sign-ups Card */}
            <Card className="p-5 rounded-xl shadow-md bg-gradient-to-r from-blue-50 to-cyan-50 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-4 justify-evenly">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a9 9 0 00-9 9h18a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                    {error ? <p className={"text-gray-500 text-center"}>{error}</p>
                        : <div className="tracking-wider">
                            <p className="text-sm font-medium text-gray-500">No. of Sign-ups</p>
                            <span className="block text-3xl font-bold text-gray-900">{stats.signUps}</span>
                            <p className="text-xs text-gray-500">
                                on {format(date, 'PP')}
                            </p>
                        </div>
                    }
                </div>
            </Card>

            {/* Unique Visits Card */}
            <Card className="p-5 rounded-xl shadow-md bg-gradient-to-r from-indigo-50 to-purple-50 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-4 justify-evenly">
                    <div className="p-3 bg-indigo-100 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-indigo-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276a1 1 0 01.894 0L22 9m-2 5v-1a9 9 0 10-18 0v1m12-4v4m-6-4v4" />
                        </svg>
                    </div>
                    {error ? <p className={"text-gray-500 text-center"}>{error}</p>
                        : <div className="tracking-wider">
                            <p className="text-sm font-medium text-gray-500">No. of Unique Visits</p>
                            <span className="block text-3xl font-bold text-gray-900">{stats.uniqueVisits}</span>
                            <p className="text-xs text-gray-500">
                                on {format(date, 'PP')}
                            </p>
                        </div>
                    }
                </div>
            </Card>
        </div>
    );
}
