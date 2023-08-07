import { IoTrashBin, IoPencil } from "react-icons/io5";
import H2 from "../../shared/H2/H2";

const QuoteItem = ({
    quoteData,
    setSelectedId,
    setDeleteModalActive,
    setUpdateModalActive,
    setSelectedQuoteData,
    setBoxId,
}) => {
    const { id, username, header, marker, tags, isPrivate, text } = quoteData;

    const boxId = quoteData.box.id;

    return (
        <div className="bg-white flex flex-col gap-4 rounded-lg w-full p-4">
            <div className="flex items-center justify-between">
                <div>
                    <H2>{header}</H2>
                    <p className="leading-none text-xs">{username}</p>
                </div>
                <div className="text-sm">{marker}</div>
                <div className="text-sm hidden lg:flex">{tags.join(", ")}</div>
                <div className="text-sm hidden md:flex">
                    {isPrivate ? "Private" : "Public"}
                </div>
                <div className="flex gap-2">
                    <div
                        className="p-2 cursor-pointer hover:bg-primary-200 rounded-lg"
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
                        className="p-2 cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg"
                    >
                        <IoTrashBin color="white" />
                    </div>
                </div>
            </div>
            <div>
                <p className="text-justify">{text}</p>
            </div>
        </div>
    );
};

export { QuoteItem };
