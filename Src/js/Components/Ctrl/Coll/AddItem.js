import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                desc: '',
                url: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.showEditMode = this.showEditMode.bind(this);
    }

    handleChange(event) {
        this.setState({
            form: {
                desc: event.target.name === 'desc' ? event.target.value : this.state.form.desc,
                url: event.target.name === 'url' ? event.target.value : this.state.form.url
            }
        });
        event.preventDefault();
    }

    addItem(event) {
        if (this.state.form.desc && this.state.form.url) {
            var data = {
                link: {
                    url: this.state.form.url,
                    desc: this.state.form.desc
                },
                belongsTo: this.props.dbColl,
                author: 'doftom',
                hidden: true,
                canbetouch: false,
                meta: {
                    clicked: 0,
                    beenUpdated:  false
                }
            }
            this.props.addOneItem(data);
        }
        this.state.form.desc = "";
        this.state.form.url = "";
        event.preventDefault();
        event.stopPropagation();
    }

    showEditMode() {
        var divs = document.querySelectorAll('div.ContentLeft.col-sm-6.itemAction')
        if (divs) {
            divs.forEach((div) => {
                div.style.display = 'flex'
            });
        }
    }

    render() {
        return (
            <form className="addOneItem" onSubmit={this.addItem}>
                <div className="row">
                    <div className="form-group col-xs-12 ">
                        <input value={this.state.form.desc} onChange={this.handleChange} name="desc" type="text" className="form-control" placeholder="what"/>
                        <input value={this.state.form.url} onChange={this.handleChange} name="url" type="text" className="form-control" placeholder="https://www.youtube.com/watch?v=I_GlyBbaYws"/>
                    </div>
                </div>
                <div className="ContentCenter">
                    <button type="submit" className="btn btn-success">ADD</button>
                    <button onClick={this.showEditMode} className="btn btn-success">MOD</button>
                </div>
            </form>
        );
    }

}

export default compose(connect(state => ({
  collections: state.collections.collections,
  coll: state.collections.coll
}))(AddItem));
