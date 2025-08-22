import { useEffect, useState } from "react";
import api from "../../utils/axios";

const ImageDisplayer = ({ placeId }) => {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        let url;

        async function fetchImage(id) {
            try {
                const res = await api.get(`/places/image/${id}`, {responseType: "blob"});
                url = URL.createObjectURL(res.data);
                setPreview(url);
            } catch (err) {
                console.warn("Failed to load place image: ", err?.response?.status || err?.message);
                setPreview(null);
            }
        }

        setPreview(null);
        if (placeId) fetchImage(placeId);

        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [placeId]);

    return (
        <div className="flex flex-col h-fit place-content-center place-items-center gap-4 p-6">
            {preview ? (
                <img
                    src={preview}
                    alt="Place"
                    className="w-full max-w-96 max-h-96 object-contain border"
                />
            ) : (
                <div className="w-64 h-64 border flex items-center justify-center text-gray-500 text-center px-2">
                    Select a place to load image
                </div>
            )}
        </div>
    );
};

export default ImageDisplayer;
