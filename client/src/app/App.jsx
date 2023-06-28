// import { Home } from "../pages/Home/Home";
import { Books } from "../pages/Books/Books";
import { Favorites } from "../pages/Favorites/Favorites";
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
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Layout header={<Header />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/collections/books" element={<Books />} />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
