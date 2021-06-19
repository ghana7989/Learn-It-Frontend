import {useEffect} from 'react'
import {Form, Row, Image, Col, Button, InputGroup} from 'react-bootstrap'
import Spacer from 'react-spacer'

const maxPrice = 99.99
const minPrice = 9.99
const optionsDataSet = []
for (let i = minPrice; i <= maxPrice; i = i + 10) {
	optionsDataSet.push(<option key={i}>{i.toFixed(2)}</option>)
}
const CreateCourseForm = ({
	handleSubmit,
	handleChange,
	handleImageUpload,
	values,
	setValues,
	previewImage,
	editPage = false,
}) => {
	useEffect(() => {
		return () => {
			setValues({})
		}
	}, [])
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='name'>Enter the Course Name</Form.Label>
				<Form.Control
					required
					name='name'
					type='text'
					onChange={handleChange}
					value={values.name}
					placeholder='Enter the Course Name'
				/>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label htmlFor='description'>Description</Form.Label>
				<Form.Control
					required
					as='textarea'
					name='description'
					placeholder='Description'
					value={values.description}
					onChange={handleChange}
					cols='7'
					rows='7'
				/>
			</Form.Group>
			<Row>
				<Col>
					<Form.Group className='mb-3' controlId='paid'>
						<Form.Control
							required
							as='select'
							name='paid'
							value={values.paid}
							onChange={e => setValues({...values, paid: !values.paid})}
						>
							<option value={true}>Paid</option>
							<option value={false}>Free</option>
						</Form.Control>
					</Form.Group>
				</Col>
				{values.paid && (
					<Col>
						<Form.Group className='mb-3' controlId='price'>
							<InputGroup>
								<InputGroup.Prepend id='inputGroupPrepend'>
									<InputGroup.Text>$</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									required
									as='select'
									name='price'
									// value={values.price}
									defaultValue={editPage ? values?.price : '9.99'}
									onChange={e => setValues({...values, price: e.target.value})}
								>
									{optionsDataSet}
								</Form.Control>
							</InputGroup>
						</Form.Group>
					</Col>
				)}
			</Row>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='category'>
					If multiple catagories use commas eg: React, Node, Mongoose
				</Form.Label>
				<Form.Control
					required
					name='category'
					type='text'
					onChange={handleChange}
					value={values.category}
					placeholder='Enter Category as comma(,) separated value'
				/>
			</Form.Group>
			<Row className='align-items-center'>
				<Col xs={12} md={6}>
					<Form.File id='formcheck-api-regular'>
						{!values?.loading && !previewImage && (
							<Form.Label>Image will be compressed</Form.Label>
						)}
						<Form.File.Input
							required={!editPage}
							name='image'
							onChange={handleImageUpload}
							accept='image/*'
						/>
					</Form.File>
				</Col>
				{previewImage && (
					<Col>
						<Image width='200px' rounded src={previewImage} />
					</Col>
				)}
				{editPage && !previewImage && (
					<Col>
						<Image width='200px' rounded src={values.image.Location} />
					</Col>
				)}
			</Row>
			<Spacer height='30px' />
			<Button
				variant='primary'
				disabled={values.loading || values.uploading}
				type='submit'
			>
				Save and Continue
			</Button>
		</Form>
	)
}

export default CreateCourseForm
