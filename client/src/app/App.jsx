import { Boxes } from "../pages/Boxes/Boxes";
import { Collections } from "../pages/Collections/Collections";
import { Feed } from "../pages/Feed/Feed";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { NotFound } from "../pages/NotFound/NotFound";
import { Profile } from "../pages/Profile/Profile";
import { Quotes } from "../pages/Quotes/Quotes";
import { Register } from "../pages/Register/Register";
import { Settings } from "../pages/Settings/Settings";
import { Layout } from "../shared/Layout/Layout";
import { Header } from "../widgets/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
    return (
        <div>
            <Layout header={<Header />}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="feed" element={<Feed />} />
                    <Route path="collections" element={<Collections />}>
                        <Route index element={<Navigate to="boxes" />} />
                        <Route path="boxes" element={<Boxes />} />
                        <Route path="quotes" element={<Quotes />} />
                    </Route>
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
