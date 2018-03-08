import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';

class GetNetvibesLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            start: 0,
            count: 10,
            hasMore: true
        };
        this.getThemLinks = this.getThemLinks.bind(this);
    }

    getThemLinks() {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/img' : '/netvibesdata/img';
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

    delLink(id) {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/delimg' : '/netvibesdata/delimg';

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

    render() {
        var { items } = this.state;
        var imageLinks = [];
        if (items && items[0]) {
            items.map((item, i) => {
                var delButton = (this.props.user.userId || process.env.NODE_ENV === 'dev') ?
                <button style={{margin:"10px"}} className="btn-danger" onClick={this.delLink.bind(this, item._id)}>delete</button>
                :
                "";
                imageLinks.push(
                    <div className="ListAllColl" key={i}>
                    <div className="ImageContentCenter">
                        <img src={item.link} alt="image deleted !" />
                    </div>
                    <div className="ContentRight">
                    {delButton}
                    </div>
                    </div>
                );
            })
        }
        if (!imageLinks.length) {
            imageLinks = <p>No Images !</p>
        }
        return (
            <div className="mappedLinksCollWithImages">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.getThemLinks.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {imageLinks}
                </InfiniteScroll>
            </div>
        );
    }

}

export default compose(connect(state => ({
  user: state.user.user,
}))(GetNetvibesLinks));
