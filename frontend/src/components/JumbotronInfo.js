import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { addFavorite } from '../actions/accountStocks'
//--------------------

//Component
const JumbotronInfo = ({ props, sendFavorite, username }) => {
	const [signup, setSignup] = useState(false)
	const stockName = props.name
	const stockSymbol = props.symbol
	const flag = true

	if (signup) {
		return <Redirect to='/signup' />
	}

	return (
		<Card id='quote__Card'>
			<Card.Header>{props.symbol}</Card.Header>
			<Card.Body>
				<Card.Text>
					<strong>{props.name}</strong>{' '}
				</Card.Text>
				<hr />
				<div>
					<Card.Text>{props.language}</Card.Text>
					<Card.Text>Market cap- {props.cap}</Card.Text>
					<Card.Text>
						{props.shortname} {props.timezone}
					</Card.Text>
					<Card.Text>{props.exchange}</Card.Text>

					<Card.Text>ask price- {props.ask}</Card.Text>
					<Card.Text>200 day avg- {props.average}</Card.Text>
				</div>
			</Card.Body>
			<Card.Footer className='text-muted'>
				<Button
					onClick={() => {
						return props.auth
							? sendFavorite({ flag, stockName, stockSymbol, username })
							: setSignup(true)
					}}
					variant='light'
					style={{
						border: '1px solid rgba(52, 1, 86, 0.5)',
						color: 'rgba(52, 1, 86, 0.9)',
					}}
				>
					Add to favorites
				</Button>
			</Card.Footer>
		</Card>
	)
}

const mapStateToinfo = (state, ownProps) => ({
	username: state.account.username,
	props: ownProps,
})

const mapDispatchToinfo = {
	sendFavorite: addFavorite,
}

export default connect(mapStateToinfo, mapDispatchToinfo)(JumbotronInfo)
