import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux"

class AddColl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.addColl = this.addColl.bind(this);
  }

  handleChange(event) {
    this.setState({
      form: {
        name: event.target.name === 'name' ? event.target.value : this.state.form.name
      }
    });
    event.preventDefault();
  }

  checkInput(input) {
    var letters = /^[A-Za-z]+$/;
    if (input.length < 11 && input.match(letters))
      return true;
    return false;
  }

  addColl(event) {
    if (this.checkInput(this.state.form.name)) {
      this.props.addOneColl(this.state.form.name.toUpperCase());
    }
    this.state.form.name = "";
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    return (
      <form className="addOneForm" onSubmit={this.addColl}>
        <div className="inputBtn">
          <input value={this.state.form.name} onChange={this.handleChange} name="name" type="text" className="form-control" placeholder="TechLinks" />
          <button type="submit" className="btn btn-success">ADD</button>
        </div>
      </form>
    );
  }

}

export default compose(connect(state => ({
  collections: state.collections.collections,
  coll: state.collections.coll
}))(AddColl));
