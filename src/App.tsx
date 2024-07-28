import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import NewTimer from "./pages/NewTimer/NewTimer.tsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/new" element={<NewTimer/>}/>
                <Route path="*" element={<div>404 Страница не найдена</div>}/>
            </Routes>
            <ToastContainer position={"top-center"} autoClose={false} closeButton={false} />
        </>
    );
};

export default App;
