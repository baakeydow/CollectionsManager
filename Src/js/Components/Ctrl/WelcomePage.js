import React from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wording: this.props.wording,
      form: {
        username: '',
        passwd: '',
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      form: {
        username: event.target.name === 'username' ? event.target.value : this.state.form.username,
        passwd: event.target.name === 'passwd' ? event.target.value : this.state.form.passwd,
      }
    });
    event.preventDefault();
  }

  handleSubmit(e) {
      if (this.state.form.username && this.state.form.passwd) {
          this.props.dispatch(this.props.getCred(this.state.form));
      }
      e.preventDefault();
  }

  componentWillMount() {
    this.setState({
      wording: this.props.wording,
      form: {
        username: this.state.form.username,
        passwd: this.state.form.passwd
      }
    });
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
          wording: nextProps.wording ? nextProps.wording : this.props.wording,
          user: nextProps.user ? nextProps.user : this.props.user
      });
  }

  render() {
    if (this.state.user && this.state.user.userId) {
        return (
            <Redirect to={{
                pathname: '/home',
            }}/>
        )
    }
    return (
        <div className="container">
                <div className="Content title">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <label>username</label>
                                <input value={this.state.form.username} onChange={this.handleChange} name="username" type="text" className="form-control" placeholder="user"/>
                            </div>
                            <div className="form-group col-sm-6">
                                <label>passwd</label>
                                <input value={this.state.form.passwd} onChange={this.handleChange} name="passwd" type="password" className="form-control" placeholder="****************"/>
                            </div>
                        </div>
                        <div className="ContentCenter" style={{marginBottom:'20px'}}>
                            <button type="submit" className="btn btn-primary">
                                {this.state.wording.cta}
                            </button>
                        </div>
                    </form>
                </div>
        </div>
    );
  }
}

export default compose(connect(state => ({
  wording: state.lang.wording.welcome,
  user: state.user.user
}))(WelcomePage));
