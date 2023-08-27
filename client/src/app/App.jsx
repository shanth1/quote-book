import { Box } from "../pages/Collections/pages/Box/Box";
import { Collections } from "../pages/Collections/Collections";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { NotFound } from "../pages/NotFound/NotFound";
import { Profile } from "../pages/Profile/Profile";
import { Quotes } from "../pages/Collections/pages/Quotes/Quotes";
import { Register } from "../pages/Register/Register";
import { Layout } from "../shared/Layout/Layout";
import { Header } from "../widgets/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import { Boxes } from "../pages/Collections/pages/Boxes/Boxes";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { About } from "../pages/About/About";
import { PlaygroundBoxes } from "../pages/Playground/PlaygroundBoxes";
import { PlaygroundQuotes } from "../pages/Playground/PlaygroundQuotes";
import { PlaygroundBox } from "../pages/Playground/PlaygroundBox";

function App() {
    const { userId } = useContext(AuthContext);

    return (
        <div>
            <Layout header={<Header />}>
                {userId ? (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="collections" element={<Collections />}>
                            <Route index element={<Navigate to="boxes" />} />
                            <Route path="boxes" element={<Boxes />} />
                            <Route path="quotes" element={<Quotes />} />
                            <Route path="box/:boxId" element={<Box />} />
                        </Route>
                        <Route path="about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="restore" element={<NotFound />} />
                        <Route path="playground" element={<Collections />}>
                            <Route index element={<Navigate to="boxes" />} />
                            <Route path="boxes" element={<PlaygroundBoxes />} />
                            <Route
                                path="quotes"
                                element={<PlaygroundQuotes />}
                            />
                            <Route
                                path="box/:boxId"
                                element={<PlaygroundBox />}
                            />
                        </Route>
                        <Route path="about" element={<About />} />
                        <Route path="*" element={<Navigate to="login" />} />
                    </Routes>
                )}
            </Layout>
        </div>
    );
}

export default App;
