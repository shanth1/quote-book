import { IoTrashBin, IoPencil } from "react-icons/io5";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getStringFromDate } from "../../../../utils/dateString";

export const BoxHeader = ({ boxData, createdAt, setFunctions }) => {
    const {
        setDeleteTitle,
        setDeleteModalActive,
        setDeleteId,
        setEditedBoxData,
        setEditModalActive,
    } = setFunctions;
    const createdDate = new Date(Number(createdAt));
    const { id, title, isPrivate } = boxData;
    return (
        <div className="relative">
            <div className="flex flex-col items-start leading-none">
                <div className="w-[60%] truncate transition-all text-lg font-bold group-hover:tracking-wider">
                    {title}
                </div>
                <span class="block w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-black"></span>
                <span className="text-xs italic">
                    {getStringFromDate(createdDate)}
                </span>
            </div>
            <div className="absolute right-0 top-0 flex gap-2 transition-all duration-300 items-center justify-start ">
                <div>{isPrivate ? <AiFillEyeInvisible /> : <AiFillEye />}</div>
                <div
                    className="p-1 transition-all hover:bg-primary-200 rounded-lg"
                    onClick={(event) => {
                        event.stopPropagation();
                        setEditedBoxData(boxData);
                        setEditModalActive(true);
                    }}
                >
                    <IoPencil />
                </div>
                <div
                    className="p-1 transition-all bg-red-500 hover:bg-red-600 rounded-lg"
                    onClick={(event) => {
                        event.stopPropagation();
                        setDeleteTitle(title);
                        setDeleteId(id);
                        setDeleteModalActive(true);
                    }}
                >
                    <IoTrashBin color="white" />
                </div>
            </div>
        </div>
    );
};
