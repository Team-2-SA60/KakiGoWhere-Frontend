import { useParams } from "react-router-dom";
import Layout from "../components/AdminLayout";

const AdminPlaceDetail = () => {
    const { id } = useParams();


    return (
        <Layout>
            <div>{id}</div>
        </Layout>
    )
}

export default AdminPlaceDetail;