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
        console.log(this.props);
        var { collections } = this.props;
        const index = collections.indexOf('system.indexes');
        if (index !== -1) {
            collections.splice(index, 1)
        }
        var collectionsList = collections.map((coll, i) =>
            <div className="singleColl" key={i}>
                <div className="toolbar ContentCenter">
                    <button className="btn btn-success" onClick={ this.props.selectOneColl.bind(this, coll) }><span>List</span></button>
                    <li onClick={this.showEditMode.bind(this, coll)} className="legend">&nbsp;{coll}</li>
                    <button id={coll} className="btn btn-danger" onClick={ this.props.dropOneColl.bind(this, coll) }><span>Drop</span></button>
                </div>
                <AddItem dbColl={coll} addOneItem={this.props.addItemToColl}/>
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
