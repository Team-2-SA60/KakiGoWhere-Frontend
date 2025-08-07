import { useParams } from "react-router-dom";
import Layout from "../components/admin/AdminLayout";
import { useEffect, useRef, useState } from "react";
import api from "../utils/axios";
import { Button, Card } from "@material-tailwind/react";
import AdminPlaceDetailForm from "../components/admin/AdminPlaceDetailForm";
import ImageUploader from "../components/admin/ImageUploader";

const AdminPlaceDetail = () => {
    const { id } = useParams();
    const [place, setPlace] = useState("");
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const formRef = useRef();

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
            } else {
                console.error("Failed to get place detail", err);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleSave = () => {
        const updatedData = formRef.current.updateDetails();

    };

    return (
        <Layout>
            <Card className="mt-[3.5rem] w-full h-fit flex flex-row p-2 border border-gray-200">
                <div className="w-full flex-row xl:flex place-content-center">
                    <div className="w-full xl:w-3/5">
                        <AdminPlaceDetailForm ref={formRef} place={place} setPlace={setPlace} edit={edit} />
                    </div>
                    <div className="xl:w-2/5 place-content-center">
                        <ImageUploader place={place} />
                        <div className="mt-5">
                            <Button color="cyan" onClick={handleSave}>Submit</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    )
}

export default AdminPlaceDetail;