import H2 from "../H2/H2";

export const AnimationUnderline = ({ children }) => {
    return (
        <div className="flex flex-col items-center">
            <H2>
                <div className="transition-all group-hover:tracking-wide">
                    {children}
                </div>
            </H2>

            <span className="block w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-black"></span>
        </div>
    );
};
