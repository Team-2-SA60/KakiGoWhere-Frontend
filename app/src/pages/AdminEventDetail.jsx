import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import Layout from "../components/admin_manage_place/AdminLayout";
import {
    Alert,
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Spinner,
} from "@material-tailwind/react";
import SuccessModal from "../components/admin_manage_place/SuccessModal";
import AdminEventDetailForm from "../components/admin_event/AdminEventDetailForm";
import ImageDisplayer from "../components/admin_event/ImageDisplayer";

const AdminEventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [eventItem, setEventItem] = useState ({
        id: "",
        name: "",
        placeId: "",
        placeName: "",
        description: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
    });

    const [places, setPlaces] = useState([]);
    const [placeSearch, setPlaceSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    // load event details
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await api.get(`/admin/event/id/${id}`);
                const data = res.data || {};
                setEventItem({
                    id: data.id ?? "",
                    name: data.name ?? "",
                    placeId: data.placeId != null ? String(data.placeId) : "",
                    placeName: data.placeName ?? "",
                    description: data.description ?? "",
                    startDate: data.startDate ?? "",
                    endDate: data.endDate ?? "",
                })
            } catch (err) {
                const statusCode = err.response?.status;
                if (statusCode === 404) {
                    setErrMsg("Event not found");
                    navigate("/admin/events");
                } else {
                    console.error("Failed to get event detail", err);
                    setErrMsg(err.response?.data || err.message || "Failed to load event");
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [id, navigate]);

    // load places for the datalist
    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/places/names");
                setPlaces(Array.isArray(res.data) ? res.data : []);
            } catch (e) {
                console.error("Failed to load places list", e);
                setPlaces([]);
            }
        })();
    }, []);

    function validate() {
        if (!eventItem.name.trim()) return "Event name is required";
        if (!eventItem.placeId) return "Please select a place";
        if (!eventItem.startDate) return "Start date is required";
        if (!eventItem.endDate) return "End date is required";
        if (eventItem.startDate > eventItem.endDate) return "End date must be on/after start date";
        return "";
    }

    const handleConfirmModal = () => {
        setErrMsg("");
        setOpenConfirmModal((o) => !o);
    };

    async function handleSave() {
        const msg = validate();
        if (msg) {
            setErrMsg(msg);
            return;
        }

        setSaveLoading(true);
        try {
            const payload = {
                id: eventItem.id,
                name: eventItem.name,
                description: eventItem.description,
                placeId: Number(eventItem.placeId),
                startDate: eventItem.startDate, // LocalDate
                endDate: eventItem.endDate,     // LocalDate
            };
            await api.put(`/admin/event/update/${eventItem.id}`, payload);
            setOpenSuccessModal(true);
        } catch (err) {
            console.log("Update failed: ", err);

            const status = err?.response?.status;
            const data = err?.response?.data;

            let msg = data;
            if (status === 409) {
                msg = "Event already exists for this place and date range.";
            }

            setErrMsg(msg || "Couldn’t update event. Please try again.");
        } finally {
            setSaveLoading(false);
        }
    }

    function handlePostSave() {
        navigate("/admin/events");
    }

    if (loading) {
        return <Spinner className="m-6" />;
    }

    return (
        <>
            <Layout>
                <Card className="mt-[3.5rem] w-full h-fit flex flex-row p-2 border border-gray-200">
                    <div className="w-full flex-row xl:flex place-content-center">
                        {/* Left: form */}
                        <div className="w-full xl:w-3/5">
                            <AdminEventDetailForm
                                eventItem={eventItem}
                                setEventItem={setEventItem}
                                places={places}
                                placeSearch={placeSearch}
                                setPlaceSearch={setPlaceSearch}
                                errors={{}}
                            />
                        </div>

                        {/* Right: image + submit */}
                        <div className="xl:w-2/5 place-content-center p-2">
                            <ImageDisplayer placeId={eventItem.placeId} />

                            <div className="mt-5 place-items-center">
                                <Button color="cyan" onClick={handleConfirmModal}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </Layout>

            {/* Confirm dialog */}
            <Dialog open={openConfirmModal} handler={handleConfirmModal} size="xs">
                <DialogHeader className="text-lg place-content-center">
                    Confirm update?
                </DialogHeader>
                <DialogBody className="text-sm place-content-start text-center">
                    <Alert
                        className="p-2 shadow-md"
                        open={Boolean(errMsg)}
                        variant="ghost"
                        color="red"
                    >
                        {errMsg}
                    </Alert>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleConfirmModal} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button
                        loading={saveLoading}
                        disabled={saveLoading}
                        variant="gradient"
                        color="green"
                        onClick={handleSave}
                    >
                        <span>Update</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Success modal */}
            <SuccessModal
                openSuccessModal={openSuccessModal}
                setOpenSuccessModal={setOpenSuccessModal}
                message={"Event successfully updated!"}
                handlePostSave={handlePostSave}
            />
        </>
    );
}

export default AdminEventDetail;