import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import InputFile from "../Utils/FileInput";
import SearchItems from "./Coll/SearchItems";
import AddOneColl from "./Coll/AddOneColl";
import ListAllColl from "./Coll/ListAllColl";
import ListItemsFromColl from "./Coll/ListItemsFromColl";
import ListItemsFromAllColl from "./Coll/ListItemsFromAllColl";

class Linksctrl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      wording: this.props.wording,
      collections: this.props.collections
    };
    this.addOneColl = this.addOneColl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillMount() {
    this.setState({
      user: this.props.user,
      wording: this.props.wording,
      collections: this.props.collections
    });
  }

  addOneColl(data) {
    this.props.addOneColl(data);
  }

  logOut() {
    if (this.props.user &&
      this.props.user.perm) {
      var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/out' : '/out';
      axios({
        method: 'get',
        url: url
      }).then((response) => {
        console.log("user logged out");
        window.location.reload();
      }).catch((err) => {
        console.log('ERROR! : ', err);
      })
    }
  }

  handleSubmit(e) {
    const file = e.target.files[0];
    var bodyFormData = new FormData();
    bodyFormData.set('file', file);
    axios({
      method: 'post',
      url: process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/files/upload' : '/files/upload',
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
      data: bodyFormData
    }).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
    e.preventDefault();
    e.stopPropagation();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      wording: nextProps.wording ? nextProps.wording : this.props.wording,
      user: nextProps.user ? nextProps.user : this.props.user,
      collections: nextProps.collections ? nextProps.collections : this.props.collections,
      coll: nextProps.coll ? nextProps.coll : this.props.coll
    });
  }

  render() {
    var { user, collections } = this.state;
    if ((user.perm || process.env.NODE_ENV === 'dev') && !collections.length) {
      this.props.displayAllColl();
    }
    if (user.perm || process.env.NODE_ENV === 'dev') {
      return (
        <div className="container">
          <div className="Content title">
            <h3>
              {this.state.wording.title}
            </h3>
            <div className="addOneForm">
              <btn>
                <NavLink style={{ float: 'left' }} to="/"><button class="btn btn-success" onClick={this.logOut}>Log out</button></NavLink>
              </btn>
            </div>
            <div class="ContentLeft">
              <form className="addOneForm">
                <div class="btn btn-success">
                  <InputFile name="fileInput" onChange={this.handleSubmit} />
                </div>
              </form>
            </div>
            <div class="ContentLeft">
              <AddOneColl addOneColl={this.addOneColl} />
            </div>
            <div class="ContentCenter">
              <SearchItems />
            </div>
            <div class="Dashboard">
              <div class="Dashboard-coll">
                <ListAllColl
                  addOneColl={this.props.addOneColl}
                  addItemToColl={this.props.addItemToColl}
                  selectOneColl={this.props.selectOneColl}
                  dropOneColl={this.props.dropOneColl}
                />
              </div>
              <div class="Dashboard-items">
                <ListItemsFromColl delItem={this.props.delItem} updateItem={this.props.updateItem} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="Content title" style={{ marginBottom: "20px" }}>
            <ListItemsFromAllColl />
          </div>
        </div>
      );
    }
  }
}

export default compose(connect(state => ({
  wording: state.lang.wording.home,
  user: state.user.user,
  collections: state.collections.collections,
  coll: state.collections.coll
}))(Linksctrl));
