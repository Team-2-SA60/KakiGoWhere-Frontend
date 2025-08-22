import {useNavigate} from "react-router-dom";
import {Tooltip} from "@material-tailwind/react";
import {BiSolidEdit} from "react-icons/bi";

const ManageEventRows = ({ eventItem, col_className }) => {
    const classes = col_className;
    const navigate = useNavigate();

    // convert LocalDate "YYYY-MM-DD" to "DD-MM-YYYY"
    const fmtLocalDateToDMY = (d) => {
        if(!d || typeof d !=="string") return "-";
        const parts = d.split("-");
        if (parts.length !== 3) return d;
        const [y, m, day] = parts;
        return `${day}-${m}-${y}`;
    };

    const handleEditClick = (e, id) => {
        e.preventDefault();
        navigate(`/admin/events/${id}`);
    };

    return (
        <tr key={eventItem.id} className="h-16 hover:bg-gray-200">
            {/*Event Name*/}
            <td className={classes}>
                <span className="line-clamp-2 text-black">
                    {eventItem.name}
                </span>
            </td>

            {/*Place Name*/}
            <td className={`${classes} hidden md:table-cell`}>
                <span className="line-clamp-2 text-black">
                    {eventItem.placeName ?? "-"}
                </span>
            </td>

            {/*Start and End Dates*/}
            <td className={classes}>
                {fmtLocalDateToDMY(eventItem.startDate)}
            </td>
            <td className={classes}>
                {fmtLocalDateToDMY(eventItem.endDate)}
            </td>

            {/*Edit details*/}
            <td className={classes}>
                <div className="flex items-center justify-center gap-5">
                    <Tooltip
                        content="Edit event"
                        placement="top"
                        className="text-black bg-cyan-100 border-b-2 text-[10px] p-1.5"
                    >
                        <button
                            type="button"
                            className="hover:text-gray-500 hover:scale-110"
                            onClick={(e) => handleEditClick(e, eventItem.id)}
                        >
                            <BiSolidEdit className="h-5 w-5" />
                        </button>
                    </Tooltip>
                </div>
            </td>

        </tr>
    );
};

export default ManageEventRows;

