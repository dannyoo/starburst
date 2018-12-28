import React from "react";
import ReactDOM from "react-dom";

import Search from "./Search.jsx";
import Listing from "./Listing.jsx";

const App = () => {
  return (
    <div className="container">
      <h1 className="m-2">Starbust Opportunity</h1>
      <Search />
      <Listing />
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));