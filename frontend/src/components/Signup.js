import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl } from 'react-bootstrap'
import { signup } from '../actions/account'
import { Link, Redirect } from 'react-router-dom'
import requestStates from '../reducers/request'
//--------------------

//Component
const Signup = ({ accountMessage, accountStatus, sendSignup }) => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [buttonClicked, setButtonClicked] = useState(false)
	const [signupSuccess, setSignupSuccess] = useState(false)

	const updateEmail = (event) => {
		setEmail(event.target.value)
	}

	const updateUsername = (event) => {
		setUsername(event.target.value)
	}

	const updatePassword = (event) => {
		setPassword(event.target.value)
	}
	const updateConfirmPassword = (event) => {
		setConfirmPassword(event.target.value)
	}

	const signupRequest = async (e) => {
		e.preventDefault()
		setButtonClicked(true)
		const signupResponse = await sendSignup({
			username,
			email,
			password,
			confirmPassword,
		})
		if (signupResponse.message === 'session created') {
			setSignupSuccess(true)
		}
	}

	const Error = () => {
		if (buttonClicked && accountStatus === requestStates.error) {
			return <div>{accountMessage}</div>
		}
	}

	return signupSuccess ? (
		<Redirect to='login' />
	) : (
		<div id='signup__Box'>
			{Error()}
			<br />
			<div id='signup__Form'>
				<div>
					<h6>sign up</h6>
					<br />
					<form autoComplete='off'>
						<FormGroup>
							<FormControl
								autoComplete='off'
								type='email'
								placeholder='email'
								value={email}
								onChange={updateEmail}
							/>
						</FormGroup>
						<br />
						<FormGroup>
							<FormControl
								autoComplete='off'
								type='text'
								placeholder='username'
								value={username}
								onChange={updateUsername}
							/>
						</FormGroup>
						<br />
						<FormGroup>
							<FormControl
								autoComplete='off'
								type='password'
								value={password}
								onChange={updatePassword}
								placeholder='password (case sensitive)'
							/>
						</FormGroup>
						<br />
						<FormGroup>
							<FormControl
								autoComplete='off'
								type='password'
								value={confirmPassword}
								onChange={updateConfirmPassword}
								placeholder='confirm password'
							/>
						</FormGroup>
						<br />
						<div>
							<Button
								className='btn btn-secondary'
								style={{ backgroundColor: 'rgba(52, 1, 86, 0.4)' }}
								onClick={signupRequest}
							>
								Sign Up
							</Button>
						</div>
					</form>
					<br />
				</div>

				<br />
				<Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
					<span>Already have an account?</span>
				</Link>
				<br />
				<br />
				<Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
					Home
				</Link>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	accountMessage: state.account.message,
	accountStatus: state.account.status,
})

const mapDispatchToProps = {
	sendSignup: signup,
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
