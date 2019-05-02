import React, { Component }  from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Staff extends Component {


	state = {
		currentUserName: '',
		currentUserEmail: '',
		currentUserRole: '',
		startDate: new Date()

	}

	componentDidMount() {

		const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));

		this.setState({
			currentUserEmail: idToken.idToken.claims.email,
			currentUserName: idToken.idToken.claims.name,
			currentUserRole: idToken.idToken.claims.group
		});



	}
	handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

	render() {
		console.log(this.state);

		const { currentUserEmail, currentUserName} = this.state;
		return (

			<div>

				<h1> Welcome { currentUserName } </h1>
				<p>Email: { currentUserEmail } </p>
				<p> You have reached the staff area of the portal </p>
				<p> Choose a day you would like to request off. </p>
				<DatePicker 


					selected={this.state.startDate}
        onChange={this.handleChange}/>
			</div>
		)
	}

}
export default Staff;