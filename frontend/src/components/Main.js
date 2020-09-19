import React, { useState } from 'react'
import { connect } from 'react-redux'
import { quote, topWatched } from '../actions/yahoo'
import { Button, Container, Row, Spinner } from 'react-bootstrap'
import { YAHOO } from '../actions/types'
import { useMoment } from '../hooks'
import Jumbotron from './Jumbotron'
import Modal from './Modal'
import TopGainersCarousel from './Carousel'
import Navbar from './Navbar'
import Moment from 'moment'
//--------------------

//Component
const Landing = ({ accountLoggedIn, topStocks, yahooStocks }) => {
	const [carousel, setCarousel] = useState(false)
	const [buttonClicked, setButtonClicked] = useState(false)

	//moment
	let date = Moment().format('MMMM Do YYYY')
	let initialTime = Moment().format('h:mm:ss a')
	useMoment()

	const topGainersRequest = () => {
		if (buttonClicked === true) {
			return setButtonClicked(false)
		}
		if (yahooStocks.length) {
			setButtonClicked(true)
			setCarousel(true)
			return
		}
		//no data in store => set spinner
		setButtonClicked(true)
		topStocks().then((res) => {
			if (res.type === YAHOO.REQUEST_TOPGAINERS_SUCCESS) {
				setCarousel(!carousel)
			} else {
				setButtonClicked(false)
			}
			window.scrollTo(100, 100)
		})
	}

	return (
		<div>
			<Navbar status={accountLoggedIn} />
			<div id='main__Style'>
				<div id='clock'>
					<span id='clock__Time'>{initialTime}</span>
				</div>
				<Jumbotron date={date} />
				<div id='stock__Box'>
					<Button
						style={{
							backgroundColor: 'rgba(52, 1, 86, 0.4)',
							border: '1px solid white',
						}}
						id='stock__Button'
						href=''
						onClick={topGainersRequest}
					>
						Top watched
					</Button>
					<Modal />
				</div>
				{buttonClicked ? (
					<div>
						{carousel ? (
							<TopGainersCarousel stocks={yahooStocks} />
						) : (
							<Container style={{ marginTop: '5rem' }}>
								<Row>
									<div style={{ margin: '0 auto' }}>
										<div className='divider'></div>

										<Spinner
											animation='border'
											role='status'
											style={{ margin: '1rem' }}
										>
											<span className='sr-only'>Loading...</span>
										</Spinner>

										<div className='divider'></div>
									</div>
								</Row>
							</Container>
						)}
					</div>
				) : null}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	accountLoggedIn: state.account.loggedIn,
	yahooStocks: state.yahoo.top_gainers,
})

const mapDispatchToProps = {
	stockQuote: quote,
	topStocks: topWatched,
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
