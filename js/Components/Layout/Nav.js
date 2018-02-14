import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      wording: props.navProps.wording,
      lang: props.navProps.lang
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    if (this.props.navProps.user &&
        this.props.navProps.user.userId) {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/out' : '/out';
        axios({
            method: 'post',
            url: url
        })
        .then((response) => {
            console.log("user logged out");
            window.location.reload();
        })
        .catch((err) => {
            console.log('ERROR! : ', err);
        })
    }
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState(
      {
        collapsed,
        wording: this.props.navProps.wording,
        lang: this.props.navProps.lang
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      wording: nextProps.navProps.wording ? nextProps.navProps.wording : this.props.navProps.wording,
      lang: nextProps.navProps.lang ? nextProps.navProps.lang : this.props.navProps.lang
    });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const homeClass = location.pathname === "/home" ? "active" : "";
    const articleClass = location.pathname.match(/^\/articles/) ? "active" : "";
    const contactClass = location.pathname.match(/^\/contact/) ? "active" : "";
    const imagesClass = location.pathname.match(/^\/images/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";
    const navStyle = {
        backgroundColor: "#353536"
    };
    const spanStyle = {
        display: "block",
        height: "6px"
    };
    const buttonStyle = {
        margin: "0 50px 0 20px",
        color: "white"
    };
    let wording = this.state.wording;
    let lang = this.props.navProps.lang === 'EN' ? "FR" : "EN";
    let btnState = this.props.navProps.user.userId ? "Log out" : "Log in";

    return (
      <nav style={navStyle} className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <ul className="nav navbar-nav">
              <span style={spanStyle}></span>
              <button style={buttonStyle} className="btn btn-success" onClick={this.props.changeLang.bind(this)}>{lang}</button>
            </ul>
          </div>
          <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={homeClass}>
                <NavLink to="/home" onClick={this.toggleCollapse.bind(this)}>{wording.home.title}</NavLink>
              </li>
              <li className={articleClass}>
                <NavLink to="/articles" onClick={this.toggleCollapse.bind(this)}>{wording.articles.title}</NavLink>
              </li>
              <li className={imagesClass}>
                <NavLink to="/images" onClick={this.toggleCollapse.bind(this)}>{wording.images.title}</NavLink>
              </li>
              <li className={contactClass}>
                <NavLink to="/contact" onClick={this.toggleCollapse.bind(this)}>{wording.contact.title}</NavLink>
              </li>
              <li style={{width:'200px', height:"50px"}}>
                <NavLink style={{float:'right'}} to="/"><button onClick={this.logOut}>{btnState}</button></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
