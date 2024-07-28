import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import NewTimer from "./pages/NewTimer/NewTimer.tsx";
import "./scss/index.scss";

const App = () => {
    return (
        <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/new" element={<NewTimer/>}/>
                <Route path="*" element={<div>404 Страница не найдена</div>}/>
        </Routes>
    );
};

export default App;
