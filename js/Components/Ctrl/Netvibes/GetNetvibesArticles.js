import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
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
        this.getThemArticles = this.getThemArticles.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
    }

    getThemArticles() {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/articles' : '/netvibesdata/articles';
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

    deleteArticle(id) {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/deleteArticle' : '/netvibesdata/deleteArticle';

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
        var articles = [];
        if (items && items[0]) {
            items.map((item, i) => {
                var delButton = (this.props.user.userId || process.env.NODE_ENV === 'dev') ?
                <button style={{margin:"10px"}} className="btn-danger" onClick={this.deleteArticle.bind(this, item._id)}>delete</button>
                :
                "";
                articles.push(
                    <div className="ListAllArticles" key={i}>
                        <h4>{item.title}</h4>
                        <div className="ImageContentCenter">
                            <div>{ReactHtmlParser(item.content)}</div>
                        </div>
                        <div className="ContentRight">
                            {delButton}
                            <a href={item.link} target="_blank">READ MORE !</a>
                        </div>
                        <hr style={{borderWidth:'4px', borderColor:"#353536"}}/>
                    </div>
                );
            })
        }
        if (!articles.length) {
            articles = <p>No Articles !</p>
        }
        return (
            <div className="mappedLinksCollWithImages">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.getThemArticles.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {articles}
                </InfiniteScroll>
            </div>
        );
    }

}

export default compose(connect(state => ({
  user: state.user.user
}))(GetNetvibesLinks));
