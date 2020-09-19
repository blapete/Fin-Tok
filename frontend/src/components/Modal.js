import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
//--------------------

//Component
const StockModal = () => {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<>
			<Button
				id='modal__Button'
				style={{
					backgroundColor: 'rgba(52, 1, 86, 0.4)',
					border: '1px solid white',
					color: 'black',
				}}
				onClick={handleShow}
			>
				Lookup Symbols
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Symbols</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ul style={{ listStyleType: 'none' }}>
						<li>
							Apple, Inc. - <strong>AAPL</strong>
						</li>
						<hr />
						<li>
							Tesla, Inc. - <strong>TSLA</strong>
						</li>
						<hr />
						<li>
							PepsiCo, Inc. - <strong>PEP</strong>
						</li>
						<hr />
						<li>
							Home Depot Inc. - <strong>HD</strong>
						</li>
						<hr />
						<li>
							Microsoft Corporation - <strong>MSFT</strong>
						</li>
						<hr />
						<li>
							Amazon.com, Inc. - <strong>AMZN</strong>
						</li>
						<hr />
						<li>
							Solvay SA - <strong>SVYSF</strong>
						</li>
						<hr />
						<li>
							Pfizer Inc. - <strong>PFE</strong>
						</li>
					</ul>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='light'
						style={{
							border: '1px solid rgba(52, 1, 86, 0.4)',
							color: 'rgba(52, 1, 86, 0.9)',
						}}
						onClick={handleClose}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default StockModal
