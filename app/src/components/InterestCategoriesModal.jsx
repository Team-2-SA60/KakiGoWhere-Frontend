import { Button, Dialog, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react"
import api from "../utils/axios";

// HOLY CRAP THIS IS SO TOUGH T_T

const InterestCategoriesModal = ({ openCategoriesModal, handleCategoriesModal, categories, setCategories }) => {
    const [allCategories, setAllCategories] = useState([]);
    const [existingCategories, setExistingCategories] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchInterestCategories();
    }, [])

    useEffect(() => {
        setExistingCategories(categories);
        // eslint-disable-next-line
    }, [handleCategoriesModal])

    async function fetchInterestCategories() {
        setLoading(true);

        let fetchUrl = `/interests`;

        try {
            const response = await api.get(fetchUrl);
            setAllCategories(response.data);
        } catch (err) {
            console.error("Failed to get interest categories", err);
        } finally {
            setLoading(false);
        }
    }

    const isExistingCategory = (id) => {
        return existingCategories.some((cat) => cat.id === id);
    }

    const handleClickCategory = (e, category) => {
        e.preventDefault();

        const exists = isExistingCategory(category.id);
        if (exists) {
            setExistingCategories(prev => prev.filter(cat => cat.id !== category.id));
        } else {
            setExistingCategories(prev => [...prev, category]);
        }
    };

    const handleConfirm = () => {
        setCategories(existingCategories);
        handleCategoriesModal();
    }

    if (loading) {
        return <Spinner />;
    }

    const ListCategories = () => (
        allCategories.map((category) => {
            return (
                <button type="button" key={category.id}
                    className={`flex text-center place-items-center align-middle gap-1 border border-cyan-100 px-2 py-1 rounded-2xl transition-all duration-300
                    ${isExistingCategory(category.id) ? 'bg-cyan-100' : 'hover:bg-cyan-50'}`}
                    onClick={e => { handleClickCategory(e, category) }}>
                    <span className="text-xs">{category.description}</span>
                </button>
            )
        })
    )

    return (
        <Dialog open={openCategoriesModal} handler={handleCategoriesModal}>
            <DialogHeader>Select Categories</DialogHeader>
            <div className="flex flex-wrap gap-3 place-content-center">
                <ListCategories categories={categories} setCategories={setCategories} />
            </div>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleCategoriesModal}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleConfirm}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default InterestCategoriesModal;