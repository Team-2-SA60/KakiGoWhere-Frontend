import { useNavigate } from "react-router-dom";
import Layout from "../components/admin/AdminLayout";
import { useState } from "react";
import api from "../utils/axios";
import { Alert, Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner } from "@material-tailwind/react";
import AdminPlaceDetailForm from "../components/admin/AdminPlaceDetailForm";
import ImageUploader from "../components/admin/ImageUploader";
import SuccessModal from "../components/admin/SuccessModal";

const AdminCreatePlace = () => {
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

    const [saveLoading, setSaveLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        setErrMsg("");
        if (!imageFile) {
            setErrMsg("Please upload an image");
            return;
        }

        setSaveLoading(true);

        const created = await postCreatePlace();
        if (!created) {
            return;
        }

        const uploaded = await uploadImage(created.id);
        if (!uploaded) {
            return;
        }

        setOpenSuccessModal(true);
    };

    async function postCreatePlace() {
        let postUrl = "/admin/place/create"

        try {
            const response = await api.post(postUrl, place);
            let data = await response.data;
            setPlace(data)
            return data;
        } catch (err) {
            console.error('Create failed:', err);
            setErrMsg(err.response?.data || err.message || "Create failed");
            setSaveLoading(false);
            return false;
        }
    };

    async function uploadImage(placeId) {
        if (!imageFile) return true;

        let postUrl = "/admin/place/image/upload"

        const formData = new FormData();
        formData.append('placeId', placeId);
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

    const handlePostSave = () => {
        navigate(`/admin/place/${place.id}`)
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
                            <Alert className="p-2 shadow-md" open={errMsg} variant="ghost" color="red">
                                {errMsg}
                            </Alert>
                            <div className="mt-5">
                                <Button color="cyan" loading={saveLoading} disabled={saveLoading} onClick={handleSave}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </Layout>
            <SuccessModal openSuccessModal={openSuccessModal} setOpenSuccessModal={setOpenSuccessModal} message={"Place successfully created!"} handlePostSave={handlePostSave} />
        </>
    )
}

export default AdminCreatePlace;