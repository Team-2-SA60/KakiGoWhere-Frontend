import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react"
import api from "../../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";

const GoogleAddModal = ({ openGoogleModal, setOpenGoogleModal }) => {
    const [googlePlaces, setGooglePlaces] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGoogleId, setSelectedGoogleId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [createdPlace, setCreatedPlace] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        try {
            const response = await api.get(`/admin/place/google?search=${encodeURIComponent(searchTerm)}`);
            const data = response.data
            setGooglePlaces(data || []);
        } catch (err) {
            console.error("Search failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (googleId) => {
        setSelectedGoogleId(googleId);
    };

    const handleSave = async () => {
        if (selectedGoogleId == null) return;
        setLoading(true);
        
        const selectedPlace = googlePlaces.find((p) => p.googleId === selectedGoogleId);

        const created = await postCreatePlace(selectedPlace);
        if (!created) return;

        setOpenSuccessModal(true);
    }

    async function postCreatePlace(selectedPlace) {
        try {
            const response = await api.post("/admin/place/google/add", selectedPlace);
            let data = await response.data;
            setCreatedPlace(data);
            return data;
        } catch (err) {
            console.error('Create failed:', err);
            setLoading(false);
            return false;
        }
    }

    const handlePostSave = () => {
        navigate(`/admin/place/${createdPlace.id}`)
    }

    return (
        <>
            <Dialog open={openGoogleModal} handler={setOpenGoogleModal} size="lg">
                <DialogHeader className="justify-between pt-2 pb-0">
                    <span>Add Place</span>
                    <Button className="hover:bg-gray-800 text-white" onClick={() => navigate("/admin/place/create")}>Manually Add Place</Button>
                </DialogHeader>
                <DialogBody className="space-y-4">
                    {/* Search Bar */}
                    <div className="flex gap-2">
                        <Input
                            label="Search Google Places"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <Button onClick={handleSearch} className="hover:bg-gray-800" disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                        </Button>
                    </div>

                    {/* Search Results */}
                    <div className="max-h-96 h-fit overflow-y-auto py-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-1">
                            {googlePlaces.map((place) => (
                                <Card
                                    key={place.googleId}
                                    onClick={() => handleSelect(place.googleId)}
                                    className={`cursor-pointer border hover:shadow-md ${selectedGoogleId === place.googleId ? "bg-cyan-50" : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <CardBody className="px-4 py-2">
                                        <Typography variant="h6">{place.name}</Typography>
                                        <Typography variant="small" color="gray">{place.address}</Typography>
                                        {place.googleMapsUri && (
                                            <a
                                                href={place.googleMapsUri}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline text-sm mt-1"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                View on Google Maps
                                            </a>
                                        )}
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {googlePlaces.length === 0 && !loading && (
                        <Typography variant="small" color="gray">
                            No results yet. Try searching above.
                        </Typography>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={() => handleSave()}
                        disabled={!selectedGoogleId}
                        color="cyan"
                    >
                        ADD PLACE
                    </Button>
                </DialogFooter>
            </Dialog>
            <SuccessModal openSuccessModal={openSuccessModal} setOpenSuccessModal={setOpenSuccessModal} message={"Place successfully created!"} handlePostSave={handlePostSave} />
        </>
    )
}

export default GoogleAddModal;