import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import AddOneColl from "./Coll/AddOneColl";
import ListAllColl from "./Coll/ListAllColl";
import ListItemsFromColl from "./Coll/ListItemsFromColl";

class Homectrl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wording: this.props.wording,
            collections: this.props.collections
        };
        this.addOneColl = this.addOneColl.bind(this);
    }

    componentWillMount() {
        this.setState({
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
        var { user, collections } = this.props;

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
                </div>
            </div>
        );
    }
}

export default compose(connect(state => ({
  wording: state.lang.wording.home,
  user: state.user.user,
  collections: state.collections.collections,
  coll: state.collections.coll
}))(Homectrl));
