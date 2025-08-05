import { Spinner, Tooltip } from "@material-tailwind/react";
import { BiSolidEdit } from "react-icons/bi";
import { IoCheckmark, IoClose } from "react-icons/io5";

const AdminManagePlaceRows = ({ places, col_className, loading }) => {

    const concatCategories = (interestCategories) => {
        return interestCategories.map(({ description }) => description).join(", ");
    };

    if (loading) {
        return (
            <tr>
                <td colSpan={4} className="place-items-center p-4 h-screen">
                    <Spinner />
                </td>
            </tr>
        )
    }

    if (places.length == 0) {
        return (
            <tr>
                <td colSpan={4} className="text-center p-4">
                    No places found
                </td>
            </tr>
        )
    }

    return places.map(({ id, name, interestCategories, active }) => {
        const classes = col_className;

        return (
            <tr key={id} className="h-16 hover:bg-gray-200">
                {/* Place name */}
                <td className={`${classes} min-w-[10rem]`}>
                    <span className="line-clamp-2 text-black">{name}</span>
                </td>
                {/* Place Interest categories */}
                <td className={`${classes} min-w-[8rem] hidden md:table-cell`}>
                    <span className="line-clamp-2 text-black">
                        {concatCategories(interestCategories)}
                    </span>
                </td>
                {/* Place status */}
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
                {/* Buttons to edit or create new event for place */}
                <td className={`${classes}`}>
                    <div className="flex items-center justify-center gap-5">
                        <Tooltip content="Edit Place" placement="top" className="text-black bg-cyan-100 border-b-2 text-[10px] p-1.5">
                            <button type="button"><BiSolidEdit className="h-5 w-5" /></button>
                        </Tooltip>
                    </div>
                </td>
            </tr>
        );
    })
}

export default AdminManagePlaceRows