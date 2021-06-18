/** @format */

import {useState} from 'react'
import {Jumbotron, Container, Row, Col} from 'react-bootstrap'
import Spacer from 'react-spacer'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

import InstructorProtect from '../../../components/HOC/InstructorProtect'
import CreateCourseForm from '../../../components/forms/CreateCourseForm'
import {useRouter} from 'next/router'
import AppToast from '../../../components/AppToast'

const CreateCourse = () => {
	const router = useRouter()
	const [values, setValues] = useState({
		name: '',
		description: '',
		category: '',
		price: '9.99',
		uploading: false,
		paid: true,
		loading: false,
		image: {},
	})
	const [imageFile, setImageFile] = useState(undefined)
	const [previewImage, setPreviewImage] = useState('')
	const handleChange = e => {
		setValues({...values, [e.target.name]: e.target.value})
	}
	const handleImageUpload = e => {
		let file = e.target.files[0]
		setImageFile(file)
		setPreviewImage(window.URL.createObjectURL(file))
		// Resizing
	}
	const handleSubmit = async e => {
		e.preventDefault()
		if (!imageFile) return

		Resizer.imageFileResizer(imageFile, 700, 500, 'JPEG', 90, 0, async uri => {
			try {
				const {data} = await axios.post('/api/course/upload-image', {
					image: uri,
				})
				const finalFormData = {
					name: values.name,
					description: values.description,
					category: values.category,
					price: values.paid ? values.price : null,
					paid: values.paid,
					image: data,
				}
				const {data: createCourseData} = await axios.post(
					'/api/course',
					finalFormData,
				)
				setValues(undefined)
				console.log('I am Not Working', createCourseData)
				router.push('/instructor')
				window.location.href = '/instructor'
			} catch (e) {
				console.log('e: ', e)
			}
		})
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
							previewImage={previewImage}
						/>
						<Spacer height='30px' />
					</Col>
				</Row>
			</Container>
		</InstructorProtect>
	)
}

export default CreateCourse
