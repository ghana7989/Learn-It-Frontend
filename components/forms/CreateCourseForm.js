import {Form, Row, Col, Button, InputGroup} from 'react-bootstrap'
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
}) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='name'>Enter Your Name</Form.Label>
				<Form.Control
					name='name'
					type='text'
					onChange={handleChange}
					value={values.name}
					placeholder='Enter Your Name'
				/>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label htmlFor='description'>Description</Form.Label>
				<Form.Control
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
							as='select'
							name='paid'
							value={values.paid}
							onChange={e =>
								setValues({...values, paid: !values.paid, price: null})
							}
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
								<Form.Control as='select' name='price' defaultValue='$9.99'>
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
					name='category'
					type='text'
					onChange={handleChange}
					value={values.category}
					placeholder='Enter Category as comma(,) separated value'
				/>
			</Form.Group>
			<Row>
				<Col>
					<Form.File id='formcheck-api-regular'>
						{values?.loading && (
							<Form.File.Label>Image is uploading</Form.File.Label>
						)}
						<Form.File.Input
							name='image'
							onChange={handleImageUpload}
							accept='image/*'
						/>
					</Form.File>
				</Col>
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
