/** @format */

import {Toast} from 'react-bootstrap'
import {PropTypes} from 'prop-types'
import {useState} from 'react'
const AppToast = ({message}) => {
	const [show, setShow] = useState(true)
	return (
		<div
			aria-live='polite'
			aria-atomic='true'
			style={{
				position: 'relative',
				minHeight: '100px',
			}}>
			<Toast
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
				}}
				show={show}
				onClose={() => setShow(false)}
				delay={3000}
				autohide>
				<Toast.Header closeButton={false}>
					<strong className='me-auto'>
						Learn It
					</strong>
					<small>Just Now</small>
				</Toast.Header>
				<Toast.Body>{message}</Toast.Body>
			</Toast>
		</div>
	)
}
AppToast.propTypes = {
	message: PropTypes.string.isRequired,
}
export default AppToast
