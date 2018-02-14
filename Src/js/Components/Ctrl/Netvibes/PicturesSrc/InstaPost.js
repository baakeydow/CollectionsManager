import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import axios from "axios";
import { truncateText } from "../../../Utils/Custom";

class InstaPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postName: 'upload-0'
        };
        this.downLoadPost = this.downLoadPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.getEmbed = this.getEmbed.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            postName: event.target.name === 'name' ? event.target.value : this.state.postName
        });
        event.preventDefault();
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
            el.style.border = '7px ridge blueviolet';
            el.style.borderRadius = '10px';
            instgrm.Embeds.process();
        })
        .catch((err) => {
            console.log('ERROR! : ', err);
        })
    }

    downLoadPost(item) {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/files/download' : '/files/download';

        axios({
            method: 'post',
            url: url,
            data: {
                item: item,
                name: this.state.postName,
                userId: this.props.user.userId
            }
        })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log('ERROR! Download failed: ', err);
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
        })
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: this.props.item.post.image
        }).then((response) => {
            if (response.status !== 200) {
                this.getEmbed(this.props.item);
            }
        }).catch((err) => {
            this.getEmbed(this.props.item);
        });
    }

    render() {
        var { item, i } = this.props;
        if (item) {
            var delButton = (this.props.user.userId || process.env.NODE_ENV === 'dev')  ?
            <button style={{margin:"10px"}} className="btn-danger" onClick={this.deletePost.bind(this, item._id)}>delete</button>
            :
            "";
            var upButton = (this.props.user.userId || process.env.NODE_ENV === 'dev')  ?
            <button style={{margin:"10px"}} className="btn-warning" onClick={this.downLoadPost.bind(this, item)}>download</button>
            :
            "";
            var inputPostName = (this.props.user.userId || process.env.NODE_ENV === 'dev')  ?
            <div className="inputBtnFlexContainer"><input value={this.state.postName} onChange={this.handleChange} name="name" type="text" className="form-control" placeholder=""/>
            </div>
            :
            "";
            return (
                <div className="ListAllColl" key={i}>
                    <h4>{truncateText(item.post.content)}</h4>
                    <div id={item.post.id} className="ImageContentCenter">
                        <img src={item.post.image} alt="you shouldn't be seing this..." onClick={this.getEmbed.bind(this, item)}/>
                    </div>
                    <div className="ContentRight">
                        {delButton}
                        {inputPostName}
                        {upButton}
                        <a href={item.post.link} target="_blank">VIEW MORE !</a>
                    </div>
                    <hr style={{borderWidth:'4px', borderColor:"#353536"}}/>
                </div>
            );
        }
        return (
            <p>Loading...</p>
        );
    }

}

export default compose(connect(state => ({
  user: state.user.user
}))(InstaPosts));