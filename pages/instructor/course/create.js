/** @format */

import {useState} from 'react'
import {Jumbotron, Container, Row, Col} from 'react-bootstrap'
import Spacer from 'react-spacer'
import InstructorProtect from '../../../components/HOC/InstructorProtect'
import CreateCourseForm from '../../../components/forms/CreateCourseForm'

const CreateCourse = () => {
	const [values, setValues] = useState({
		name: '',
		description: '',
		category: '',
		price: null,
		uploading: false,
		paid: false,
		loading: false,
		imagePreview: '',
	})
	const handleChange = e => {
		setValues({...values, [e.target.name]: e.target.value})
	}
	const handleImageUpload = e => {
		//
	}
	const handleSubmit = e => {
		e.preventDefault()
		console.log(values)
	}

	return (
		<InstructorProtect>
			<Jumbotron
				className='text-center text-light bg-dark'
				style={{
					height: '10vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<h1>CreateCourse</h1>
			</Jumbotron>
			<Container fluid='true'>
				<Row>
					<Col xs={12} md={6}>
						<Spacer height='30px' />
						<CreateCourseForm
							handleChange={handleChange}
							handleImageUpload={handleImageUpload}
							handleSubmit={handleSubmit}
							values={values}
							setValues={setValues}
						/>
						<Spacer height='30px' />
					</Col>
				</Row>
			</Container>
		</InstructorProtect>
	)
}

export default CreateCourse
