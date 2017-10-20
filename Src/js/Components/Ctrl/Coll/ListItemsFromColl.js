import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux"

class AllColl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemUpdate: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    updateItem(coll, id) {
        if (this.state.itemUpdate[id]) {
            this.props.updateItem(coll, id, this.state.itemUpdate[id]);
        }
        this.state.itemUpdate[id] = '';
        var divs = document.querySelectorAll('div.ContentLeft.col-sm-6.itemAction')
        if (divs) {
            divs.forEach((div) => {
                div.style.display = 'none'
            });
        }
    }

    handleChange(id, event) {
        this.setState({
            itemUpdate: {
                [id]: event.target.name === id ? event.target.value : this.state.itemUpdate.id
            }
        });
        event.preventDefault();
    }

    render() {
        var { coll } = this.props;
        var mappedColl = [];
        if (coll && coll[0] && coll[0].coll) {
            coll.forEach((item) => {
                if (item.item) {
                    mappedColl.push(
                        <div className="ContentLeft item list" key={item._id}>
                            <div className="ContentLeft col-sm-6 itemAction">
                                <button onClick={ this.props.delItem.bind(this, coll[0].coll, item._id) } className="ContentCenter btnMode">X</button>
                                <input value={this.state.itemUpdate[item._id]} onChange={ this.handleChange.bind(this, item._id) } name={item._id} type="text" className="form-control" placeholder="newValue"/>
                                <button onClick={ this.updateItem.bind(this, coll[0].coll, item._id) } className="ContentCenter btnMode">U</button>
                            </div>
                            <div className="ContentRight col-sm-6 itemList">
                                <li>&nbsp;&nbsp;<a href={item.item} target="_blank">{item.item}</a></li>
                            </div>
                        </div>
                    );
                }
            })
        }
        if (!mappedColl.length) {
            mappedColl = <p style={{marginLeft:'9px'}}>No Data !</p>
        }
        return (
            <div className="mappedColl">
                {mappedColl}
            </div>
        );
    }

}

export default compose(connect(state => ({
  coll: state.collections.coll
}))(AllColl));
