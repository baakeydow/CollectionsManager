import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';

class GetInstagramPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            start: 0,
            count: 10,
            hasMore: true
        };
        this.getThemPost = this.getThemPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.getEmbed = this.getEmbed.bind(this);
    }

    getThemPost() {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/instagram' : '/netvibesdata/instagram';
        const params = {
            start: this.state.start,
            limit: this.state.count,
        };
        axios({
            method: 'get',
            url: url,
            params: params
        })
        .then((response) => {
            if (!response.data.length) {
                this.setState({
                    hasMore: false
                });
            } else {
                var items = this.state.items;
                response.data.forEach((data) => {
                     items.push(data)
                })
                this.setState({
                    items: items,
                    start: this.state.count + this.state.start
                });
            }
        })
        .catch((err) => {
            console.log('ERROR! : ', err);
            this.setState({
                items: [],
                hasMore: false
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

    getEmbed(item) {
        var url = "https://api.instagram.com/oembed?url=" + item.post.link + "?omitscript=true";
        var el = document.getElementById(item.post.id);
        return axios({
            method: 'get',
            url: url
        })
        .then((response) => {
            el.innerHTML = response.data.html;
            instgrm.Embeds.process();
        })
        .catch((err) => {
            console.log('ERROR! : ', err);
        })
    }

    componentWillMount() {
        this.getThemPost();
        const script = document.createElement("script");
        script.src = "//platform.instagram.com/en_US/embeds.js";
        script.async = true;
        document.body.appendChild(script);
    }

    render() {
        var { items } = this.state;
        var posts = [];
        if (items && items[0]) {
            console.log(items);
            items.map((item, i) => {
                var delButton = (this.props.user.userId || process.env.NODE_ENV === 'dev')  ?
                <button style={{margin:"10px"}} className="btn-danger" onClick={this.deletePost.bind(this, item._id)}>delete</button>
                :
                "";
                posts.push(
                    <div className="ListAllColl" key={i}>
                        <h4>{item.post.content}</h4>
                        <div id={item.post.id} className="ImageContentCenter">
                            <img src={item.post.image} alt="Image deleted !" onClick={this.getEmbed.bind(this, item)}/>
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
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.getThemPost.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {posts}
                </InfiniteScroll>
            </div>
        );
    }

}

export default compose(connect(state => ({
  user: state.user.user
}))(GetInstagramPost));
