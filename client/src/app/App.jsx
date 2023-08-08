import { Box } from "../pages/Collections/pages/Box/Box";
import { Collections } from "../pages/Collections/Collections";
import { Feed } from "../pages/Feed/Feed";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { NotFound } from "../pages/NotFound/NotFound";
import { Profile } from "../pages/Profile/Profile";
import { Quotes } from "../pages/Collections/pages/Quotes/Quotes";
import { Register } from "../pages/Register/Register";
import { Settings } from "../pages/Settings/Settings";
import { Layout } from "../shared/Layout/Layout";
import { Header } from "../widgets/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import { Boxes } from "../pages/Collections/pages/Boxes/Boxes";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function App() {
    const { userId } = useContext(AuthContext);

    return (
        <div>
            <Layout header={<Header />}>
                {userId ? (
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="feed" element={<Feed />} />
                        <Route
                            path="collections"
                            element={<Collections userId={userId} />}
                        >
                            <Route index element={<Navigate to="boxes" />} />
                            <Route
                                path="boxes"
                                element={<Boxes userId={userId} />}
                            />
                            <Route
                                path="quotes"
                                element={<Quotes userId={userId} />}
                            />
                            <Route
                                path="box/:boxId"
                                element={<Box userId={userId} />}
                            />
                        </Route>
                        <Route path="settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="feed" element={<Feed />} />
                        <Route path="*" element={<Navigate to="login" />} />
                    </Routes>
                )}
            </Layout>
        </div>
    );
}

export default App;
