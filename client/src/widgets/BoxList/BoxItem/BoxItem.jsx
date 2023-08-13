// import styles from "./styles.module.scss";
import { IoTrashBin, IoPencil, IoBook } from "react-icons/io5";
import { BiSolidCameraMovie, BiSolidMusic } from "react-icons/bi";
import { BsFillPersonFill, BsFillBoxFill } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { classNames } from "../../../utils/classNames";

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

const getShadowStyleFromRating = (rating) => {
    switch (rating) {
        case 0:
            return "";
        case 1:
            return "shadow-md shadow-primary-200";
        case 2:
            return "shadow-lg shadow-primary-200";
        case 3:
            return "shadow-lg shadow-primary-300";
        case 4:
            return "shadow-lg shadow-primary-400";
        case 5:
            return "shadow-xl shadow-primary-400";
        default:
            break;
    }
};

const getStringFromDate = (date) => {
    const localeDate = date.toLocaleDateString();
    return String.prototype.concat(
        date.toLocaleTimeString().slice(0, 5),
        " ",
        localeDate.slice(0, -4),
        localeDate.slice(-2),
    );
};

export const BoxItem = ({
    boxData,
    setModalActive,
    setDeleteTitle,
    setDeleteId,
    setEditedBoxData,
    setEditModalActive,
}) => {
    const {
        id,
        title,
        type,
        authors,
        year,
        isPrivate,
        tags,
        image,
        genres,
        rating,
        createdAt,
        quoteCounter,
    } = boxData;
    const navigate = useNavigate();
    const createdDate = new Date(Number(createdAt));

    const boxClickHandler = (event) => {
        navigate(`/collections/box/${id}`);
    };

    return (
        <div
            className={classNames(
                "cursor-pointer flex flex-col px-3 pt-3 pb-1 gap-2 bg-white rounded-lg",
                getShadowStyleFromRating(rating),
            )}
            onClick={boxClickHandler}
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col items-start leading-none">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <span className="text-xs italic">
                        {getStringFromDate(createdDate)}
                    </span>
                </div>
                <div className="flex gap-2 items-center justify-start">
                    <div>
                        {isPrivate ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                    <div
                        className="p-1 hover:bg-primary-200 rounded-lg"
                        onClick={(event) => {
                            event.stopPropagation();
                            setEditedBoxData(boxData);
                            setEditModalActive(true);
                        }}
                    >
                        <IoPencil />
                    </div>
                    <div
                        className="p-1 bg-red-500 hover:bg-red-600 rounded-lg"
                        onClick={(event) => {
                            event.stopPropagation();
                            setDeleteTitle(title);
                            setDeleteId(id);
                            setModalActive(true);
                        }}
                    >
                        <IoTrashBin color="white" />
                    </div>
                </div>
            </div>
            {!!(authors.length || genres.length || year) && (
                <div className="leading-none">
                    {!!(authors.length || genres.length || year) && (
                        <div className="flex gap-2 justify-between text-sm">
                            {!!(authors.length || genres.length) && (
                                <div>
                                    {authors.length
                                        ? authors.join(", ")
                                        : genres.join(", ")}
                                </div>
                            )}
                            <div>{year}</div>
                        </div>
                    )}
                    {!!(authors.length && genres.length) && (
                        <div className="text-xs">{genres.join(", ")}</div>
                    )}
                </div>
            )}

            <div className="w-full h-full object-cover rounded-lg overflow-hidden">
                <img
                    className="object-cover w-full h-full"
                    src={image}
                    alt=""
                />
            </div>
            <div className={styles.footer}>
                <div className="flex items-center">{getIconFromType(type)}</div>
                <div className="flex justify-center">Tags</div>
                <div className="absolute right-0">{quoteCounter}</div>
            </div>
        </div>
    );
};
