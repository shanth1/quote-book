import { Outlet } from "react-router-dom";
import { TabBar } from "../../widgets/TabBar/TabBar";

export const Collections = ({ userId }) => {
    return (
        <div>
            <Outlet />
            <TabBar userId={userId} />
        </div>
    );
};
