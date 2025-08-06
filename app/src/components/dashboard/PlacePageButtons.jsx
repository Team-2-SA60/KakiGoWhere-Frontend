import { Button } from "@material-tailwind/react"
import { IoArrowBack, IoArrowForward } from "react-icons/io5"

const PlacePageButtons = ({ handlePageChange }) => {
    return (
        <div className="flex gap-2">
            <Button variant="outlined" size="sm" className="p-1 hover:bg-gray-200" onClick={e => { handlePageChange(e, -1) }}>
                <IoArrowBack />
            </Button>
            <Button variant="outlined" size="sm" className="p-1 hover:bg-gray-200" onClick={e => { handlePageChange(e, 1) }}>
                <IoArrowForward />
            </Button>
        </div>
    )
}

export default PlacePageButtons;