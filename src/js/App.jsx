import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Listing from "./Listing.jsx";
import Details from "./Details.jsx";

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 className="m-2">Starbust Opportunity</h1>
        <Route exact path={"/"} component={Listing} />
        <Route path="/listing/:id" component={Details} />
      </div>
    </Router>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));