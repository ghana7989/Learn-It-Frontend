import {useEffect} from 'react'
import {Form, Button, ProgressBar} from 'react-bootstrap'
import {Player} from 'video-react'
import Spacer from 'react-spacer'

const maxPrice = 99.99
const minPrice = 9.99
const optionsDataSet = []
for (let i = minPrice; i <= maxPrice; i = i + 10) {
	optionsDataSet.push(<option key={i}>{i.toFixed(2)}</option>)
}
const LessonForm = ({
	values,
	setValues,
	handleAddLesson,
	handleVideoUpload,
	isUploading,
	progress,
	error,
}) => {
	console.log('values: ', values)
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
					value={values?.title || values?.name}
					onChange={e => setValues({...values, title: e.target.value})}
					type='text'
					autoFocus
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='description'>Description</Form.Label>
				<Form.Control
					required={!values?.video || !values?.description}
					as='textarea'
					name='description'
					value={values?.description}
					onChange={e => setValues({...values, description: e.target.value})}
					placeholder='Description'
					cols='7'
					rows='7'
				/>
			</Form.Group>
			{values?.video?.Location && (
				<>
					<Player autoplay fluid volume={1}>
						<source src={values?.video?.Location} />
					</Player>
					<Spacer height='30px' />
				</>
			)}
			<Form.File id='formcheck-api-regular' onChange={handleVideoUpload}>
				<Form.File.Input
					required={!values?.video || !values?.description}
					name='video'
					onChange={handleVideoUpload}
					accept='video/*'
				/>
			</Form.File>
			{!error && progress !== 0 && (
				<>
					<Spacer height='30px' />
					<ProgressBar
						height='30px'
						variant='danger'
						now={progress}
						className='mb-3 text-primary'
					/>
				</>
			)}
			{values?.video?.Location && (
				<fieldset>
					<legend className='mt-4'>Video Preview</legend>
					<div className='form-check form-switch'>
						<input
							className='form-check-input'
							type='checkbox'
							id='flexSwitchCheckDefault'
							disabled={isUploading}
							defaultChecked={values?.free_preview}
							onClick={() =>
								setValues({...values, free_preview: !values?.free_preview})
							}
						/>
						<label
							className='form-check-label'
							htmlFor='flexSwitchCheckDefault'
						>
							Enable for video preview
						</label>
					</div>
					<Spacer height='30px' />
				</fieldset>
			)}
			<Button
				onClick={handleAddLesson}
				variant={error ? 'danger' : 'primary'}
				disabled={isUploading}
				type='submit'
			>
				{!error ? 'Upload the Lesson' : error}
			</Button>
		</Form>
	)
}

export default LessonForm
