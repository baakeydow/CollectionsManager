import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                desc: "",
                url:  ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }
    updateItem(item) {
        if (this.state.item.desc || this.state.item.url) {
            var data = {
                itemToUpdate: {
                    link: {
                        url: this.state.item.url ? this.state.item.url : item.link.url,
                        desc: this.state.item.desc ? this.state.item.desc : item.link.desc
                    },
                    belongsTo: item.belongsTo,
                    author: item.author,
                    hidden: item.hidden,
                    canbetouch: item.canbetouch,
                    meta: {
                        clicked: item.meta.clicked,
                        beenUpdated:  true
                    }
                },
                id: item._id
            }
            this.props.updateItem(data);
        }
        var divs = document.querySelectorAll('div.ContentLeft.col-sm-6.itemAction')
        if (divs) {
            divs.forEach((div) => {
                div.style.display = 'none'
            });
        }
    }
    handleChange(event) {
        this.setState({
            item: {
                desc: event.target.name === "desc" ? event.target.value : this.state.item.desc,
                url: event.target.name === "url" ? event.target.value : this.state.item.url
            }
        });
        this.state.item.desc = "";
        this.state.item.url = "";
        event.preventDefault();
    }
    render() {
        var { item } = this.props;
        var desc = this.state.item.desc ? this.state.item.desc : item.link.desc;
        var url = this.state.item.url ? this.state.item.url : item.link.url;
        return (
            <div className="ContentLeft item list" key={item._id}>
                <div className="ContentLeft col-sm-6 itemAction">
                    <button onClick={ this.props.delItem.bind(this, item) } className="ContentCenter btnMode">X</button>
                    <input value={desc} onChange={ this.handleChange.bind(this) } name="desc" type="text" className="form-control" placeholder="newValue"/>
                    <input value={url} onChange={ this.handleChange.bind(this) } name="url" type="text" className="form-control" placeholder="newValue"/>
                    <button onClick={ this.updateItem.bind(this, item) } className="ContentCenter btnMode">U</button>
                </div>
                <div className="ContentRight col-sm-6 itemList">
                    <li>&nbsp;&nbsp;<a href={item.link.url} target="_blank">{item.link.desc}</a></li>
                </div>
            </div>
        );
    }

}

export default compose(connect(state => ({
  coll: state.collections.coll
}))(Item));
