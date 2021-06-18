import {useEffect} from 'react'
import {
	Form,
	Row,
	Image,
	Col,
	Button,
	InputGroup,
	ProgressBar,
} from 'react-bootstrap'
import Spacer from 'react-spacer'

const maxPrice = 99.99
const minPrice = 9.99
const optionsDataSet = []
for (let i = minPrice; i <= maxPrice; i = i + 10) {
	optionsDataSet.push(<option key={i}>{i.toFixed(2)}</option>)
}
const AddLessonForm = ({
	values,
	setValues,
	handleAddLesson,
	handleVideoUpload,
	isUploading,
	progress,
	error,
}) => {
	useEffect(() => {
		return () => {
			setValues({})
		}
	}, [])
	return (
		<Form onSubmit={handleAddLesson}>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='title'>Enter the Lesson Title</Form.Label>
				<Form.Control
					required
					name='title'
					value={values.title}
					onChange={e => setValues({...values, title: e.target.value})}
					type='text'
					autoFocus
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='description'>Description</Form.Label>
				<Form.Control
					as='textarea'
					name='description'
					value={values.description}
					onChange={e => setValues({...values, description: e.target.value})}
					placeholder='Description'
					cols='7'
					rows='7'
				/>
			</Form.Group>
			<Form.File id='formcheck-api-regular'>
				<Form.File.Input
					required
					name='video'
					onChange={handleVideoUpload}
					accept='video/*'
				/>
			</Form.File>
			<Spacer height='30px' />
			{!error && progress !== 0 && (
				<ProgressBar
					height='30px'
					variant='danger'
					now={progress}
					className='mb-3 text-primary'
				/>
			)}
			<Button
				onClick={handleAddLesson}
				variant='primary'
				disabled={isUploading}
				type='submit'
			>
				{!error ? 'Upload the Lesson' : error}
			</Button>
		</Form>
	)
}

export default AddLessonForm
