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

import { fetchUser } from "./Components/Actions/userActions";
import { getLg } from "./Components/XINIT/wordingActions";

import Layout from "./Components/Layout/Layout";

import WelcomePage from "./Components/Ctrl/WelcomePage";
import HomeCtrl from "./Components/Ctrl/Home";
import AboutCtrl from "./Components/Ctrl/About";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wording: {},
            lang: 'EN'
        };
        this.changeLang = this.changeLang.bind(this);
        this.addOneColl = this.addOneColl.bind(this);
        this.selectOneColl = this.selectOneColl.bind(this);
        this.dropOneColl = this.dropOneColl.bind(this);
        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.props.dispatch(fetchUser());
        this.props.dispatch(fetchAllCollections());
        this.props.dispatch(getLg(this.state.lang));
        console.log('Constructed !!!!');
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

    dropOneColl(data) {
        this.props.dispatch(dropOneCollection(data));
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
                    <Route path='/' render={routeProps => <Layout {...routeProps} lang={this.state.lang} wording={this.state.wording} onChange={this.changeLang}/>} />
                    <Route exact path="/" render={routeProps => <WelcomePage {...routeProps}  wording={this.state.wording.welcome}/>} />
                    <div className="bckg">
                        <Route path='/home' render={routeProps =>
                        <HomeCtrl {...routeProps}
                            selectOneColl={this.selectOneColl}
                            addOneColl={this.addOneColl}
                            dropOneColl={this.dropOneColl}
                            addItemToColl={this.addItem}
                            delItem={this.delItem}
                            updateItem={this.updateItem}
                            collections={this.props.collections}/>}
                        />
                        <Route path='/about' render={routeProps => <AboutCtrl {...routeProps} wording={this.state.wording.about}/>} />
                    </div>
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
  userFetched: state.user.fetched,
  collections: state.collections.collections,
  coll: state.collections.coll
}))(App));
