import { Button, Input } from "@material-tailwind/react";
import { CiSearch } from "react-icons/ci";

const AdminSearchbar = ({ setSearch }) => {
    return (
        <div className="ml-[4rem] w-[85%] md:ml-0 md:w-full my-4 bg-white shadow-sm border border-gray-300 rounded-lg p-2">
                <div className="flex w-full items-center gap-3">
                    <div className="hidden md:block flex-none w-[7rem]">
                        <span className="font-bold w-full ">Manage Places</span>
                    </div>
                    <div className="flex-auto w-[20rem]">
                        <Input label="Search" icon={<CiSearch />} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="flex-auto w-[10rem]">
                        <Button color="blue-gray" className="py-2.5 px-1 text-xs normal-case" variant="outlined">
                            Create Place
                        </Button>
                    </div>
                </div>
        </div>
    )
}

export default AdminSearchbar;