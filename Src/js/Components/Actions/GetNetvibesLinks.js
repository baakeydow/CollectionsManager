import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";

class GetNetvibesLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null
        };
        this.getThemLinks = this.getThemLinks.bind(this);
    }

    getThemLinks() {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/netvibesdata/img' : '/netvibesdata/img';

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
        this.getThemLinks();
    }

    render() {
        var { items } = this.state;
        console.log(this);
        var imageLinks = [];
        if (items) {
            items.map((item, i) => {
                imageLinks.push(
                    <div className="ImageContentCenter" key={i}>
                        <img src={item.link} alt="image deleted !" />
                    </div>
                );
            })
        }
        if (!imageLinks.length) {
            imageLinks = <p>No Images !</p>
        }
        return (
            <div className="mappedLinksColl">
                {imageLinks}
            </div>
        );
    }

}

export default compose(connect(state => ({
  user: state.user.user,
  collections: state.collections.collections,
  coll: state.collections.coll
}))(GetNetvibesLinks));
