import React, { Component } from 'react';

class Search extends Component {
    render(){
        return(
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
        );
    }
}

export default Search;