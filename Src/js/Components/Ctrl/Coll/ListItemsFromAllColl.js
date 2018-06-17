import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";

class ListAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: null
    };
    this.getThemLinks = this.getThemLinks.bind(this);
  }

  getThemLinks() {
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/db/listall' : '/db/listall';

    axios({
      method: 'get',
      url: url
    }).then((response) => {
      this.setState({
        collections: response.data
      });
    }).catch((err) => {
      console.log('ERROR! : ', err);
    })
  }

  componentWillMount() {
    this.getThemLinks();
  }

  render() {
    var { collections } = this.state;
    if (collections && collections.length) {
      var allItems = [];
      var startWith = [];
      collections.forEach((coll, i) => {
        if (coll[0] && coll[0].belongsTo) {
          startWith.push(coll[0].belongsTo);
        }
        coll.map((item) => {
          allItems.push(item);
        });
      });
      var displayTitle = function (belongsTo) {
        if (belongsTo === startWith[0]) {
          startWith.splice(0, 1);
          return <h4>{belongsTo}</h4>;
        }
        return "";
      };
      var allItemsList = allItems.map((item) =>
        <div className="ContentLeft item list" key={item._id}>
          {displayTitle(item.belongsTo)}
          <div className="ContentRight col-sm-6 itemList">
            <li>&nbsp;&nbsp;<a href={item.link.url} target="_blank">{item.link.desc}</a></li>
          </div>
        </div>
      );
      return (
        <div className="mappedColl">
          {allItemsList}
        </div>
      );
    }
    return (
      <div className="ContentLeft item list">
        <div className="ContentRight col-sm-6 itemList">
          Loading...
        </div>
      </div>
    );
  }

}

export default compose(connect(state => ({
  user: state.user.user,
}))(ListAll));
