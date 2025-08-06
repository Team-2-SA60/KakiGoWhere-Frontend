import { useParams } from "react-router-dom";
import Layout from "../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Card } from "@material-tailwind/react";
import AdminPlaceDetailForm from "../components/admin/AdminPlaceDetailForm";

const AdminPlaceDetail = () => {
    const { id } = useParams();
    const [place, setPlace] = useState("");
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        fetchPlace();
        // eslint-disable-next-line
    }, [])

    async function fetchPlace() {
        setLoading(true);

        let fetchUrl = `/places/id/${id}`;

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

    return (
        <Layout>
            <Card className="ml-[2rem] md:ml-[4rem] w-[85%] h-fit flex mt-3 border border-gray-200">
                <div className="w-full p-2">
                    <div className="flex">
                        <AdminPlaceDetailForm place={place} setPlace={setPlace} edit={edit} />
                    </div>
                </div>
            </Card>
        </Layout>
    )
}

export default AdminPlaceDetail;