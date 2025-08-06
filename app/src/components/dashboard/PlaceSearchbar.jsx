import { Input } from "@material-tailwind/react";
import { CiSearch } from "react-icons/ci";

export default function PlaceSearchbar({ setSearch }) {
    return (
        <div className="w-full p-2 h-10">
            <Input
                label="Search places..."
                icon={<CiSearch />}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}