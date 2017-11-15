import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import AddOneColl from "./Coll/AddOneColl";
import ListAllColl from "./Coll/ListAllColl";
import ListItemsFromColl from "./Coll/ListItemsFromColl";
import GetNetvibesLinks from "../Actions/GetNetvibesLinks";

class Homectrl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            wording: this.props.wording,
            collections: this.props.collections
        };
        this.addOneColl = this.addOneColl.bind(this);
    }

    componentWillMount() {
        this.setState({
            user: this.props.user,
            wording: this.props.wording,
            collections: this.props.collections
        });
    }

    addOneColl(data) {
        this.props.addOneColl(data);
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
        if (user.userId) {
            return (
                <div className="container">
                    <div className="Content title">
                        <h3>
                            {this.state.wording.title}
                        </h3>
                        <AddOneColl addOneColl={this.addOneColl}/>
                        <div class="row">
                            <div class="ContentLeft col-sm-4">
                                <ListAllColl
                                    addOneColl={this.props.addOneColl}
                                    addItemToColl={this.props.addItemToColl}
                                    selectOneColl={this.props.selectOneColl}
                                    dropOneColl={this.props.dropOneColl}
                                />
                            </div>
                            <div class="ContentLeft col-xs-12 col-sm-6">
                                <ListItemsFromColl delItem={this.props.delItem} updateItem={this.props.updateItem}/>
                            </div>
                        </div>
                        <GetNetvibesLinks/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="Content title" style={{marginBottom:"1000px"}}>
                        <h3>
                            {this.state.wording.title}
                        </h3>
                        <h2> Not authorized go back !</h2>
                        <GetNetvibesLinks/>
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
