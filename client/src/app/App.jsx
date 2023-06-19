import { Home } from "../pages/Home/Home";
import { Layout } from "../shared/Layout/Layout";
import { Header } from "../widgets/Header/Header";

function App() {
    return (
        <div>
            <Layout header={<Header />}>
                <Home />
            </Layout>
        </div>
    );
}

export default App;
