import {Modal, Button} from 'react-bootstrap'

function ModalVerticalCenter({title, onHide, footer = 'Close', ...props}) {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header>
				<Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>{footer}</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalVerticalCenter
