import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Alert, Button, Card, Spinner } from "@material-tailwind/react";
import AdminPlaceDetailForm from "../components/admin/AdminPlaceDetailForm";
import ImageUploader from "../components/admin/ImageUploader";

const AdminPlaceDetail = () => {
    const { id } = useParams();
    const [place, setPlace] = useState({
        id: "",
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
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlace();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMsg(null);
        }, 6000);
    }, [msg])

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
                setMsg(err?.message + " place not found");
                navigate("/admin/places")
            } else {
                console.error("Failed to get place detail", err);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleSave = () => {
        setSaveLoading(true);
        if (!postUpdatePlace()) {
            setMsg("Failed to update place")
            return;
        }

        if (!uploadImage()) {
            setMsg("Failed to upload image")
            return;
        }

        setSaveLoading(false);
        setMsg("Successfully updated")
    };

    async function postUpdatePlace() {
        let postUrl = "/admin/place/update"
        
        try {
            const response = await api.post(postUrl, place);
            console.log('Upload success:', response.data);
        } catch (error) {
            console.error('Upload failed:', error);
            setSaveLoading(false);
        }
        return true;
    };

    async function uploadImage() {
        if (!imageFile) return;

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
        } catch (error) {
            console.error('Upload failed:', error);
            setSaveLoading(false);
        }
        return true;
    };

    if (loading || !place.id) {
        return (
            <Spinner />
        )
    }

    return (
        <Layout>
            <Card className="mt-[3.5rem] w-full h-fit flex flex-row p-2 border border-gray-200">
                <div className="w-full flex-row xl:flex place-content-center">
                    <div className="w-full xl:w-3/5">
                        <AdminPlaceDetailForm place={place} setPlace={setPlace} />
                    </div>
                    <div className="xl:w-2/5 place-content-center">
                        <ImageUploader place={place} imageFile={imageFile} setImageFile={setImageFile} />
                                        <Alert className="p-2 shadow-md" open={msg != null} variant="ghost"  color="cyan">
                                            {msg}
                                        </Alert>
                        <div className="mt-5">
                            <Button loading={saveLoading} color="cyan" onClick={handleSave}>Submit</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    )
}

export default AdminPlaceDetail;