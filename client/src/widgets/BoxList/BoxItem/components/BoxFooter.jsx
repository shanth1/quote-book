import { IoBook } from "react-icons/io5";
import { BiSolidCameraMovie, BiSolidMusic } from "react-icons/bi";
import { BsFillPersonFill, BsFillBoxFill } from "react-icons/bs";
import { Tags } from "../../../../entities/Tags/Tags";
import { Tooltip } from "../../../../shared/Label/Components/Tooltip/Tooltip";

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
export const BoxFooter = ({ type, tags, quoteCounter }) => {
    return (
        <div className="relative w-full grid grid-cols-[10%_1fr_10%]">
            <Tooltip message={`Type: ${type}`}>
                <div className="flex items-center">{getIconFromType(type)}</div>
            </Tooltip>
            <Tags tags={tags} />
            <Tooltip
                message={`${quoteCounter === 0 ? "No" : quoteCounter} ${
                    quoteCounter === 1 ? "quote" : "quotes"
                } in box`}
            >
                <div className="flex justify-end">{quoteCounter}</div>
            </Tooltip>
        </div>
    );
};
