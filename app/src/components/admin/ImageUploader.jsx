import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import api from '../../utils/axios';

const ImageUploader = ({ place, setImageFile }) => {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!place.id) return;
        fetchPlaceImage(place.id);
    }, [place.id])

    async function fetchPlaceImage(id) {
        let fetchUrl = `/places/image/${id}`;

        try {
            const response = await api.get(fetchUrl, {responseType: 'blob'});
            const url = URL.createObjectURL(response.data);
            setPreview(url);
        } catch (err) {
            const statusCode = err.response?.status;

            // PlaceId not found
            if (statusCode === 404) {
                console.log(err?.message + " place image not found");
            } else {
                console.log("Failed to get place image", err);
            }
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUploadClick = () => {
        document.getElementById('imageInput').click();
    };

    return (
        <div className="flex flex-col h-fit place-content-center place-items-center gap-4 p-6">
            {preview ? (
                <img src={preview} alt="Preview" className="w-full max-w-96 max-h-96 object-contain border" />
            ) : (
                <div className="w-64 h-64 border flex items-center justify-center text-gray-500">
                    No image
                </div>
            )}

            <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <Button color="blue-gray" onClick={handleUploadClick}>Upload new Image</Button>
        </div>
    );
};

export default ImageUploader;
