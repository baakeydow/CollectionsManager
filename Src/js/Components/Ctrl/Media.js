import React from "react";
import MediaPlayer from "../Utils/MediaPlayer";
import ImagesNetvibesLinks from "./Netvibes/Media/GetNetvibesLinks";
import NetvibesInstagram from "./Netvibes/Media/GetNetvibesInstagram";
import ImagesNetvibesDropbox from "./Netvibes/Media/GetNetvibesDropbox";

export default class MediaCtrl extends React.Component {

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
                <h2>{this.props.wording.title}</h2>
                <MediaPlayer/>
                <h3>Images from Articles</h3>
                <ImagesNetvibesLinks/>
                <h3>Instagram</h3>
                <NetvibesInstagram/>
                <h3>Images from Dropbox</h3>
                <ImagesNetvibesDropbox/>
            </div>
        </div>
    );
  }
}
