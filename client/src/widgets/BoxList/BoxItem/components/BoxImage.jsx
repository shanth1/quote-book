import { useState } from "react";
import { LuImageOff } from "react-icons/lu";

export const BoxImage = ({ image }) => {
    const [valid, setValid] = useState(false);

    const isImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = resolve;
            image.onerror = reject;
        });

    isImage(image)
        .then((response) => {
            setValid(true);
        })
        .catch((error) => {
            setValid(false);
        });

    return (
        <div className="w-full h-full object-cover rounded-lg overflow-hidden">
            {valid ? (
                <img
                    className="group-hover:scale-110 transition-all duration-300 object-cover w-full h-full"
                    src={image}
                    alt="Not found"
                />
            ) : (
                <div className="bg-primary-100 py-6 flex flex-col justify-center items-center group-hover:scale-110 transition-all duration-300 w-full h-full">
                    <LuImageOff />
                    Image not found
                </div>
            )}
        </div>
    );
};
