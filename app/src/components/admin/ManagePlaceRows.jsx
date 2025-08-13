import { Spinner, Tooltip } from "@material-tailwind/react";
import { BiSolidEdit } from "react-icons/bi";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AdminManagePlaceRows = ({ place, col_className, loading }) => {
    const classes = col_className;
    const navigate = useNavigate();

    const concatCategories = (interestCategories) => {
        return interestCategories.map(({ description }) => description).join(", ");
    };

    const handleEditClick = (e, id) => {
        e.preventDefault();
        const path = '/admin/place/';
        navigate(path + id);
    }

    if (loading) {
        return (
            <tr className="h-16">
                {Array.from({ length: 4 }).map((_, i) => (
                    <td key={i} className="place-items-center">
                        <Spinner />
                    </td>
                ))}
            </tr>
        )
    }

    return (
        <tr key={place.id} className="h-16 hover:bg-gray-200">
            {/* Place name */}
            <td className={`${classes}`}>
                <span className="line-clamp-2 text-black">{place.name}</span>
            </td>
            {/* Place Interest categories */}
            <td className={`${classes} hidden md:table-cell`}>
                <span className="line-clamp-2 text-black">
                    {concatCategories(place.interestCategories)}
                </span>
            </td>
            {/* Place status */}
            <td className={`${classes}`}>
                <span className="text-xl flex justify-center">
                    {place.active ?
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
                        <button type="button" className="hover:text-gray-500 hover:scale-110" onClick={e => handleEditClick(e, place.id)}><BiSolidEdit className="h-5 w-5" /></button>
                    </Tooltip>
                </div>
            </td>
        </tr>
    );
}

export default AdminManagePlaceRows