import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import { RxCross1, RxPlus } from "react-icons/rx";
import InterestCategoriesModal from "../InterestCategoriesModal";
import { Option, Select } from "@material-tailwind/react";

const AdminPlaceDetailForm = forwardRef(({ place, setPlace, edit }, ref) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [url, setUrl] = useState("");
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState(false);
    const [openingHours, setOpeningHours] = useState([]);
    const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
    const [openOpeningHoursModal, setOpenOpeningHoursModal] = useState(false);

    useEffect(() => {
        if (place) {
            init();
        }
    }, [place])

    function init() {
        setName(place.name);
        setAddress(place.address);
        setDescription(place.description);
        setLatitude(place.latitude);
        setLongitude(place.longitude);
        setUrl(place.url);
        setCategories(place.interestCategories);

        setActive(place.active);
        setOpeningHours(place.openingHours);
    }

    useImperativeHandle(ref, () => ({
        updateDetails: () => {
            const updatedPlace = {
                ...place,
                name,
                address,
                description,
                latitude,
                longitude,
                url,
                interestCategories: categories,
                active,
            };
            console.log("Submit Place Data", updatedPlace);
            setPlace(updatedPlace);
            return updatedPlace;
        }
    }));

    const handleCategoriesModal = () => setOpenCategoriesModal(!openCategoriesModal);
    const handleOpeningHoursModal = () => setOpenOpeningHoursModal(!openOpeningHoursModal);

    const handleDeleteCategories = (e, category) => {
        e.preventDefault();
        setCategories(prev => prev.filter(cat => cat.id !== category.id));
    }

    const ListCategories = () => {
        return categories.map((category, index) => {
            return (
                <div key={category.id} className="flex text-center place-items-center align-middle gap-1 border border-cyan-100 bg-gray-100 px-2 py-1 rounded-2xl hover:bg-transparent transition-all duration-300">
                    <span className="text-xs">{category.description}</span>
                    <button type="button" onClick={e => handleDeleteCategories(e, category)} className="text-gray-600 hover:text-cyan-600 hover:scale-110">
                        <RxCross1 className="w-4 h-4" />
                    </button>
                </div>
            )
        })
    }

    const handleChangeActive = (active) => {
        if (active === "Open") {
            setActive(true);
        } else {
            setActive(false);
        }
    }

    return (
        <>
            <form className="w-full">
                <div className="flex flex-wrap -mx-1 gap-5 md:p-2">
                    {/* Place name */}
                    <div className="flex w-full place-items-center gap-2">
                        <span className="block uppercase min-w-[5rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Place Name</span>
                        <textarea className="outline-none border w-full min-h-[2rem] p-1 rounded-md overflow-auto bg-gray-200 focus:bg-transparent"
                            type="text"
                            value={name}
                            rows={1}
                            onChange={e => { setName(e.target.value) }}
                            disabled={edit} />
                    </div>
                    {/* Address */}
                    <div className="flex w-full place-items-center gap-2">
                        <span className="block uppercase min-w-[5rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Address</span>
                        <textarea className="outline-none border w-full min-h-[2rem] p-1 rounded-md overflow-auto bg-gray-200 focus:bg-transparent"
                            type="text"
                            value={address}
                            rows={1}
                            onChange={e => { setAddress(e.target.value) }}
                            disabled={edit} />
                    </div>
                    {/* Description */}
                    <div className="flex w-full place-items-center gap-2">
                        <span className="block uppercase min-w-[5rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Description</span>
                        <textarea className="outline-none border w-full min-h-[2rem] p-1 rounded-md overflow-auto bg-gray-200 focus:bg-transparent"
                            type="text"
                            value={description}
                            rows={3}
                            onChange={e => { setDescription(e.target.value) }}
                            disabled={edit} />
                    </div>
                    {/* Web url */}
                    <div className="flex w-full place-items-center gap-2">
                        <span className="block uppercase min-w-[5rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Website URL</span>
                        <textarea className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                            type="text"
                            value={url}
                            rows={1}
                            onChange={e => { setUrl(e.target.value) }}
                            disabled={edit} />
                    </div>
                    {/* Coordnates */}
                    <div className="flex w-full place-items-center gap-2">
                        {/* latitude */}
                        <div className="flex-row w-1/2">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-left md:text-nowrap">Latitude</span>
                            <input className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                                type="text"
                                value={latitude}
                                onChange={e => { setLatitude(e.target.value) }}
                                disabled={edit} />
                        </div>
                        {/* longitude */}
                        <div className="flex-row w-1/2">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-left md:text-nowrap">Longitude</span>
                            <input className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                                type="text"
                                value={longitude}
                                onChange={e => { setLongitude(e.target.value) }}
                                disabled={edit} />
                        </div>
                    </div>
                    {/* Categories */}
                    <div className="flex w-full place-items-center gap-2">
                        <span className="block uppercase min-w-[5rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Categories</span>
                        <div className="flex flex-wrap w-full gap-2">
                            <ListCategories />
                            <button type="button" className="border border-cyan-100 bg-gray-100 px-2 py-1 rounded-2xl text-gray-600 hover:text-cyan-600 hover:scale-110 hover:bg-transparent transition-all duration-300 active:bg-cyan-100"
                                onClick={handleCategoriesModal}>
                                <RxPlus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="flex w-full place-items-center gap-2">
                        {/* Status (Active) */}
                        <div className="flex-row w-1/2">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-center md:text-nowrap">Status</span>

                            <div className="w-full">
                                <Select
                                    className="outline-none ring-0 border border-gray-300 rounded-md bg-gray-200 focus:bg-transparent"
                                    onChange={(value) => handleChangeActive(value)}
                                    label="Select"
                                    value={active ? "Open" : "Closed"}
                                    disabled={edit}>
                                    <Option value="Open">Open</Option>
                                    <Option value="Closed">Closed</Option>
                                </Select>
                            </div>
                        </div>

                        {/* Open Opening hours modal */}
                        <div className="flex-row w-1/2">
                            
                        </div>
                    </div>
                </div>
            </form>
            {/* Select interestCategories modal */}
            <InterestCategoriesModal
                openCategoriesModal={openCategoriesModal}
                handleCategoriesModal={handleCategoriesModal}
                categories={categories}
                setCategories={setCategories} />
        </>
    )
})

export default AdminPlaceDetailForm;