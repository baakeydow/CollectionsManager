import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import AddItem from "./AddItem";

class AllColl extends React.Component {

    togglEditMode(collName, e) {
        var el = document.getElementsByClassName(collName)[0];
        var collections = document.getElementsByClassName("collection-detail");
        if (el.style.display === "block") {
            el.style.display = "none";
            Object.keys(collections).map((i) => {
                collections[i].previousSibling.style.display = 'flex';
                collections[i].parentNode.style.display = "block";
            })
        } else {
            this.props.selectOneColl(collName);
            this.refs[collName].style.display = "none";
            Object.keys(collections).map((i) => {
                collections[i].style.display = 'none';
                collections[i].previousSibling.style.display = 'flex';
                collections[i].parentNode.style.borderStyle = 'none';
                collections[i].parentNode.style.display = "none";
            })
            el.parentNode.style.display = "block";
            el.parentNode.style.borderStyle = "solid";
            el.style.display = 'block';
        }
        e.preventDefault();
    }

    showdeleteBtn(id, e) {
        var btn = document.getElementById(id);
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
                <div ref={coll.name} className="ContentCenter">
                    <button onClick={this.togglEditMode.bind(this, coll.name)} className={ "btn btn-info ContentCenter toolbar" + coll.name }>
                        {coll.name}
                    </button>
                </div>
                <div className={ "collection-detail " + coll.name }>
                    <div className="toolbar ContentCenter">
                        <li onClick={this.showdeleteBtn.bind(this, coll.name)} className="legend">&nbsp;{coll.name}</li>
                        <button id={coll.name} className="btn btn-danger" onClick={ this.props.dropOneColl.bind(this, coll.name) }><span>Drop</span></button>
                    </div>
                    <AddItem dbColl={coll.name} addOneItem={this.props.addItemToColl}/>
                </div>
            </div>
        );
        if (!collectionsList.length) {
            collectionsList = <p>No Collections !</p>
        }
        return (
            <div className="ListAllCollections">
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
