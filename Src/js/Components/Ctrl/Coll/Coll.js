import React from "react";
import AddItem from "./AddItem";

class Coll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  togglEditMode(collName, e) {
    var el = document.getElementsByClassName(collName)[0];
    var collections = document.getElementsByClassName("collection-detail");
    if (el.style.display === "block") {
      el.style.display = "none";
      el.parentNode.getElementsByClassName('btn btn-success ContentLeft')[0].style.color = "white";
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
      el.parentNode.getElementsByClassName('btn btn-success ContentLeft')[0].style.color = "red";
      el.style.display = 'block';
    }
    e.preventDefault();
  }

  render() {
    var { coll } = this.props;
    if (!coll) {
      return (
        <div className="singleColl">
          <p>No Collections !</p>
        </div>
      );
    }
    return (
      <div className="singleColl">
        <div ref={coll.name} className="ContentLeft">
          <button onClick={this.togglEditMode.bind(this, coll.name)} className={"btn btn-success ContentLeft toolbar" + coll.name}>
            {coll.name}
          </button>
        </div>
        <div className={"collection-detail " + coll.name}>
          <div className="toolbar ContentCenter">
            <li onClick={this.showdeleteBtn.bind(this, coll.name)} className="legend">&nbsp;{coll.name}</li>
            <button id={coll.name} className="btn btn-danger" onClick={this.props.dropOneColl.bind(this, coll.name)}><span>Drop</span></button>
          </div>
          <AddItem dbColl={coll.name} addOneItem={this.props.addItemToColl} />
        </div>
      </div>
    );
  }
}

export default Coll;
