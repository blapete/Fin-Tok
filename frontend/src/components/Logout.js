import React from 'react'
import { Button } from 'react-bootstrap'
import { logoutAction } from '../actions/account'
import { connect } from 'react-redux'
//--------------------

//Component
const Logout = ({ logoutGet }) => {
	const sendLogout = () => {
		logoutGet().then((res) => {
			if (res.message === "logout failed") window.location.href = "/";
		})
	}

	return (
		<div>
			<Button
				onClick={sendLogout}
				style={{
					backgroundColor: 'rgba(52, 1, 86, 0.5)',
					border: '1px solid white',
				}}
			>
				Log out
			</Button>
		</div>
	)
}

const mapDispatchToProps = {
	logoutGet: logoutAction,
}

export default connect(null, mapDispatchToProps)(Logout)
