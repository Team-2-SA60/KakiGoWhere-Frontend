import { useState, useEffect } from "react";
import { Card, CardHeader } from "@material-tailwind/react";
import PlaceSearchbar from "./PlaceSearchbar";
import PlacePageButtons from "./PlacePageButtons";
import PlaceRow from "./PlaceRow";
import api from "../../utils/axios";

export default function PlaceList({ selectedPlaceId, onSelect }) {
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // re-fetch when page or search changes
    useEffect(() => {
        fetchPlaces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search]);

    // default: select first place of list
    useEffect(() => {
        if (places.length === 0) {
            onSelect(null);
            return;
        }

        // check if current selected id is still in the page
        const stillHere = places.some(p => p.id === selectedPlaceId);
        if (!stillHere) {
            onSelect(places[0].id);
        }
    }, [places, selectedPlaceId, onSelect])

    // fetch one page of places
    async function fetchPlaces() {
        setLoading(true);
        try {
            const res = await api.get("/admin/place", {
                params: { page: currentPage, pageSize: 10, search },
            });
            setPlaces(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error("Error fetching places:", err);
        } finally {
            setLoading(false);
        }
    }

    // prev/next pagination
    function handlePageChange(e, delta) {
        e.preventDefault();
        const next = currentPage + delta;
        if (next < 0 || next >= totalPages) return;
        setCurrentPage(next);
    }

    // cell styling
    const col_className = "p-1 border-b border-blue-gray-50 text-[12px] h-10";

    return (
        <Card className="w-full h-full overflow-auto text-[12px]">
            <PlaceSearchbar setSearch={setSearch} />

            <CardHeader floated={false} shadow={false} className="flex justify-between p-0.5">
                <span>Page { Math.min(currentPage + 1, totalPages || 1) } of { Math.max(totalPages, 1) }</span>
                <PlacePageButtons handlePageChange={handlePageChange} />
            </CardHeader>

            <table className="w-full table-auto text-left">
                <thead>
                <tr>
                    <th className={`${col_className} bg-cyan-50`}>Name</th>
                </tr>
                </thead>
                <tbody>
                <PlaceRow
                    places={places}
                    colClass={col_className}
                    loading={loading}
                    selectedPlaceId={selectedPlaceId}
                    onSelect={onSelect}
                />
                </tbody>
            </table>
        </Card>
    );
}
