import React, { Component } from 'react';
import { connect } from "react-redux"
import { compose } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  HashRouter
} from 'react-router-dom';

import {
  fetchAllCollections,
  fetchOneCollection,
  dropOneCollection,
  addCollection,
  addItem,
  delItem,
  updateItem
} from "./Components/Actions/collectionsActions";
import { getCred, findUser, createCred } from "./Components/Actions/userActions";
import { getLg } from "./Components/Actions/wordingActions";

import Layout from "./Components/Layout/Layout";

import Login from "./Components/Ctrl/Login";
import Register from "./Components/Ctrl/Register";
import LinksCtrl from "./Components/Ctrl/Links";
import ArticlesCtrl from "./Components/Ctrl/Articles";
import MediaCtrl from "./Components/Ctrl/Media";
import ContactCtrl from "./Components/Ctrl/Contact";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wording: {},
      lang: 'EN'
    };
    this.displayAllColl = this.displayAllColl.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.addOneColl = this.addOneColl.bind(this);
    this.selectOneColl = this.selectOneColl.bind(this);
    this.dropOneColl = this.dropOneColl.bind(this);
    this.addItem = this.addItem.bind(this);
    this.delItem = this.delItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.props.dispatch(findUser());
    this.props.dispatch(getLg(this.state.lang));
  }

  componentWillMount() {
    this.setState({
      wording: this.props.lang.wording,
      lang: this.props.lang.lang,
    });
  }

  addOneColl(data) {
    this.props.dispatch(addCollection(data));
  }

  selectOneColl(data) {
    this.props.dispatch(fetchOneCollection(data));
  }

  displayAllColl() {
    this.props.dispatch(fetchAllCollections());
  }

  dropOneColl(data) {
    this.props.dispatch(dropOneCollection(data));
    window.location.reload();
  }

  addItem(data) {
    this.props.dispatch(addItem(data));
  }

  delItem(data) {
    this.props.dispatch(delItem(data));
  }

  updateItem(data) {
    this.props.dispatch(updateItem(data));
  }

  changeLang() {
    const lang = this.props.lang.lang === "EN" ? "FR" : "EN";
    this.props.dispatch(getLg(lang));
    this.setState({
      wording: this.props.lang.wording,
      lang: this.props.lang.lang
    });
  }

  render() {
    return (
      <Router history={HashRouter}>
        <div id="app">
          <Route path='/' render={routeProps => <Layout {...routeProps} user={this.props.user} lang={this.state.lang} wording={this.state.wording} onChange={this.changeLang} />} />
          <Route exact path="/" render={routeProps =>
            <LinksCtrl {...routeProps}
              displayAllColl={this.displayAllColl}
              selectOneColl={this.selectOneColl}
              addOneColl={this.addOneColl}
              dropOneColl={this.dropOneColl}
              addItemToColl={this.addItem}
              delItem={this.delItem}
              updateItem={this.updateItem} />}
          />
          <Route path='/login' render={routeProps => <Login {...routeProps} wording={this.state.wording.welcome} getCred={getCred} />} />
          <Route path='/register' render={routeProps => <Register {...routeProps} wording={this.state.wording.welcome} createCred={createCred} />} />
          <Route path='/articles' render={routeProps => <ArticlesCtrl {...routeProps} wording={this.state.wording.articles} />} />
          <Route path='/media' render={routeProps => <MediaCtrl {...routeProps} wording={this.state.wording.media} />} />
          <Route path='/contact' render={routeProps => <ContactCtrl {...routeProps} wording={this.state.wording.contact} />} />
          <div className="Customfooter">
          </div>
        </div>
      </Router>
    );
  }
}

export default compose(connect(state => ({
  wording: state.lang.wording,
  lang: state.lang,
  user: state.user.user,
  collections: state.collections.collections,
  coll: state.collections.coll
}))(App));
