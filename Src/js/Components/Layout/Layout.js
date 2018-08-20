import React from "react";
import Nav from "./Nav";
import './App.css';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({ lang: this.props.lang, onchange: this.props.onChange, wording: this.props.wording });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ wording: this.props.wording });
  }

  render() {
    const { location } = this.props;
    let NavProps = {
      lang: this.props.lang,
      wording: this.props.wording,
      user: this.props.user
    }
    const containerStyle = {
      marginTop: "40px"
    };
    return (
      <div style={containerStyle}>
        <Nav location={location} changeLang={this.state.onchange} navProps={NavProps} />
      </div>
    );
  }
}
