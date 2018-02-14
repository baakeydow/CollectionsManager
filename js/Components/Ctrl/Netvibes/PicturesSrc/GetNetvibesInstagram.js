import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import {
    asyncForEach,
    checkAvailability
} from "../../../Utils/Custom";
import InstaPost from './InstaPost';

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
                asyncForEach(response.data, async (data) => {
                    if (checkAvailability(data.post.link)) {
                        items.push(data);
                    } else if (this.props.user.userId) {
                        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/delinstagram' : '/netvibesdata/delinstagram';
                        axios({
                            method: 'post',
                            url: url,
                            data: {
                                id: data._id,
                                userId: this.props.user.userId
                            }
                        });
                        console.log('item deleted ...');
                    }
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

    componentWillMount() {
        const script = document.createElement("script");
        script.src = "//platform.instagram.com/en_US/embeds.js";
        script.async = true;
        document.body.appendChild(script);
    }

    render() {
        var { items } = this.state;
        var posts = [];
        if (items && items[0]) {
            items.map((item, i) => {
                posts.push(
                    <InstaPost
                        item={item}
                        i={i}
                    />
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
