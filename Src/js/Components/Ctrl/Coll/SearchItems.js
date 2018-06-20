import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";

class SearchItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: null,
      results: [],
      value: ''
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

  filterList(allItemsList, event) {
    var updatedList = allItemsList;
    var value = event.target.value;
    updatedList = updatedList.filter((item) => {
      return item.link.url.toLowerCase().search(
        value.toLowerCase()) !== -1
        || item.link.desc.toLowerCase().search(
          value.toLowerCase()) !== -1;
    });
    this.setState({
      value,
      results: updatedList
    });
  }

  componentDidMount() {
    if (this.nameInput) {
      this.nameInput.focus();
    }
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
      const toRender = this.state.results.length != allItems.length ? this.state.results : [];
      var allItemsList = toRender.map((item) =>
        <div className="ContentLeft item list" key={item._id}>
          <div className="ContentRight col-sm-12 itemList">
            <li>&nbsp;&nbsp;<a href={item.link.url} target="_blank">{item.link.desc}</a><span style={{ fontSize: '7px' }}> {item.belongsTo}</span></li>
          </div>
        </div>
      );
      if (allItemsList.length) {
        return (
          <div className="searchItemsContainer">
            <div className="inputSearchItems">
              <fieldset>
                <input
                  value={this.state.value}
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search"
                  onChange={this.filterList.bind(this, allItems)}
                  ref={(input) => { this.nameInput = input; }}
                />
              </fieldset>
            </div>
            <div class="items-results">
              {allItemsList}
            </div>
          </div>
        );
      }
      return (
        <div className="searchItemsContainer">
          <div className="inputSearchItems">
            <fieldset>
              <input
                value={this.state.value}
                type="text"
                className="form-control form-control-lg"
                placeholder="Search"
                onChange={this.filterList.bind(this, allItems)}
                ref={(input) => { this.nameInput = input; }}
              />
            </fieldset>
          </div>
        </div>
      );
    }
    return (
      <div className="searchItemsContainer">
        <div className="inputSearchItems">
          <fieldset>
            <input
              value={this.state.value}
              type="text"
              className="form-control form-control-lg"
              placeholder="Search"
              ref={(input) => { this.nameInput = input; }}
            />
          </fieldset>
        </div>
      </div>
    );
  }

}

export default compose(connect(state => ({
  user: state.user.user,
}))(SearchItems));
