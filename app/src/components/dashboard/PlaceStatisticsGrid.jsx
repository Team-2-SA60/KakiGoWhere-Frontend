import PlaceList from "./PlaceList";
import SentimentCard from "./SentimentCard";
import HitChart from "./HitChart";

export default function PlaceStatisticsGrid({ selectedPlaceId, onSelectPlace, month }) {
    return (
        <div className="mt-4 grid grid-cols-12 gap-4 w-full max-w-5xl mx-auto transition-all">
            
            <div className="col-span-12 lg:col-span-5 bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-200 h-full overflow-auto transition-all">
                <PlaceList
                    selectedPlaceId={selectedPlaceId}
                    onSelect={onSelectPlace}
                />
            </div>

            <div className="col-span-12 lg:col-span-7 flex flex-col gap-4 h-full">
                <SentimentCard placeId={selectedPlaceId} />
                <HitChart placeId={selectedPlaceId} month={month} />
            </div>
        </div>
    );
}