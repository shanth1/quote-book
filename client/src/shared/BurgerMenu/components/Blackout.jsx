export const Blackout = ({ active, setActive }) => {
    return (
        <div onClick={() => setActive(false)}>
            <div className="fixed top-0 left-0 w-screen h-[60px] z-10"></div>
            <div
                className={
                    active
                        ? "fixed top-[60px] left-0 w-screen h-screen bg-[rgba(0,0,0,0.3)] z-10"
                        : "fixed top-[60px] left-0 w-screen h-screen z-10"
                }
            ></div>
        </div>
    );
};
