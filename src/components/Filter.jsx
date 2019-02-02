import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            // radius: "",
            // zip: "", 
            area: "",
            school: "",
            IV: "",
            filterString: ""
        }
        this.handleReset = this.handleReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleApply = this.handleApply.bind(this);
    }
    
    handleReset(e) {
        this.setState({
            type: "",
            area: "",
            school: "",
            IV: "",
            filterString: ""
        }, () => {this.props.applyFilter(this.state.filterString)});
        
        e.preventDefault();
    }

    handleApply(e) {
        this.props.applyFilter(`${this.state.filterString}`);
        e.preventDefault();
    }

    handleChange(e) {
        const itemName = e.target.id;
        const itemValue = e.target.value;
        
        this.setState({
            [itemName]: `${itemValue}`
        }, () => {
            let q = `${this.state.IV} ${this.state.type} ${this.state.area} ${this.state.school}`;
            this.setState({ filterString: q });
        });

        e.preventDefault();
    }

    render() {
        return (
            <div className="modal fade" id="filterModalCenter" tabIndex="-1" role="dialog" aria-labelledby="filterModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="filterModalCenterTitle">Filter</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="type" >Type of Activity</label>
                                    <select className="form-control" id="type" onChange={(e) => this.handleChange(e)} name="type">
                                        <option value="">Any ;)</option>
                                        <option value="online">Online</option>
                                        <option value="in-person">In-Person</option>
                                        <option value="physically demanding">Physically Demanding</option>
                                    </select>
                                </div>
                                <div className="dropdown-divider"></div>
                                {/* <div className="form-inline mb-2 py-2"> */}
                                <div className="form-group">
                                    {/* <label htmlFor="radius">Within &nbsp;</label>
                            <select className="form-control mr-sm-2" id="radius">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                    <option>100</option>
                                    <option>Any Distance</option>
                                </select>
                            <label htmlFor="postal" className="mt-sm-0 mt-1">miles of &nbsp;</label>
                            <input type="text" className="form-control" id="postal" placeholder="Postal Code"/> */}
                                    <label htmlFor="area" className="">Area Name</label>
                                    <input type="text" className="form-control" id="area" placeholder="County, Suburb name, Postal code"
                                        onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="form-group">
                                    <label htmlFor="school">Associated School</label>
                                    <input type="text" className="form-control" id="school" placeholder="Favorite School" value={this.state.school} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="form-group">
                                    <label htmlFor="IV">Interests and Values</label>
                                    <input type="text" className="form-control" id="IV" placeholder="Animals, Technology, Environment, etc."
                                        onChange={(e) => this.handleChange(e)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={(e)=> this.handleReset(e)}>Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e)=>this.handleApply(e)}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;