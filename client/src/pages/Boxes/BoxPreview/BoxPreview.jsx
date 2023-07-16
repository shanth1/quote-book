// import styles from "./styles.module.scss";
import { IoTrashBin, IoPencil } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const BoxPreview = ({
    boxData,
    setModalActive,
    setDeleteTitle,
    setDeleteId,
    setEditedBoxData,
    setEditModalActive,
}) => {
    const { id, title, image } = boxData;
    const navigate = useNavigate();

    const boxClickHandler = (event) => {
        navigate(`/collections/box/${id}`);
    };

    return (
        <div
            className="cursor-pointer flex flex-col p-3 gap-2 bg-white rounded-lg"
            onClick={boxClickHandler}
        >
            <div className="flex justify-between items-center">
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

                <h1>{title}</h1>
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
            <div className="w-full h-40 object-cover rounded-lg overflow-hidden">
                <img
                    className="object-cover w-full h-full"
                    src={image}
                    alt=""
                />
            </div>
        </div>
    );
};
