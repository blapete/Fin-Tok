import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { quote } from '../actions/yahoo'
import { removeFavorite } from '../actions/accountStocks'
//--------------------

//Component
const AccountStocks = ({ getQuote, props, sendRemoveRequest, username }) => {
	const stockSymbol = props.symbol
	const stockId = props.id

	const requestQuote = (e) => {
		e.preventDefault()
		getQuote({ data: stockSymbol }).then(() => {
			window.scrollTo(0, 0)
		})
	}

	const removeStock = (e) => {
		e.preventDefault()
		sendRemoveRequest({ id: stockId, username })
	}

	return (
		<Card key={props.key} className='mb-2 stock__Cards'>
			<Card.Header>{props.name}</Card.Header>

			<Button
				onClick={requestQuote}
				style={{
					marginBottom: '0.5rem',
					backgroundColor: 'rgba(52, 1, 86, 0.4)',
					border: '1px solid rgba(52, 1, 86, 0.5)',
				}}
			>
				View
			</Button>

			<p>or</p>
			<Button
				onClick={removeStock}
				variant='light'
				style={{
					border: '1px solid rgba(52, 1, 86, 0.5)',
					color: 'rgba(52, 1, 86, 0.5)',
				}}
			>
				Remove
			</Button>
		</Card>
	)
}

const mapStateToProps = (state, ownProps) => ({
	username: state.account.username,
	props: ownProps,
})
const mapDispatchToProps = {
	getQuote: quote,
	sendRemoveRequest: removeFavorite,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountStocks)
