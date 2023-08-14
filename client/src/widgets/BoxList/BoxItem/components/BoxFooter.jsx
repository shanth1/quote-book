import { IoBook } from "react-icons/io5";
import { BiSolidCameraMovie, BiSolidMusic } from "react-icons/bi";
import { BsFillPersonFill, BsFillBoxFill } from "react-icons/bs";

const getIconFromType = (type) => {
    switch (type) {
        case "Book":
            return <IoBook />;
        case "Movie":
            return <BiSolidCameraMovie />;
        case "Person":
            return <BsFillPersonFill />;
        case "Music":
            return <BiSolidMusic />;
        case "Other":
            return <BsFillBoxFill />;
        default:
            break;
    }
};
export const BoxFooter = ({ type, quoteCounter }) => {
    return (
        <div className="relative w-full grid grid-cols-[10%_1fr_10%]">
            <div className="flex items-center">{getIconFromType(type)}</div>
            <div className="flex justify-center">Tags</div>
            <div className="absolute right-0">{quoteCounter}</div>
        </div>
    );
};
