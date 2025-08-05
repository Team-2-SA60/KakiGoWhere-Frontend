import { useParams } from "react-router-dom";
import Layout from "../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import api from "../utils/axios";

const AdminPlaceDetail = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
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
            console.log(response.data)
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
            <div>{id}</div>
        </Layout>
    )
}

export default AdminPlaceDetail;