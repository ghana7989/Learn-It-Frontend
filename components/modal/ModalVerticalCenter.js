import {Modal, Button} from 'react-bootstrap'

function ModalVerticalCenter({
	title,
	isUploading,
	onHide = () => {},
	footer = 'Close',
	...props
}) {
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
				<Button disabled={isUploading} onClick={onHide}>
					{footer}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalVerticalCenter
