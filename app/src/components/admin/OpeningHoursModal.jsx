import { Button, Dialog, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const OpeningHoursModal = ({ openOpeningHoursModal, handleOpeningHoursModal, openingHours, setOpeningHours }) => {
    const [newOpeningHours, setNewOpeningHours] = useState([]);
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {
        setNewOpeningHours(openingHours);
    }, [handleOpeningHoursModal])

    

    return (
        <Dialog open={openOpeningHoursModal} handler={handleOpeningHoursModal}>
            <DialogHeader>Opening Hours</DialogHeader>
            <div className="flex flex-wrap gap-3 place-content-center">
                {/* <ListCategories categories={categories} setCategories={setCategories} /> */}
            </div>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpeningHoursModal}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green">
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default OpeningHoursModal;