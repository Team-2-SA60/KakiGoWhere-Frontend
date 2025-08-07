import { useEffect, useState } from "react";
import { RxCross1, RxPlus } from "react-icons/rx";
import InterestCategoriesModal from "../InterestCategoriesModal";
import OpeningHoursView from "./OpeningHoursView";
import OpeningHoursModal from "./OpeningHoursModal";

const AdminPlaceDetailForm = ({ place, setPlace }) => {
    const [categories, setCategories] = useState([]);
    const [openingHours, setOpeningHours] = useState([]);
    const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
    const [openOpeningHoursModal, setOpenOpeningHoursModal] = useState(false);

    useEffect(() => {
        setCategories(place.interestCategories);
        setOpeningHours(place.openingHours);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setPlace(prev => ({
            ...prev,
            openingHours
        }))
        // eslint-disable-next-line
    }, [openingHours])

        useEffect(() => {
        setPlace(prev => ({
            ...prev,
            interestCategories: categories
        }))
        // eslint-disable-next-line
    }, [categories])

    const handleCategoriesModal = () => setOpenCategoriesModal(!openCategoriesModal);
    const handleOpeningHoursModal = () => setOpenOpeningHoursModal(!openOpeningHoursModal);

    const handleDeleteCategories = (category) => {
        setCategories(prev => prev.filter(cat => cat.id !== category.id));
    }

    const ListCategories = () => {
        return categories.map((category) => {
            return (
                <div key={category.id} className="flex text-center place-items-center align-middle gap-1 border border-cyan-100 bg-gray-100 px-2 py-1 rounded-2xl hover:bg-transparent transition-all duration-300">
                    <span className="text-xs">{category.description}</span>
                    <button type="button" onClick={() => handleDeleteCategories(category)} className="text-gray-600 hover:text-cyan-600 hover:scale-110">
                        <RxCross1 className="w-4 h-4" />
                    </button>
                </div>
            )
        })
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
                            value={place.name}
                            rows={1}
                            onChange={(e) => setPlace(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    {/* Address */}
                    <div className="flex w-full place-items-center gap-2">
                        <span className="block uppercase min-w-[5rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Address</span>
                        <textarea className="outline-none border w-full min-h-[2rem] p-1 rounded-md overflow-auto bg-gray-200 focus:bg-transparent"
                            type="text"
                            value={place.address}
                            rows={1}
                            onChange={(e) => setPlace(prev => ({ ...prev, address: e.target.value }))} />
                    </div>
                    {/* Description */}
                    <div className="flex w-full place-items-center gap-2">
                        <span className="block uppercase min-w-[5rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Description</span>
                        <textarea className="outline-none border w-full min-h-[2rem] p-1 rounded-md overflow-auto bg-gray-200 focus:bg-transparent"
                            type="text"
                            value={place.description}
                            rows={3}
                            onChange={(e) => setPlace(prev => ({ ...prev, description: e.target.value }))} />
                    </div>
                    {/* Web url */}
                    <div className="flex w-full place-items-center gap-2">
                        <span className="block uppercase min-w-[5rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Website URL</span>
                        <textarea className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                            type="text"
                            value={place.url}
                            rows={1}
                            onChange={(e) => setPlace(prev => ({ ...prev, url: e.target.value }))} />
                    </div>
                    {/* Coordnates */}
                    <div className="flex w-full place-items-center gap-2">
                        {/* latitude */}
                        <div className="flex-row w-1/2">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-center md:text-nowrap">Latitude</span>
                            <input className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                                type="number"
                                value={place.latitude}
                                onChange={(e) => setPlace(prev => ({ ...prev, latitude: e.target.value }))} />
                        </div>
                        {/* longitude */}
                        <div className="flex-row w-1/2">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-center md:text-nowrap">Longitude</span>
                            <input className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                                type="number"
                                value={place.longitude}
                                onChange={(e) => setPlace(prev => ({ ...prev, longitude: e.target.value }))} />
                        </div>
                    </div>
                    {/* Status (active) and AutoFetch toggles */}
                    <div className="flex w-full place-content-center gap-2">
                        {/* Status */}
                        <div className="flex-row w-1/2 gap-2 place-items-center align-middle">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-center md:text-nowrap">Status</span>
                            <button type="button"
                                className={`w-full text-sm border px-4 py-1 transition-all ease-in-out duration-200 rounded-md bg-gray-200 hover:border-green-200 ${place.active ? "bg-green-300" : ""}`}
                                onClick={() => setPlace(prev => ({ ...prev, active: !place.active }))}>
                                {place.active ? "Open" : "Closed"}
                            </button>
                        </div>
                        {/* AutoFetch */}
                        <div className="flex-row w-1/2 gap-2 place-items-center align-middle">
                            <span className="block uppercase min-w-[5rem] mb-1 text-gray-800 text-xs font-semibold text-center md:text-nowrap">Automatic Update</span>
                            <button type="button"
                                className={`w-full text-sm border px-4 py-1 transition-all ease-in-out duration-200 rounded-md bg-gray-200 hover:border-green-200 ${place.autoFetch ? "bg-green-300" : ""}`}
                                onClick={() => setPlace(prev => ({ ...prev, autoFetch: !place.autoFetch }))}>
                                {place.autoFetch ? "Enabled" : "Disabled"}
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
                            <OpeningHoursView openingHours={openingHours} setOpeningHours={setOpeningHours} />
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
}

export default AdminPlaceDetailForm;