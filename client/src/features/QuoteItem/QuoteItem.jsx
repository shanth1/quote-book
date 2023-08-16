import { IoTrashBin, IoPencil } from "react-icons/io5";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getStringFromDate } from "../../utils/dateString";
import { BsFillBookmarkFill, BsFillChatLeftQuoteFill } from "react-icons/bs";
import { Tags } from "../../entities/Tags/Tags";
import { Tooltip } from "../../shared/Label/Components/Tooltip/Tooltip";

const QuoteItem = ({
    quoteData,
    setSelectedId,
    setDeleteModalActive,
    setUpdateModalActive,
    setSelectedQuoteData,
    setBoxId,
}) => {
    const { id, header, marker, tags, isPrivate, text, createdAt } = quoteData;
    const createdDate = new Date(Number(createdAt));
    const boxId = quoteData.box.id;

    return (
        <div className="group bg-white overflow-hidden w-full min-w-[200px] flex flex-col gap-2 rounded-lg p-4">
            <div className="flex justify-end items-start">
                {header || marker || !!tags.length ? (
                    <div className="w-full min-h-[32px] flex flex-col gap-2 justify-center items-start leading-none">
                        {header && (
                            <div className="w-[80%] truncate transition-all text-lg font-bold">
                                {header}
                            </div>
                        )}
                        {marker && (
                            <div className="flex items-center gap-2">
                                <BsFillBookmarkFill size="0.8rem" />
                                {marker}
                            </div>
                        )}
                        {!!tags.length && (
                            <div className="flex items-center">
                                <Tags tags={tags} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full min-h-[32px] flex justify-start items-center">
                        <BsFillChatLeftQuoteFill />
                    </div>
                )}
                <div className="w-[96px] h-[32px] flex gap-2 items-center justify-start transition-all duration-300">
                    <Tooltip message={isPrivate ? "Private box" : "Public box"}>
                        <div>
                            {isPrivate ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </div>
                    </Tooltip>
                    <div
                        className="p-2 cursor-pointer transition-all hover:bg-primary-200 rounded-lg"
                        onClick={() => {
                            setSelectedId(id);
                            setUpdateModalActive(true);
                            setSelectedQuoteData(quoteData);
                            setBoxId(boxId);
                        }}
                    >
                        <IoPencil />
                    </div>
                    <div
                        onClick={() => {
                            setSelectedId(id);
                            setDeleteModalActive(true);
                            setBoxId(boxId);
                        }}
                        className="p-2 cursor-pointer transition-all bg-red-500 hover:bg-red-600 rounded-lg"
                    >
                        <IoTrashBin color="white" />
                    </div>
                </div>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg border">
                {text.split("\n").map((stroke) => (
                    <p>{stroke}</p>
                ))}
            </div>

            <span className="text-xs italic">
                {getStringFromDate(createdDate)}
            </span>
        </div>
    );
};

export { QuoteItem };
