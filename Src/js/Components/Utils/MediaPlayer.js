import React, { Component } from 'react';
import axios from "axios";

export default class MediaPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: '',
      src: process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/files/play' : '/files/play'
    }
    this.getRandomVid = this.getRandomVid.bind(this);
  }

  getRandomVid() {
    console.log(this.state.video);
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/files/videos' : '/files/videos';
    axios({
      method: 'get',
      url: url,
      params: { video: this.state.video }
    }).then((response) => {
      this.setState({
        video: response.data,
      });
    }).catch((err) => {
      console.log('ERROR! : ', err);
    })
  }

  componentWillMount() {
    this.getRandomVid();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.video !== nextState.video) return true;
  }

  componentDidUpdate() {
    let VP = document.getElementById('videoPlayer');
    let VPToggle = document.getElementById('MediaPlayer');
    if (!VPToggle) return;
    VPToggle.addEventListener('click', () => {
      VP.paused ? VP.play() : VP.pause();
    });
  }

  render() {
    if (!this.state.video) {
      return (
        <p>Loading ...</p>
      );
    }
    return (
      <div id="MediaPlayer" className="MediaPlayer">
        <video id="videoPlayer" controls>
          <source src={this.state.src + '/?video=' + this.state.video} type="video/mp4" />
        </video>
        <div>{this.state.video}</div>
      </div>
    );
  }
}
