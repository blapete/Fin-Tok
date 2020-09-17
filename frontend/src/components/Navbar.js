import React from 'react'
import { Button, Navbar, Nav } from 'react-bootstrap'
import { reset } from '../actions/accountStocks'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Logout from './Logout'
//--------------------

//Component
const NavBar = ({ props, clearStockInfo }) => {
	if (props.status === true) {
		return (
			<Navbar bg='dark' variant='dark' expand='lg' style={{ color: 'white' }}>
				<Link to='/' onClick={clearStockInfo}>
					<Navbar.Brand>FinTok</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Link
							onClick={clearStockInfo}
							id='home__Link'
							to='/home'
							style={{ textDecoration: 'none', color: 'white' }}
						>
							My homepage
						</Link>
					</Nav>
					<Nav className='mr-auto'>
						<hr
							style={{
								border: '0',
								clear: 'both',
								width: '65%',
								height: '1px',
								backgroundColor: '#fff',
							}}
						/>
					</Nav>
					<Logout />
				</Navbar.Collapse>
			</Navbar>
		)
	} else {
		return (
			<Navbar  expand='lg' style={{ backgroundColor: 'rgba(52, 1, 86, 0.3)' ,color: 'white' }}>
				<Link to='/' onClick={clearStockInfo}>
					<Navbar.Brand>FinTok</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Link
							to='/about'
							style={{ textDecoration: 'none', color: 'white' }}
						>
							About
						</Link>
					</Nav>
					<Nav className='mr-auto'>
						<hr
							style={{
								border: '0',
								clear: 'both',
								width: '65%',
								height: '1px',
								backgroundColor: '#fff',
							}}
						/>
					</Nav>
					<Link to='/login'>
						<Button
							style={{
								marginRight: '0.5rem',
								backgroundColor: 'rgba(52, 1, 86, 0.4)',
								border: '1px solid white',
							}}
						>
							Log in
						</Button>
					</Link>
					<Link to='/signup'>
						<Button
							variant='light'
							style={{
								border: '1px solid rgba(52, 1, 86, 0.5)',
								color: 'rgba(52, 1, 86, 0.5)',
							}}
						>
							Sign up
						</Button>
					</Link>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	props: ownProps,
})

const mapDispatchToProps = {
	clearStockInfo: reset,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
