import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import AddOneColl from "./Coll/AddOneColl";
import ListAllColl from "./Coll/ListAllColl";
import ListItemsFromColl from "./Coll/ListItemsFromColl";
import ListItemsFromAllColl from "./Coll/ListItemsFromAllColl";

class Homectrl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            wording: this.props.wording,
            collections: this.props.collections
        };
        this.addOneColl = this.addOneColl.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.displayAllColl();
        this.setState({
            user: this.props.user,
            wording: this.props.wording,
            collections: this.props.collections
        });
    }

    addOneColl(data) {
        this.props.addOneColl(data);
    }

    handleSubmit(e) {
        const file = document.getElementById('file').files[0];
        var bodyFormData = new FormData();
        bodyFormData.set('file', file);
        axios({
            method: 'post',
            url: process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/files/upload' : '/files/upload',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            data: bodyFormData
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        e.preventDefault();
        e.stopPropagation();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            wording: nextProps.wording ? nextProps.wording : this.props.wording,
            user: nextProps.user ? nextProps.user : this.props.user,
            collections: nextProps.collections ? nextProps.collections : this.props.collections,
            coll: nextProps.coll ? nextProps.coll : this.props.coll
        });
    }

    render() {
        var { user, collections } = this.state;
        if (user.userId || process.env.NODE_ENV === 'dev') {
            return (
                <div className="container">
                    <div className="Content title">
                        <h3>
                            {this.state.wording.title}
                        </h3>
                        <div class="ContentLeft">
                            <form className="addOneForm">
                                <label tabIndex="1" role="button" className="btn btn-success" for="file">
                                Add File !
                                <input onChange={this.handleSubmit} className="hidden" type="file" id="file" name="file"/>
                                </label>
                            </form>
                        </div>
                        <div class="ContentLeft">
                            <AddOneColl addOneColl={this.addOneColl}/>
                        </div>
                        <div class="ContentCenter">
                            <ListAllColl
                                addOneColl={this.props.addOneColl}
                                addItemToColl={this.props.addItemToColl}
                                selectOneColl={this.props.selectOneColl}
                                dropOneColl={this.props.dropOneColl}
                            />
                        </div>
                        <div class="ContentLeft" style={{marginTop:'40px'}}>
                            <ListItemsFromColl delItem={this.props.delItem} updateItem={this.props.updateItem}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="Content title" style={{marginBottom:"20px"}}>
                        <ListItemsFromAllColl/>
                    </div>
                </div>
            );
        }
    }
}

export default compose(connect(state => ({
    wording: state.lang.wording.home,
    user: state.user.user,
    collections: state.collections.collections,
    coll: state.collections.coll
}))(Homectrl));
