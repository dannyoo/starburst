import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div className="container">
      <h1 className="m-2">Starbust Opportunity</h1>
      {/* Search Zone */}
      <div className="m-4 search">
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Search the listing"></input>
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
        </div>
        <button id="filter" className="btn btn-secondary" type="button">
            <i className="fa fa-filter"></i>
          </button>
      </div>
      {/* Oportunity List */}
      <ul id="list" className="list-group"></ul>
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));