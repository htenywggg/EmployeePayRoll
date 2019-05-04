import React, { Component } from 'react'

class WebPortal extends Component {
  state = {
      currentUserName: '',
      currentUserEmail: ''
  }

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
        currentUserEmail: idToken.idToken.claims.email,
        currentUserName: idToken.idToken.claims.name
    })
  }
  render() {
    const { currentUserEmail, currentUserName } = this.state;
    return (
      <div>
        <h1>Name: {currentUserName}</h1>
        <p>Email: {currentUserEmail}</p>
        <p>You made it to the payroll web portal</p>
      </div>
    )
  }
}

export default WebPortal;
