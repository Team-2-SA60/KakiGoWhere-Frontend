export default function DashboardHeader({ dateLabel }) {
    return (
        <div className="mb-3">
            <h2 className="text-3xl font-semibold">
                Statistics for {dateLabel}
            </h2>
        </div>
    );
}
