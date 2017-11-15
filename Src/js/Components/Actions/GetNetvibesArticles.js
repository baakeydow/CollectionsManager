import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';

class GetNetvibesLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null
        };
        this.getThemArticles = this.getThemArticles.bind(this);
    }

    getThemArticles() {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/articles' : '/netvibesdata/articles';

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

    componentWillMount() {
        this.getThemArticles();
    }

    render() {
        var { items } = this.state;
        var articles = [];
        if (items) {
            items.map((item, i) => {
                articles.push(
                    <div className="ListAllColl" key={i}>
                        <h4>{item.title}</h4>
                        <div className="ContentLeft">
                            <p>{ReactHtmlParser(item.content)}</p>
                        </div>
                        <div className="ContentRight">
                            <a href={item.link} target="_blank">KNOW MORE !</a>
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
            <div className="mappedLinksColl">
                {articles}
            </div>
        );
    }

}

export default compose(connect(state => ({
  user: state.user.user,
  collections: state.collections.collections,
  coll: state.collections.coll
}))(GetNetvibesLinks));
