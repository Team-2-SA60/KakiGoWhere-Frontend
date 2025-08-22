import { useMemo } from "react";

const AdminEventDetailForm = ({
                                  eventItem,
                                  setEventItem,
                                  places = [],
                                  placeSearch,
                                  setPlaceSearch,
                                  errors = {},
                              }) => {
    // filter places by the user's query
    const filteredPlaces = useMemo(() => {
        const q = (placeSearch || "").trim().toLowerCase();
        if (!q) return places;
        return places.filter((p) => (p.name || "").toLowerCase().includes(q));
    }, [places, placeSearch]);

    // helper to update fields of eventItem when input changes
    const setField = (key) => (e) => {
        const value = e.target.value;
        setEventItem((prev) => ({ ...prev, [key]: value }));
    };

    // what is shown in input: show name if selected, otherwise show what user is typing
    const selectedPlace = places.find(
        (p) => String(p.id) === String(eventItem.placeId)
    );
    const placeInputValue = selectedPlace ? selectedPlace.name : placeSearch;

    // handle typing and selecting from datalist
    const handlePlaceInputChange = (e) => {
        const val = e.target.value;

        // exact match by name => commit selection (set placeId + placeName)
        const matchByName = (places || []).find((p) => p.name === val);
        if (matchByName) {
            setEventItem((prev) => ({
                ...prev,
                placeId: String(matchByName.id),
                placeName: matchByName.name,
            }));
            setPlaceSearch(""); // clear the free-typing buffer
            return;
        }
        // if user is still typing, keep text in placeSearch and clear selection
        setPlaceSearch(val);
        setEventItem((prev) => ({...prev, placeId: "", placeName: ""}));
    };

    return (
        <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-wrap -mx-1 gap-5 md:gap-8 md:p-2">
                {/* Event Name */}
                <div className="flex w-full place-items-center gap-2">
                    <span className="block uppercase min-w-[7rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Event Name</span>
                    <input
                        className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                        value={eventItem.name}
                        onChange={setField("name")}
                    />
                </div>
                {errors.name && (
                    <div className="w-full text-xs text-red-600 -mt-3">{errors.name}</div>
                )}

                {/* Place (search + datalist) */}
                <div className="flex w-full place-items-start gap-2">
                    <span className="block uppercase min-w-[7rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Place</span>
                    <div className="flex w-full flex-col gap-2">
                        <input
                            className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                            placeholder="Search and select a place…"
                            list="place-options"
                            value={placeInputValue}
                            onChange={handlePlaceInputChange}
                        />
                        <datalist id="place-options">
                            {(placeSearch ? filteredPlaces : places).map((p) => (
                                <option key={p.id} value={p.name} />
                            ))}
                        </datalist>
                    </div>
                </div>
                {errors.placeId && (
                    <div className="w-full text-xs text-red-600 -mt-3">{errors.placeId}</div>
                )}

                {/* Description */}
                <div className="flex w-full place-items-start gap-2">
                    <span className="block uppercase min-w-[7rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Description</span>
                    <textarea
                        className="outline-none border w-full min-h-[4rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                        rows={3}
                        value={eventItem.description}
                        onChange={setField("description")}
                    />
                </div>

                {/* Dates */}
                <div className="flex w-full place-items-center gap-2">
                    <span className="block uppercase min-w-[7rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">Start Date</span>
                    <input
                        type="date"
                        className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                        value={eventItem.startDate}
                        onChange={setField("startDate")}
                        />
                    </div>

                <div className="flex w-full place-items-center gap-2">
                    <span className="block uppercase min-w-[7rem] text-gray-800 text-xs font-semibold text-right md:text-nowrap">End Date</span>
                    <input
                        type="date"
                        className="outline-none border w-full min-h-[2rem] p-1 rounded-md bg-gray-200 focus:bg-transparent"
                        value={eventItem.endDate}
                        onChange={setField("endDate")}
                        min={eventItem.startDate || undefined}
                        />
                </div>
            </div>
        </form>
    );
};

export default AdminEventDetailForm;
