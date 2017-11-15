import React from "react";
import GetNetvibesArticles from "../Actions/GetNetvibesArticles";

export default class ArticlesCtrl extends React.Component {

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
        <div className="container">
            <div className="Content title">
                <h3>{this.props.wording.title}</h3>
                <GetNetvibesArticles/>
            </div>
        </div>
    );
  }
}
