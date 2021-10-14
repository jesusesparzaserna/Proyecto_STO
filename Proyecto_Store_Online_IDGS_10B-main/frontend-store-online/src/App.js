import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Articulo from "./components/Articulo";
import Marticulos from "./components/Marticilos";




function App() {
  return (
    <Router>
    <div className="App">
      
    <h1> aqui va la navegacion</h1>
    <hr></hr>
<switch>
  <Route path="/articulos">
  <Articulo></Articulo>
  </Route>
  <Route path="/marticulos">
  <Marticulos></Marticulos>
  </Route>
</switch>
    </div>
    </Router>
  );
} 

export default App;
