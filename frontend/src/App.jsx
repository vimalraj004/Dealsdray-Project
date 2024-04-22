import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Adminloginpage from "./components/Adminloginpage";
import Adminpage from "./components/Adminpage";
import Empregpage from "./components/Empregpage";
import Empeditpage from "./components/Empeditpage";
import Protect from "./components/Protect";
const App=()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<Adminloginpage/>} path="/"></Route>
            <Route element={<Protect data={Adminpage}/>} path="/adminpage"></Route>
            <Route element={<Protect data={Empregpage}/>} path="/empregpage"></Route>
            <Route element={<Protect data={Empeditpage}/>} path="/empeditpage/:id"></Route>
        </Routes>
        </BrowserRouter>
    )
}
export default App