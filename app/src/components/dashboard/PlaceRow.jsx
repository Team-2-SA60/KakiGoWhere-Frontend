import React from "react";
import { Spinner } from "@material-tailwind/react";

export default function PlaceRow({ places, colClass, loading, selectedPlaceId, onSelect }) {
    if (loading) {
        return (
            <tr>
                <td colSpan={1} className="p-4 text-center">
                    <Spinner />
                </td>
            </tr>
        );
    }

    if (places.length === 0) {
        return (
            <tr>
                <td colSpan={1} className="p-4 text-center">
                    No places found
                </td>
            </tr>
        );
    }

    return places.map(({ id, name }) => {
        const isSelected = id === selectedPlaceId;
        const rowClasses = isSelected
            ? "bg-gray-100 hover:bg-gray-200 cursor-pointer"
            : "hover:bg-gray-50 cursor-pointer";

        return (
            <tr
                key={id}
                className={rowClasses}
                onClick={() => onSelect(id)}
            >
                {/* Single cell per row, styled by colClass */}
                <td className={colClass}>
                    {/* line‐clamp for long names, black text */}
                    <span className="line-clamp-2 text-black">{name}</span>
                </td>
            </tr>
            );
    });
}