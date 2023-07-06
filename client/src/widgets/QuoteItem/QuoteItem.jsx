import { IoTrashBin, IoPencil } from "react-icons/io5";
import H2 from "../../shared/H2/H2";

const QuoteItem = ({ username, header, marker, tags, status, text }) => {
    return (
        <div className="bg-white flex flex-col gap-4 rounded-lg w-full p-4">
            <div className="flex items-center justify-between">
                <div>
                    <H2>Header</H2>
                    <p className="leading-none text-xs">username</p>
                </div>
                <div className="text-sm">273 page</div>
                <div className="text-sm hidden lg:flex">Work, Personal</div>
                <div className="text-sm hidden md:flex">Private</div>
                <div className="flex gap-2">
                    <div className="p-2 cursor-pointer hover:bg-primary-200 rounded-lg">
                        <IoPencil />
                    </div>
                    <div className="p-2 cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg">
                        <IoTrashBin color="white" />
                    </div>
                </div>
            </div>
            <div>
                <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laboriosam ipsam mollitia, officiis eos non sapiente, error
                    ea cumque animi temporibus delectus pariatur quidem
                    blanditiis tempore maxime perspiciatis unde! Culpa,
                    voluptas.
                </p>
            </div>
        </div>
    );
};

export { QuoteItem };
