import React from "react";
import axios from "axios";
import sanitizeHtml from 'sanitize-html';

export default class ContactCtrl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wording: this.props.wording,
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      form: {
        name: event.target.name === 'name' ? event.target.value : this.state.form.name,
        email: event.target.name === 'email' ? event.target.value : this.state.form.email,
        message: event.target.name === 'message' ? event.target.value : this.state.form.message
      }
    });
    event.preventDefault();
  }

  handleSubmit() {
      if (this.state.form.name &&
          this.state.form.email &&
          this.state.form.message) {
          axios({
            method: 'post',
            url: process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/contact' : '/contact',
            data: {
              name: sanitizeHtml(this.state.form.name),
              email: sanitizeHtml(this.state.form.email),
              message: sanitizeHtml(this.state.form.message)
            }
          }).then(function (response) {
            console.log(response);
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
  }

  componentWillMount() {
    this.setState({
      wording: this.props.wording,
      form: {
        name: this.state.form.name,
        email: this.state.form.email,
        message: this.state.form.message
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      wording: nextProps.wording ? nextProps.wording : this.props.wording
    });
  }

  render() {
    return (
      <div className="container">
          <div className="Content title">
              <h3>{this.state.wording.title}</h3>
              <div style={{marginTop:'40px'}} className="row">
                  <div className="col-md-4">
                    <p>Do you have any suggestions ? please share ! I'll answer you ;)</p>
                  </div>
                  <div className="col-xs-12 col-md-8 formContact">
                      <form onSubmit={this.handleSubmit}>
                          <div className="row">
                              <div className="form-group col-xs-12 col-sm-6">
                                  <label>{this.state.wording.form.name}</label>
                                  <input value={this.state.form.name} onChange={this.handleChange} name="name" type="text" className="form-control" placeholder="Dr. Huey P Newton"/>
                              </div>
                              <div className="form-group col-xs-12 col-sm-6">
                                  <label>{this.state.wording.form.email}</label>
                                  <input value={this.state.form.email} onChange={this.handleChange} name="email" type="email" className="form-control" placeholder="hueypnewton@panther.com"/>
                              </div>
                              <div className="form-group col-xs-12">
                                  <label>{this.state.wording.form.message}</label>
                                  <textarea value={this.state.form.message} onChange={this.handleChange} name="message" style={{height: '100px'}} type="text" className="form-control" placeholder="Message"/>
                              </div>
                          </div>
                          <div className="ContentRight">
                            <button type="submit" className="btn btn-primary">{this.state.wording.button}</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
