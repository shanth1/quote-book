// import styles from "./styles.module.scss";
import { IoTrashBin, IoPencil } from "react-icons/io5";

export const Box = ({ boxData }) => {
    const { title, image } = boxData;
    return (
        <div className="cursor-pointer flex flex-col p-3 gap-2 bg-white rounded-lg ">
            <div className="flex justify-between items-center">
                <div className="p-1 hover:bg-primary-200 rounded-lg">
                    <IoPencil />
                </div>

                <h1>{title}</h1>
                <div className="p-1 bg-red-500 hover:bg-red-600 rounded-lg">
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
