import { Button, Input } from "@material-tailwind/react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const AdminSearchbar = ({ setSearch }) => {
const navigate = useNavigate();

const handleCreatePlace = () => {
    navigate("/admin/place/create");
}

    return (
        <div className="ml-[4rem] w-[85%] md:ml-0 md:w-full max-w-5xl my-4 bg-gradient-to-br from-blue-gray-50 to-cyan-50 shadow-sm border border-gray-100 rounded-lg p-2 hover:shadow-md">
                <div className="flex w-full items-center justify-between gap-0">
                    <div className="hidden md:block flex-none w-[8rem]">
                        <span className="font-bold w-full ">Manage Places</span>
                    </div>
                    <div className="flex-auto max-w-[40rem]">
                        <Input label="Search" icon={<CiSearch />} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="flex-auto w-[7rem] max-w-[7rem]">
                        <Button color="blue-gray" onClick={() => {handleCreatePlace()}} className="py-2.5 px-1 text-xs normal-case" variant="outlined">
                            Create Place
                        </Button>
                    </div>
                </div>
        </div>
    )
}

export default AdminSearchbar;