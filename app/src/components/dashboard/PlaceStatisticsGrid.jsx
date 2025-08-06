import React from "react";
import PlaceList from "./PlaceList";
import SentimentCard from "./SentimentCard";
import HitChart from "./HitChart";

export default function PlaceStatisticsGrid({ selectedPlaceId, onSelectPlace, month }) {
    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-[40%_60%] gap-3">
            <div className="h-full overflow-auto">
                <PlaceList
                    selectedPlaceId={selectedPlaceId}
                    onSelect={onSelectPlace}
                />
            </div>

            <div className="h-full grid gap-3">
                <SentimentCard placeId={selectedPlaceId} />
                <HitChart placeId={selectedPlaceId} month={month} />
            </div>
        </div>
    );
}