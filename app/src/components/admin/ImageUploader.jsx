import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import api from '../../utils/axios';

const ImageUploader = ({ place }) => {
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (!place) return;
        fetchPlaceImage(place.id);
        // eslint-disable-next-line
    }, [place])

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
                setErrMsg(err?.message + " place image not found");
            } else {
                console.error("Failed to get place image", err);
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

    const handleSave = async () => {
        if (!imageFile) {
            alert('Please upload an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload success:', response.data);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        }
    };

    return (
        <div className="flex flex-col h-fit place-content-center place-items-center gap-4 p-6">
            {preview ? (
                <img src={preview} alt="Preview" className="w-full max-w-96 max-h-96 object-contain border" />
            ) : (
                <div className="w-64 h-64 border flex items-center justify-center text-gray-500">
                    No image selected
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
