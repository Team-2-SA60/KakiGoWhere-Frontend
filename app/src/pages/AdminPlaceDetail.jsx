import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Alert, Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner } from "@material-tailwind/react";
import AdminPlaceDetailForm from "../components/admin/AdminPlaceDetailForm";
import ImageUploader from "../components/admin/ImageUploader";
import SuccessModal from "../components/admin/SuccessModal";

const AdminPlaceDetail = () => {
    const { id } = useParams();
    const [place, setPlace] = useState({
        id: "",
        googleId: "",
        name: "",
        address: "",
        description: "",
        latitude: "",
        longitude: "",
        url: "",
        interestCategories: [],
        openingHours: [],
        active: true,
        autoFetch: false
    });

    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlace();
        // eslint-disable-next-line
    }, [])

    async function fetchPlace() {
        setLoading(true);

        let fetchUrl = `/admin/place/id/${id}`;

        try {
            const response = await api.get(fetchUrl);
            setPlace(response.data);
        } catch (err) {
            const statusCode = err.response?.status;

            // PlaceId not found
            if (statusCode === 404) {
                setErrMsg(err?.message + " place not found");
                navigate("/admin/places")
            } else {
                console.error("Failed to get place detail", err);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleSave = async () => {
        setSaveLoading(true);

        const updated = await postUpdatePlace();
        if (!updated) {
            return;
        }

        const uploaded = await uploadImage();
        if (!uploaded) {
            return;
        }

        setOpenSuccessModal(true);
    };

    async function postUpdatePlace() {
        let postUrl = "/admin/place/update"

        try {
            const response = await api.post(postUrl, place);
            let data = await response.data;
            return data;
        } catch (err) {
            console.error('Upload failed:', err);
            setErrMsg(err.response?.data || err.message || "Update failed");
            setSaveLoading(false);
            return false;
        }
    };

    async function uploadImage() {
        if (!imageFile) return true;

        let postUrl = "/admin/place/image/upload"

        const formData = new FormData();
        formData.append('placeId', place.id);
        formData.append('image', imageFile);

        try {
            const response = await api.post(postUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload success:', response.data);
        } catch (err) {
            console.error('Upload failed:', err);
            setErrMsg(err.response?.data || err.message || "Upload failed");
            setSaveLoading(false);
            return false;
        }
        return true;
    };

    const handleConfirmModal = () => {
        setErrMsg("");
        setOpenConfirmModal(!openConfirmModal);
    }

    const handlePostSave = () => {
        window.location.reload();
    }

    if (loading || !place.id) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <Layout>
                <Card className="mt-[3.5rem] w-full h-fit flex flex-row p-2 border border-gray-200">
                    <div className="w-full flex-row xl:flex place-content-center">
                        <div className="w-full xl:w-3/5">
                            <AdminPlaceDetailForm place={place} setPlace={setPlace} />
                        </div>
                        <div className="xl:w-2/5 place-content-center">
                            <ImageUploader place={place} imageFile={imageFile} setImageFile={setImageFile} />
                            <div className="mt-5">
                                <Button color="cyan" onClick={handleConfirmModal}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </Layout>
            <Dialog open={openConfirmModal} handler={handleConfirmModal} size="xs">
                <DialogHeader className="text-lg place-content-center">
                    Confirm update?
                </DialogHeader>
                <DialogBody className="text-sm place-content-start text-center">
                    {place.googleId && place.autoFetch ?
                        <span>Automatic update is 'Enabled' <br /> Any changes may be overwritten during scheduled updates</span>
                        : ""}
                    <Alert className="p-2 shadow-md" open={errMsg} variant="ghost" color="red">
                        {errMsg}
                    </Alert>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleConfirmModal}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button loading={saveLoading} disabled={saveLoading} variant="gradient" color="green" type="button" onClick={handleSave}>
                        <span>Update</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <SuccessModal openSuccessModal={openSuccessModal} setOpenSuccessModal={setOpenSuccessModal} message={"Place successfully updated!"} handlePostSave={handlePostSave} />
        </>
    )
}

export default AdminPlaceDetail;