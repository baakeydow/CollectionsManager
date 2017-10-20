import React from "react";

import WelcomePage from "../PAGES/WelcomePage";

export default class Homectrl extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.state = {
      wording: this.props.wording
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      wording: nextProps.wording ? nextProps.wording : this.props.wording
    });
  }

  render() {
    return (
      <WelcomePage wording={this.state.wording}/>
    );
  }
}
