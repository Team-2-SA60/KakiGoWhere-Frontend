import { Button, Dialog, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import OpenTimeForm from "./OpenTimeForm";

const OpeningHoursModal = ({ openOpeningHoursModal, handleOpeningHoursModal, openingHours, setOpeningHours }) => {
    const [time, setTime] = useState({
        openDay: 0,
        openHour: 0,
        openMinute: 0,
        closeDay: 0,
        closeHour: 1,
        closeMinute: 0
    });

    const handleConfirm = () => {
        console.log(isConflict(time, openingHours));
    }

    const toMinutes = ({ day, hour, minute }) => day * 1440 + hour * 60 + minute;

    const isConflict = (newTime, existingTimes) => {
        const newStart = toMinutes({
            day: newTime.openDay,
            hour: newTime.openHour,
            minute: newTime.openMinute,
        });

        const newEnd = toMinutes({
            day: newTime.closeDay,
            hour: newTime.closeHour,
            minute: newTime.closeMinute,
        });

        return existingTimes.some(time => {
            const existingStart = toMinutes({
                day: time.openDay,
                hour: time.openHour,
                minute: time.openMinute,
            });

            const existingEnd = toMinutes({
                day: time.closeDay,
                hour: time.closeHour,
                minute: time.closeMinute,
            });

            return newStart < existingEnd && newEnd > existingStart;
        });
    };


    return (
        <Dialog open={openOpeningHoursModal} handler={handleOpeningHoursModal} size="sm">
            <DialogHeader>Add Opening Time</DialogHeader>
            <div className="w-full">
                <OpenTimeForm time={time} setTime={setTime} />
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
                <Button variant="gradient" color="green" type="button" onClick={handleConfirm}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default OpeningHoursModal;