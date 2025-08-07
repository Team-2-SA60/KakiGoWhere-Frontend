import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import { RxCross1, RxPlus } from "react-icons/rx";
import InterestCategoriesModal from "../InterestCategoriesModal";
import OpeningHoursView from "./OpeningHoursView";
import { Spinner } from "@material-tailwind/react";
import OpeningHoursModal from "./OpeningHoursModal";

const AdminPlaceDetailForm = forwardRef(({ place, setPlace, edit }, ref) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [url, setUrl] = useState("");
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState(false);
    const [autoFetch, setAutoFetch] = useState(false);
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
        setAutoFetch(place.autoFetch);
        setOpeningHours(place.openingHours);
    }

    useImperativeHandle(ref, () => ({
        updateDetails: () => {
            const updatedPlace = {
                id: place.id,
                name,
                address,
                description,
                latitude,
                longitude,
                url,
                interestCategories: categories,
                active,
                autoFetch
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

    const handleChangeAutoFetch = (active) => {
        if (active === "Open") {
            setActive(true);
        } else {
            setActive(false);
        }
    }

    if (!place) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <form className="w-full">
                <div className="flex flex-wrap -mx-1 gap-5 md:gap-8 md:p-2">
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
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-center md:text-nowrap">Latitude</span>
                            <input className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                                type="text"
                                value={latitude}
                                onChange={e => { setLatitude(e.target.value) }}
                                disabled={edit} />
                        </div>
                        {/* longitude */}
                        <div className="flex-row w-1/2">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-center md:text-nowrap">Longitude</span>
                            <input className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                                type="text"
                                value={longitude}
                                onChange={e => { setLongitude(e.target.value) }}
                                disabled={edit} />
                        </div>
                    </div>
                    {/* Status (active) and AutoFetch toggles */}
                    <div className="flex w-full place-content-center gap-2">
                        {/* Status */}
                        <div className="flex-row w-1/2 gap-2 place-items-center align-middle">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-center md:text-nowrap">Status</span>
                            <button type="button" 
                                className={`w-full text-sm border px-4 py-1 transition-all ease-in-out duration-200 rounded-md bg-gray-200 hover:border-green-200 ${active ? "bg-green-300" : ""}`}
                                onClick={e => {setActive(!active)}}>
                                    {active ? "Open" : "Closed"}
                            </button>
                        </div>
                        {/* AutoFetch */}
                        <div className="flex-row w-1/2 gap-2 place-items-center align-middle">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-center md:text-nowrap">Automatic Update</span>
                            <button type="button" 
                                className={`w-full text-sm border px-4 py-1 transition-all ease-in-out duration-200 rounded-md bg-gray-200 hover:border-green-200 ${autoFetch ? "bg-green-300" : ""}`}
                                onClick={e => {setAutoFetch(!autoFetch)}}>
                                    {autoFetch ? "Enabled" : "Disabled"}
                            </button>
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
                    {/* OpeningHours */}
                    <div className="flex w-full place-items-center gap-2">
                        <div>
                            <span className="block uppercase min-w-[5rem] text-gray-800 text-xs font-semibold text-right">
                                Opening Hours
                            </span>
                            <button type="button" className="border border-cyan-100 w-full place-items-center bg-gray-100 mt-2 px-2 py-1 rounded-2xl text-sm text-gray-600 hover:text-cyan-600 hover:bg-transparent transition-all duration-300 active:bg-cyan-100"
                                onClick={handleOpeningHoursModal}>
                                Add
                            </button>
                        </div>
                        <div className="w-full">
                            <OpeningHoursView openingHours={openingHours}/>
                        </div>
                    </div>
                </div>
            </form>
            {/* Open interestCategories modal */}
            <InterestCategoriesModal
                openCategoriesModal={openCategoriesModal}
                handleCategoriesModal={handleCategoriesModal}
                categories={categories}
                setCategories={setCategories} />
            {/* Open openingHours modal */}
            <OpeningHoursModal
                openOpeningHoursModal={openOpeningHoursModal}
                handleOpeningHoursModal={handleOpeningHoursModal}
                openingHours={openingHours}
                setOpeningHours={setOpeningHours} />
        </>
    )
})

export default AdminPlaceDetailForm;