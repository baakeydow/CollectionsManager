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

    componentWillMount() {
        this.getThemLinks();
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
                    <div className="ListAllColl">
                    <div className="ImageContentCenter" key={i}>
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
                {imageLinks}
            </div>
        );
    }

}

export default compose(connect(state => ({
  user: state.user.user,
}))(GetNetvibesLinks));
