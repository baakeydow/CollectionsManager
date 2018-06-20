import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import Coll from "./Coll";

class AllColl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.collections,
      value: ''
    }
  }

  filterList(event) {
    var updatedList = this.props.collections;
    var value = event.target.value;
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().search(
        value.toLowerCase()) !== -1;
    });
    this.setState({
      value,
      items: updatedList
    });
  }

  render() {
    var items = (this.state.items.length === 0 && !this.state.value)
      ? this.props.collections
      : this.state.items;
    var collectionsList = items.map((coll, i) =>
      <Coll
        selectOneColl={this.props.selectOneColl}
        dropOneColl={this.props.dropOneColl}
        addItemToColl={this.props.addItemToColl}
        coll={coll}
        key={i}
      />
    );
    if (!collectionsList.length) {
      collectionsList = <p>No Collections !</p>
    }
    return (
      <div className="ListAllCollections">
        <div className="singleColl">
          <fieldset>
            <input
              value={this.state.value}
              type="text"
              className="form-control form-control-lg"
              placeholder="Search"
              onChange={this.filterList.bind(this)}
            />
          </fieldset>
        </div>
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
