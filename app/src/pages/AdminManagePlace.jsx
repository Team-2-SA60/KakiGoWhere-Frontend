import { useEffect, useState } from "react";
import Layout from "../components/admin/AdminLayout";
import AdminSearchbar from "../components/admin/AdminSearchbar"
import { Card, CardFooter, CardHeader } from "@material-tailwind/react";
import api from "../utils/axios";
import AdminManagePlaceRows from "../components/admin/ManagePlaceRows";
import ManagePlacePageButtons from "../components/admin/ManagePlacePageButtons";

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

    const col_className = "p-3 border-b border-blue-gray-50 text-sm xl:text-base"

    return (
        <Layout>
            <AdminSearchbar setSearch={setSearch} />
            <Card className="h-fit min-h-[200px] w-full max-w-5xl overflow-auto border border-gray-100 text-base hover:shadow-lg">
                <CardHeader floated={false} shadow={false} className="flex items-center justify-between p-2 m-1">
                    Page {currentPage + 1} of {totalPages}
                    <ManagePlacePageButtons handlePageChange={handlePageChange} />
                </CardHeader>
                <table className="w-full table-fixed text-left">
                    <thead>
                        {/* Table headers (declared above in TABLE_HEAD) */}
                        <tr>
                            <th className={`${col_className} bg-cyan-50 w-3/5 md:w-1/3`}>
                                <span className="font-semibold leading-none opacity-90 text-base">Place name</span>
                            </th>
                            <th className={`${col_className} bg-cyan-50 w-1/3 hidden md:table-cell`}>
                                <span className="font-semibold leading-none opacity-90 text-base">Categories</span>
                            </th>
                            <th className={`${col_className} bg-cyan-50 text-center w-1/5 md:w-1/6`}>
                                <span className="font-semibold leading-none opacity-90 text-base">Status</span>
                            </th>
                            <th className={`${col_className} bg-cyan-50 w-1/5 md:w-1/6`}>
                                <span className="font-semibold leading-none opacity-90 text-base"></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {/* Table rows (each place) */}
                        {places.length > 0 ? places.map(place => (<AdminManagePlaceRows key={place.id} place={place} col_className={col_className} loading={loading} />))
                            : <tr><td colSpan={4} className="text-center p-4 font-semibold">No places returned...</td></tr>}
                    </tbody>
                </table>
                {/* Footer fo pagination */}
                <CardFooter className="flex items-center justify-between p-2 m-1">
                    Page {currentPage + 1} of {totalPages}
                    <ManagePlacePageButtons handlePageChange={handlePageChange} />
                </CardFooter>
            </Card>
        </Layout>
    )
}

export default AdminManagePlace;