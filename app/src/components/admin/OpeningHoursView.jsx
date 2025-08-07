import { RxCross1 } from "react-icons/rx";

const OpeningHoursView = ({ openingHours }) => {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const formatTime = (hour, minute) => {
        const hh = hour.toString().padStart(2, '0');
        const mm = minute.toString().padStart(2, '0');
        return `${hh}:${mm}`;
    };

    const groupedByDay = {};

    // Put into object and group by day
    openingHours.forEach((entry) => {
        const day = entry.openDay;
        if (!groupedByDay[day]) {
            groupedByDay[day] = [];
        }
        groupedByDay[day].push(entry);
    });

    return (
        <div className="flex flex-col flex-wrap md:max-h-52 w-full border border-gray-100 rounded-md shadow-sm px-3 py-1 overflow-auto gap-2">
            {dayNames.map((day, index) => (
                <div key={day} className="flex place-items-center hover:bg-gray-100 rounded-md justify-evenly transition-all">
                    <span className="font-semibold text-sm text-right min-w-[5rem]">{day}</span>
                    <div className="flex-row">
                        {groupedByDay[index] ? (
                            groupedByDay[index].map((slot) => (
                                <div key={slot.id} className="ml-4 text-sm">
                                    {formatTime(slot.openHour, slot.openMinute)} - {formatTime(slot.closeHour, slot.closeMinute)}
                                </div>
                            ))
                        ) : ""}
                    </div>
                    <button type="button"><RxCross1 className="w-4 h-4" /></button>
                </div>
            ))}
        </div>
    );
};

export default OpeningHoursView;
