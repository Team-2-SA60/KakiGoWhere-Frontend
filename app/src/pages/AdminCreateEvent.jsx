import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import Layout from "../components/admin_manage_place/AdminLayout.jsx";
import { Alert, Button, Card } from "@material-tailwind/react";
import SuccessModal from "../components/admin_manage_place/SuccessModal";
import AdminEventDetailForm from "../components/admin_event/AdminEventDetailForm.jsx";
import ImageDisplayer from "../components/admin_event/ImageDisplayer.jsx";

const AdminCreateEvent = () => {
   const [eventItem, setEventItem] = useState({
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
   const [saveLoading, setSaveLoading] = useState(false);
   const [errMsg, setErrMsg] = useState("");
   const [openSuccessModal, setOpenSuccessModal] = useState(false);
   const navigate = useNavigate();

   // load places for dropdown
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

    async function handleSave() {
        setErrMsg("");

        const msg = validate();
        if (msg) {
            setErrMsg(msg);
            return;
        }

        setSaveLoading(true);
        try {
            const payload = {
                name: eventItem.name,
                description: eventItem.description,
                placeId: eventItem.placeId,
                startDate: eventItem.startDate,
                endDate: eventItem.endDate,
            };
            const res = await api.post("/admin/event/create", payload);
            const created = res.data;
            setEventItem((prev) => ({ ...prev, id: created?.id || prev.id }));
            setOpenSuccessModal(true);
        } catch (err) {
            console.log("Create failed: ", err);

            const status = err?.response?.status;
            const data = err?.response?.data;

            let msg = data;
            if (status === 409) {
                msg = "Event already exists for this place and date range.";
            }

            setErrMsg(msg || "Couldn’t create event. Please try again.");
        } finally {
            setSaveLoading(false);
        }
    }

    function handlePostSave() {
        navigate("/admin/events");
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

                        {/* Right: image placeholder/preview + error + submit */}
                        <div className="xl:w-2/5 place-content-center">
                            <ImageDisplayer placeId={eventItem.placeId} />

                            <Alert className="p-2 shadow-md" open={Boolean(errMsg)} variant="ghost" color="red">
                                {errMsg}
                            </Alert>

                            <div className="mt-5 place-items-center">
                                <Button color="cyan" loading={saveLoading} disabled={saveLoading} onClick={handleSave}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
        </Layout>

    {/* Success modal */}
    <SuccessModal
        openSuccessModal={openSuccessModal}
        setOpenSuccessModal={setOpenSuccessModal}
        message={"Event successfully created!"}
        handlePostSave={handlePostSave}
    />
        </>
    );
};

export default AdminCreateEvent;