import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";

class GetInstagramPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null
        };
        this.getThemPost = this.getThemPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    getThemPost() {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/instagram' : '/netvibesdata/instagram';

        axios({
            method: 'get',
            url: url
        })
        .then((response) => {
            this.setState({
                items: response.data
            });
        })
        .catch((err) => {
            console.log('ERROR! : ', err);
            this.setState({
                items: err
            });
        })
    }

    deletePost(id) {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/delinstagram' : '/netvibesdata/delinstagram';

        axios({
            method: 'post',
            url: url,
            data: {
                id: id,
                userId: this.props.user.userId
            }
        })
        .then((response) => {
            this.setState({
                items: response.data
            });
        })
        .catch((err) => {
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
        if (items && items[0]) {
            items.map((item, i) => {
                var delButton = (this.props.user.userId || process.env.NODE_ENV === 'dev')  ?
                <button style={{margin:"10px"}} className="btn-danger" onClick={this.deletePost.bind(this, item._id)}>delete</button>
                :
                "";
                posts.push(
                    <div className="ListAllColl" key={i}>
                        <h4>{item.post.content}</h4>
                        <div className="ImageContentCenter">
                            <img src={item.post.image} alt="image deleted !" />
                        </div>
                        <div className="ContentRight">
                            {delButton}
                            <a href={item.post.link} target="_blank">VIEW MORE !</a>
                        </div>
                        <hr style={{borderWidth:'4px', borderColor:"#353536"}}/>
                    </div>
                );
            })
        }
        if (!posts.length) {
            posts = <p>No Instagram Post !</p>
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
}))(GetInstagramPost));
