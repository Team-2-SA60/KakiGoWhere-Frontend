import { useEffect, useState } from "react";
import Layout from "../components/AdminLayout";
import AdminSearchbar from "../components/AdminSearchbar"
import { Button, Card, CardFooter, CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import api from "../utils/axios";
import AdminManagePlaceRows from "../components/ManagePlaceRows";

const AdminManagePlace = () => {
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlaces();

        // eslint-disable-next-line
    }, [currentPage, search])

    async function fetchPlaces() {
        setLoading(true);

        let fetchUrl = "/admin/place";
        let params = buildParams();

        try {
            const response = await api.get(fetchUrl, { params });
            setPlaces(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
        return;
    }

    function buildParams() {
        const size = 10;

        let params = {
            page: currentPage,
            pageSize: size,
            search: search
        }

        return params;
    }

    const handlePageChange = (e, value) => {
        e.preventDefault();
        let page = currentPage + 1 + value;
        if (page === 0 || page > totalPages) return;
        setCurrentPage(currentPage + value);
    }

    const TABLE_HEAD = ["Name", "Categories", "Status", ""];

    return (
        <Layout>
            <AdminSearchbar setSearch={setSearch} />
            <Card className="h-fit w-full overflow-auto">
                <CardHeader floated={false} shadow={false} className="flex items-center justify-between py-2">
                    Page {currentPage + 1} of {totalPages}
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" onClick={e => { handlePageChange(e, -1) }}>
                            <IoArrowBack />
                        </Button>
                        <Button variant="outlined" size="sm" onClick={e => { handlePageChange(e, 1) }}>
                            <IoArrowForward />
                        </Button>
                    </div>
                </CardHeader>
                <table className="w-full table-auto text-left">
                    <thead>
                        {/* Table headers (declared above in TABLE_HEAD) */}
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className={`border-b border-blue-gray-100 bg-cyan-50 p-3 ${head === "Categories" ? "hidden md:table-cell" : ""}`}>
                                    <Typography variant="small" color="blue-gray" className="font-semibold leading-none opacity-90">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {/* Table rows (each place) */}
                        {loading ?
                            <tr>
                                <td colSpan={4} className="place-items-center p-4">
                                    <Spinner />
                                </td>
                            </tr>
                            :
                            <AdminManagePlaceRows places={places} />}
                    </tbody>
                </table>
                {/* Footer fo pagination */}
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    Page {currentPage + 1} of {totalPages}
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" onClick={e => { handlePageChange(e, -1) }}>
                            <IoArrowBack />
                        </Button>
                        <Button variant="outlined" size="sm" onClick={e => { handlePageChange(e, 1) }}>
                            <IoArrowForward />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </Layout>
    )
}

export default AdminManagePlace;