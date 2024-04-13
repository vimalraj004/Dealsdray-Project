import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Adminloginpage from "./components/Adminloginpage";
import Adminpage from "./components/Adminpage";
import Empregpage from "./components/Empregpage";
import Empeditpage from "./components/Empeditpage";
const App=()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<Adminloginpage/>} path="/"></Route>
            <Route element={<Adminpage/>} path="/adminpage"></Route>
            <Route element={<Empregpage/>} path="/empregpage"></Route>
            <Route element={<Empeditpage/>} path="/empeditpage/:id"></Route>
        </Routes>
        </BrowserRouter>
    )
}
export default App