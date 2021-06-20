/** @format */

import {useEffect, useState} from 'react'
import {
	Container,
	Form,
	Row,
	Col,
	Card,
	Button,
	ListGroup,
	Badge,
	Jumbotron,
} from 'react-bootstrap'
import Spacer from 'react-spacer'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useRouter} from 'next/router'

import Loader from '../../../../components/Loader'
import InstructorProtect from '../../../../components/HOC/InstructorProtect'
import CreateCourseForm from '../../../../components/forms/CreateCourseForm'
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import ModalVerticalCenter from '../../../../components/modal/ModalVerticalCenter'
import LessonForm from '../../../../components/forms/LessonForm'

// TO-Do : Check request Aborted Error
// Fix update video in course
// Fix Delete Video Route

const EditCourse = () => {
	const router = useRouter()
	const slug = router.query.slug

	const [values, setValues] = useState({
		name: '',
		description: '',
		category: '',
		price: '9.99',
		uploading: false,
		paid: true,
		loading: false,
		image: {},
		lessons: [],
	})
	const [showModal, setShowModal] = useState(false)
	let [currentLesson, setCurrentLesson] = useState(undefined)
	const [imageFile, setImageFile] = useState(undefined)
	const [previewImage, setPreviewImage] = useState('')
	const [isUploading, setIsUploading] = useState(false)
	const [progress, setProgress] = useState(0)

	const [videoFile, setVideoFile] = useState(null)
	console.clear()

	const [error, setError] = useState(null)
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
		if (!imageFile) {
			const finalFormData = {
				name: values.name,
				description: values.description,
				category: values.category,
				price: values.paid ? values.price : null,
				paid: values.paid,
			}
			await axios.put(`/api/course/${slug}`, finalFormData)
			setValues(undefined)
			window.location.href = '/instructor'
			return
		}

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
				const {data: createCourseData} = await axios.put(
					`/api/course/${slug}`,
					finalFormData,
				)
				setValues(undefined)

				router.push('/instructor')
				window.location.href = `/instructor/course/view/${slug}`
			} catch (e) {}
		})
	}
	const handleVideoUpload = async e => {
		const file = e.target.files[0]
		const videoData = new FormData()
		videoData.append('video', file)
		videoData.append('courseId', values.id)

		if (!!currentLesson?.video?.Location) {
			await axios.post('/api/course/remove-video', currentLesson.video)
			setVideoFile(videoData)
		}
	}
	const handleUpdateLesson = async e => {
		e.preventDefault()
		if (videoFile) {
			setIsUploading(true)
			// First Upload the video
			try {
				const {data: videoUploadData} = await axios.post(
					`/api/course/video-upload/`,
					videoFile,
					{
						onUploadProgress: e => {
							setProgress(Math.round((100 * e.loaded) / e.total))
						},
					},
				)
				setProgress(0)
				currentLesson = {...currentLesson, video: videoUploadData}

				const {data: lessonUpdatedData} = await axios.put(
					`/api/course/lesson/${values?.id}/${currentLesson.id}`,
					currentLesson,
				)
				setShowModal(false)
			} catch (error) {
				setError('Video Upload Failed Try Again Later')
			}
		} else {
			try {
				const {data: lessonUpdatedData} = await axios.put(
					`/api/course/lesson/${values?.id}/${currentLesson.id}`,
					currentLesson,
				)

				setShowModal(false)
				// setValues({})
				setCurrentLesson(lessonUpdatedData)
			} catch (error) {
				setError('Something Went Wrong')
			}
		}

		setIsUploading(false)
	}

	function handleOnDragStart(e, index) {
		e.dataTransfer.setData('itemIndex', index)
	}
	async function handleOnDrop(e, index) {
		const movingItemIndex = e.dataTransfer.getData('itemIndex')
		const targetItemIndex = index
		let allLessons = values?.lessons || []
		let movingItem = allLessons[movingItemIndex]

		allLessons.splice(movingItemIndex, 1) // Deleting the dragging Item
		allLessons.splice(targetItemIndex, 0, movingItem) // Pushing the Dragged Item after target Item
		setValues({...values, lessons: [...allLessons]})
		axios.put(`/api/course/${slug}`, {
			...values,
		})
	}
	async function handleCourseDelete(index, lesson) {
		const lessonId = lesson.id
		const answer = window.confirm('Are you sure you want to delete')
		if (!answer) return
		let allLessons = values.lessons
		allLessons.splice(index, 1)
		setValues({...values, lessons: allLessons})
		// Delete in DB
		await axios.put(`/api/course/${slug}/${lessonId}`)
	}
	useEffect(() => {
		if (!slug) return
		;(async function () {
			const {data} = await axios.get(`/api/course/${slug}`)
			setValues({...data, price: data.price + ''})

			// setValues({...values, price: data.price})
		})()
	}, [slug])
	if (!values?.name || !values?.image?.Location) {
		return (
			<div
				style={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				className='bg-dark'
			>
				<Loader />
			</div>
		)
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
				<h1>Edit Course</h1>
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
							editPage={true}
						/>
						<Spacer height='30px' />
					</Col>
				</Row>
				<Row className='pb-5'>
					<Col>
						<h1 className='mb-3'>
							There are Total {values?.lessons?.length} lessons
						</h1>
						<h3 className='mb-3'>Arrange the courses by drag and drop</h3>
						<ListGroup onDragOver={e => e.preventDefault()}>
							{values?.lessons?.map((lesson, index) => (
								<ListGroup.Item
									key={lesson.id}
									draggable
									onDragStart={e => handleOnDragStart(e, index)}
									onDrop={e => handleOnDrop(e, index)}
									className='d-flex align-items-center justify-content-between'
								>
									<div
										className='d-flex align-items-center '
										style={{cursor: 'pointer'}}
										onClick={() => {
											setShowModal(true)
											setCurrentLesson(lesson)
										}}
									>
										<Badge className='bg-primary '>
											<h3>{index + 1}</h3>
										</Badge>
										<Spacer width='20px' />
										<h3>{lesson.title}</h3>
									</div>
									<div className='mx-3'>
										<AiOutlineDelete
											style={{cursor: 'pointer'}}
											onClick={() => handleCourseDelete(index, lesson)}
											color='red'
											size={30}
										/>
									</div>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
				</Row>

				<ModalVerticalCenter
					title='Edit Lesson'
					onHide={() => {
						setShowModal(false)
						setCurrentLesson(undefined)
						return
					}}
					show={!!showModal}
					error={error}
				>
					<LessonForm
						values={currentLesson}
						setValues={setCurrentLesson}
						error={error}
						handleVideoUpload={handleVideoUpload}
						handleAddLesson={handleUpdateLesson}
						progress={progress}
						isUploading={isUploading}
					/>
				</ModalVerticalCenter>
			</Container>
		</InstructorProtect>
	)
}

export default EditCourse
