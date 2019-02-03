import React, { Component } from 'react';
import Filter from './Filter.jsx';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    applyFilter = filterString => {
        // this.state query doesn't change! what get sent to the server is in Listing.jsx state.lastSearchQuery
        if (filterString === "nada"){
            this.props.userDidTextSearch("nada");
        } else {
            this.props.userDidTextSearch(`${this.state.query} ${filterString}`)
        }
    }
    
    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;
    
        this.setState({ [itemName]: itemValue });
        e.preventDefault();
    }

    handleSubmit(e) {
        if (this.state.query == "" || this.state.query == null) {
            this.props.userDidTextSearch("nada")
        } else {this.props.userDidTextSearch(`${this.state.query}`)}
        
        e.preventDefault();
    }

    render(){

        return(
            <>
            <div className="m-4 search">
                <div className="input-group">
                    <input name="query" type="text" className="form-control" placeholder="Search the listing"
                    onChange={this.handleChange}
                    ></input>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit" 
                    onClick={this.handleSubmit}>
                        <i className="fa fa-search"></i>
                    </button>
                    </div>
                </div>
                <button id="filter" className="btn btn-secondary" type="button" data-toggle="modal" data-target="#filterModalCenter">
                    <i className="fa fa-filter"></i>
                </button>
            </div>
            <Filter applyFilter={this.applyFilter} />
            </>
        );
    }
}

export default Search;