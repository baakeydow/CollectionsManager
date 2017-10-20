import React from "react";

import About from "../PAGES/About";

export default class AboutCtrl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wording: this.props.wording
    };
  }

  componentWillMount() {
    this.setState({
      wording: this.props.wording
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      wording: nextProps.wording ? nextProps.wording : this.props.wording
    });
  }

  render() {
    return (
      <About wording={this.state.wording}/>
    );
  }
}
