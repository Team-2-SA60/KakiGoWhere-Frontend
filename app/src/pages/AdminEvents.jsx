import { useEffect, useState} from "react";
import Layout from "../components/admin_manage_place/AdminLayout.jsx";
import { Card, CardHeader } from "@material-tailwind/react";
import api from "../utils/axios";
import AdminEventSearchbar from "../components/admin_event/AdminEventSearchbar.jsx";
import ManageEventPageButtons from "../components/admin_event/ManageEventPageButtons.jsx";
import ManageEventRows from "../components/admin_event/ManageEventRows.jsx";

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // useEffect: fetch when the page/ search changes
    useEffect(() => {
        fetchEvents()
        // eslint-disable-next-line
    }, [currentPage, search]);

    async function fetchEvents() {
        setLoading(true);

        const fetchUrl = "/admin/event/search";
        const params = buildParams();

        try {
            const response = await api.get(fetchUrl, { params });
            setEvents(response.data.content || []);
            setTotalPages(response.data.totalPages || 0);
        } catch (err) {
            console.log(err);
            // on error, show nothing
            setEvents([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    }

    // build page/ filter params
    function buildParams() {
        const size = 10;
        return {
            page: currentPage,
            size,
            keyword: search || "",
        };
    }

    const handlePageChange = (e, value) => {
        e.preventDefault();
        const nextPage = currentPage + value;
        if (nextPage < 0 || nextPage > totalPages - 1) return;
        setCurrentPage(currentPage + value);
    };

    // reset to page 0 if currentPage is out of ranges
    useEffect(() => {
        if (totalPages !== 0 && currentPage > totalPages - 1 ) {
            setCurrentPage(0);
            }
        }, [totalPages, currentPage]);

    const col_className = "p-3 border-b border-blue-gray-50 text-sm xl:text-base";

    return (
        <Layout>
            <AdminEventSearchbar setSearch={setSearch} />

            <Card className="h-fit min-h-[200px] w-full max-w-5xl overflow-auto border border-gray-100 text-base hover:shadow-lg">
                <CardHeader floated={false} shadow={false} className="flex items-center justify-between p-2 m-1">
                    Page {Math.min(currentPage + 1, totalPages || 1)} of {Math.max(totalPages, 1)}
                    <ManageEventPageButtons handlePageChange={handlePageChange} />
                </CardHeader>

                <table className="w-full table-fixed text-left">
                    <thead>
                    <tr>
                        <th className={`${col_className} bg-cyan-50 w-1/3`}>
                            <span className="font-semibold leading-none opacity-90 text-base">Event Name</span>
                        </th>
                        <th className={`${col_className} bg-cyan-50 w-1/4 hidden md:table-cell`}>
                            <span className="font-semibold leading-none opacity-90 text-base">Place</span>
                        </th>
                        <th className={`${col_className} bg-cyan-50 w-2/8`}>
                            <span className="font-semibold leading-none opacity-90 text-base">Start Date</span>
                        </th>
                        <th className={`${col_className} bg-cyan-50 w-2/8`}>
                            <span className="font-semibold leading-none opacity-90 text-base">End Date</span>
                        </th>
                        <th className={`${col_className} bg-cyan-50 w-[90px]`}>
                            <span className="font-semibold leading-none opacity-90 text-base"></span>
                        </th>
                    </tr>
                    </thead>

                    <tbody className="w-full">
                    {loading && (
                        <tr>
                            <td colSpan={5} className="text-center p-4 text-gray-600">
                            Loading events...
                            </td>
                        </tr>
                    )}

                    {!loading && events.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center p-4 font-semibold">
                                No events found
                            </td>
                        </tr>
                    )}

                    {!loading && events.length > 0 && events.map((ev) => (
                        <ManageEventRows
                            key={ev.id}
                            eventItem={ev}
                            col_className={col_className}
                        />
                    ))}
                    </tbody>
                </table>
            </Card>
        </Layout>
    )
}

export default AdminEvents;