import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"

const SuccessModal = ({ openSuccessModal, setOpenSuccessModal, message, handlePostSave }) => {
    return (
        <Dialog open={openSuccessModal} handler={setOpenSuccessModal} message size="xs">
            <DialogHeader>Success</DialogHeader>
            <DialogBody>
                {message}
            </DialogBody>
            <DialogFooter>
                <Button onClick={() => handlePostSave()}>OK</Button>
            </DialogFooter>
        </Dialog>
    )
}

export default SuccessModal;