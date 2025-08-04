import { Tooltip } from "@material-tailwind/react";
import { BiSolidEdit } from "react-icons/bi";
import { FaCalendarPlus } from "react-icons/fa6";
import { IoCheckmark, IoClose } from "react-icons/io5";

const AdminManagePlaceRows = ({ places }) => {

    const concatCategories = (interestCategories) => {
        return interestCategories.map(({ description }) => description).join(", ");
    };

    if (places.length == 0) {
        return (
            <tr>
                <td colSpan={4} className="text-center p-4">
                    No places found
                </td>
            </tr>
        )
    }

    return places.map(({ id, name, interestCategories, active }, index) => {
        const isLast = index === places.length - 1;
        const classes = isLast ? "p-3" : "p-3 border-b border-blue-gray-50";

        return (
            <tr key={id} className="h-20 hover:bg-gray-200">
                <td className={`${classes} min-w-[10rem]`}>
                    <span className="line-clamp-2 text-black text-sm">{name}</span>
                </td>
                <td className={`${classes} min-w-[8rem] hidden md:table-cell`}>
                    <span className="line-clamp-2 text-black text-sm">
                        {concatCategories(interestCategories)}
                    </span>
                </td>
                <td className={`${classes}`}>
                    <span className="text-xl flex justify-center">
                        {active ?
                            <Tooltip content="Open" placement="top" className="text-black bg-cyan-100 border-b-2 text-[10px] p-1.5">
                                <IoCheckmark />
                            </Tooltip>
                            :
                            <Tooltip content="Close" placement="top" className="text-black bg-cyan-100 border-b-2 text-[10px] p-1.5">
                                <IoClose />
                            </Tooltip>
                        }
                    </span>
                </td>
                <td className={`${classes}`}>
                    <div className="flex items-center gap-5">
                        <Tooltip content="Edit Place" placement="top" className="text-black bg-cyan-100 border-b-2 text-[10px] p-1.5">
                            <button type="button"><BiSolidEdit className="h-5 w-5" /></button>
                        </Tooltip>
                        <Tooltip content="Add Event" placement="top" className="text-black bg-cyan-100 border-b-2 text-[10px] p-1.5">
                            <button type="button"><FaCalendarPlus className="h-4 w-4" /></button>
                        </Tooltip>
                    </div>
                </td>
            </tr>
        );
    })
}

export default AdminManagePlaceRows