import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import AddItem from "./AddItem";

class AllColl extends React.Component {

    showEditMode(id, e) {
        var btn = document.getElementById(id)
        if (btn) {
            if (btn.style.display === 'none') {
                btn.style.display = 'flex';
                btn.style.padding = '1px';
            } else {
                btn.style.display = 'none';
            }
        }
        e.preventDefault();
    }

    render() {
        var { collections } = this.props;

        var collectionsList = collections.map((coll, i) =>
            <div className="singleColl" key={i}>
                <div className="toolbar ContentCenter">
                    <button className="btn btn-success" onClick={ this.props.selectOneColl.bind(this, coll.name) }><span>List</span></button>
                    <li onClick={this.showEditMode.bind(this, coll.name)} className="legend">&nbsp;{coll.name}</li>
                    <button id={coll.name} className="btn btn-danger" onClick={ this.props.dropOneColl.bind(this, coll.name) }><span>Drop</span></button>
                </div>
                <AddItem dbColl={coll.name} addOneItem={this.props.addItemToColl}/>
            </div>
        );
        if (!collectionsList.length) {
            collectionsList = <p>No Collections !</p>
        }
        return (
            <div className="ListAllColl">
                {collectionsList}
            </div>
        );
    }

}

export default compose(connect(state => ({
  user: state.user.user,
  collections: state.collections.collections,
  coll: state.collections.coll
}))(AllColl));
