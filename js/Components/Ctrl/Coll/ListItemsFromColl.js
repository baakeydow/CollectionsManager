import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux"
import Item from "./Item";

class AllColl extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var { coll } = this.props;
        var mappedColl = [];
        if (coll) {
            coll.forEach((item) => {
                mappedColl.push(
                    <Item   key={item._id}
                            item={item}
                            delItem={this.props.delItem}
                            updateItem={this.props.updateItem}
                    />
                );
            })
        }
        if (!mappedColl.length) {
            mappedColl = <p style={{marginLeft:'9px'}}>No Data !</p>
        }
        return (
            <div className="mappedColl">
                {mappedColl}
            </div>
        );
    }

}

export default compose(connect(state => ({
  coll: state.collections.coll
}))(AllColl));
