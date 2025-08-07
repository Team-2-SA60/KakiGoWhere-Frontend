import { RxCross1 } from "react-icons/rx";

const OpeningHoursView = ({ openingHours, setOpeningHours }) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const formatTime = (hour, minute) => {
        const hh = hour.toString().padStart(2, '0');
        const mm = minute.toString().padStart(2, '0');
        return `${hh}:${mm}`;
    };

    // Put into object and group by day
    const groupedByDay = {};

    openingHours.forEach((openingHour) => {
        const day = openingHour.openDay;
        if (!groupedByDay[day]) {
            groupedByDay[day] = [];
        }
        groupedByDay[day].push(openingHour);
    });

    const handleDeleteOpeningHour = (day) => {
        setOpeningHours(prev => prev.filter(openingHour => openingHour.openDay !== day));
        delete groupedByDay.index;
    }

    if (openingHours.length === 0) {
        return (
            <div className="flex flex-col flex-wrap md:max-h-52 w-full border border-gray-100 rounded-md shadow-sm px-2 py-1 overflow-auto gap-2 text-left">
                Open 24/7, add to specify opening hours
            </div>
        )
    }

    return (
        <div className="flex flex-col flex-wrap md:max-h-52 w-full border border-gray-100 rounded-md shadow-sm px-2 py-1 overflow-auto gap-2">
            {dayNames.map((day, index) => (
                <div key={day} className="flex max-w-[250px] place-items-center hover:bg-gray-100 rounded-md gap-2 py-1 transition-all">
                    <span className="font-semibold text-sm text-left min-w-[5rem]">{day}</span>
                    <div className="flex-row divide-y">
                        {groupedByDay[index] ? (
                            groupedByDay[index].map((slot, grouped_index) => (
                                <div key={grouped_index} className="ml-4 text-sm">
                                    {formatTime(slot.openHour, slot.openMinute)} - {formatTime(slot.closeHour, slot.closeMinute)}
                                </div>
                            ))
                        ) : ""}
                    </div>
                    <button type="button" onClick={() => handleDeleteOpeningHour(index)}>{groupedByDay[index] ? <RxCross1 className="w-4 h-4" /> : ""}</button>
                </div>
            ))}
        </div>
    );
};

export default OpeningHoursView;
