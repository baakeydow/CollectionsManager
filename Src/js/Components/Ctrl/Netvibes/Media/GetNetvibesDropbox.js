import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";

class GetDropboxImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    };
    this.getThemPost = this.getThemPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  getThemPost() {
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/dropbox' : '/netvibesdata/dropbox';

    axios({
      method: 'get',
      url: url
    }).then((response) => {
      this.setState({
        items: response.data
      });
    }).catch((err) => {
      console.log('ERROR! : ', err);
      this.setState({
        items: err
      });
    })
  }

  deletePost(id) {
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/deldropboximage' : '/netvibesdata/deldropboximage';

    axios({
      method: 'post',
      url: url,
      data: {
        id: id,
        userId: this.props.user.userId
      }
    }).then((response) => {
      this.setState({
        items: response.data
      });
    }).catch((err) => {
      console.log('ERROR! : ', err);
      this.setState({
        items: err
      });
    })
  }

  componentWillMount() {
    this.getThemPost();
  }

  render() {
    var { items } = this.state;
    var posts = [];
    if (items && items[0] && items[0].share) {
      items.map((item, i) => {
        var delButton = (this.props.user.userId || process.env.NODE_ENV === 'dev') ?
          <button style={{ margin: "10px" }} className="btn-danger" onClick={this.deletePost.bind(this, item._id)}>delete</button>
          :
          "";
        posts.push(
          <div className="ListAllColl" key={i}>
            <div className="ImageContentCenter">
              <img src={item.share.replace("www.dropbox.com", "dl.dropboxusercontent.com")} alt="image deleted !" />
            </div>
            <div className="ContentRight">
              {delButton}
            </div>
            <hr style={{ borderWidth: '4px', borderColor: "#353536" }} />
          </div>
        );
      })
    }
    if (!posts.length) {
      posts = <p>No DropBox Images !</p>
    }
    return (
      <div className="mappedLinksCollWithImages">
        {posts}
      </div>
    );
  }

}

export default compose(connect(state => ({
  user: state.user.user
}))(GetDropboxImages));
