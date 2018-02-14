import React from "react";
import ImagesNetvibesLinks from "./Netvibes/PicturesSrc/GetNetvibesLinks";
import ImagesNetvibesInstagram from "./Netvibes/PicturesSrc/GetNetvibesInstagram";
import ImagesNetvibesDropbox from "./Netvibes/PicturesSrc/GetNetvibesDropbox";

export default class ImagesCtrl extends React.Component {

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
                <ImagesNetvibesLinks/>
                <h3>Instagram</h3>
                <ImagesNetvibesInstagram/>
                <h3>DropBox</h3>
                <ImagesNetvibesDropbox/>
            </div>
        </div>
    );
  }
}
