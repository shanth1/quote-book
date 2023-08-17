import { Outlet } from "react-router-dom";
import { TabBar } from "../../widgets/TabBar/TabBar";

export const Collections = () => {
    return (
        <div className="pb-20">
            <Outlet />
            <TabBar />
        </div>
    );
};
