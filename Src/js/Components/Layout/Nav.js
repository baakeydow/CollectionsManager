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
    const homeClass = location.pathname === "/" ? "active" : "";
    const articleClass = location.pathname.match(/^\/articles/) ? "active" : "";
    const contactClass = location.pathname.match(/^\/contact/) ? "active" : "";
    const imagesClass = location.pathname.match(/^\/media/) ? "active" : "";
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
                <NavLink to="/" onClick={this.toggleCollapse.bind(this)}>{wording.home.title}</NavLink>
              </li>
              <li className={imagesClass}>
                <NavLink to="/media" onClick={this.toggleCollapse.bind(this)}>{wording.media.title}</NavLink>
              </li>
              <li className={articleClass}>
                <NavLink to="/articles" onClick={this.toggleCollapse.bind(this)}>{wording.articles.title}</NavLink>
              </li>
              <li className={contactClass}>
                <NavLink to="/contact" onClick={this.toggleCollapse.bind(this)}>{wording.contact.title}</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
