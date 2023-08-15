import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import { BoxHeader } from "./components/BoxHeader";
import { BoxFooter } from "./components/BoxFooter";
import { BoxImage } from "./components/BoxImage";
import { BoxPayload } from "./components/BoxPayload";

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

export const BoxItem = ({ boxData, setFunctions }) => {
    const {
        id,
        type,
        authors,
        year,
        tags,
        image,
        genres,
        rating,
        createdAt,
        quoteCounter,
    } = boxData;
    const navigate = useNavigate();

    const boxClickHandler = (event) => {
        navigate(`/collections/box/${id}`);
    };

    return (
        <div
            className={classNames(
                "group transition-all duration-300 hover:bg-primary-50 cursor-pointer flex flex-col px-3 pt-3 pb-1 gap-2 bg-white rounded-lg",
                getShadowStyleFromRating(rating),
            )}
            onClick={boxClickHandler}
        >
            <BoxHeader
                boxData={boxData}
                dateString={createdAt}
                setFunctions={setFunctions}
            />
            {!!(authors.length || genres.length || year) && (
                <BoxPayload authors={authors} genres={genres} year={year} />
            )}
            <BoxImage image={image} />
            <BoxFooter type={type} tags={tags} quoteCounter={quoteCounter} />
        </div>
    );
};
