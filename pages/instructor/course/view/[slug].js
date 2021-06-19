import {useState, useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import Spacer from 'react-spacer'
import {
	Container,
	Form,
	Row,
	Col,
	Card,
	Button,
	ListGroup,
	Badge,
} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import InstructorProtect from '../../../../components/HOC/InstructorProtect'
import Loader from '../../../../components/Loader'
import ModalVerticalCenter from '../../../../components/modal/ModalVerticalCenter'
import LessonForm from '../../../../components/forms/LessonForm'

const CourseView = () => {
	const router = useRouter()
	const slug = router.query.slug

	let [values, setValues] = useState({
		title: '',
		description: '',
		video: {},
	})
	const [isUploading, setIsUploading] = useState(false)
	const [videoFile, setVideoFile] = useState(null)

	const [error, setError] = useState(null)
	const [progress, setProgress] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [course, setCourse] = useState(null)

	const handleAddLesson = async e => {
		e.preventDefault()
		if (videoFile) {
			setIsUploading(true)
			// First Upload the video
			try {
				const {data: videoUploadData} = await axios.post(
					`/api/course/video-upload`,
					videoFile,
					{
						onUploadProgress: e => {
							setProgress(Math.round((100 * e.loaded) / e.total))
						},
					},
				)
				setProgress(0)
				values = {...values, video: videoUploadData}
				console.log('values: Before Sending', values)
				const {data: lessonUploadData} = await axios.post(
					`/api/course/lesson/${slug}/${course.instructor.id}`,
					values,
				)
				console.log(lessonUploadData)
				setShowModal(false)
				// setValues({})
				setCourse(lessonUploadData)
			} catch (error) {
				console.log('error: ', error)
				setError('Video Upload Failed Try Again Later')
			}
		} else {
			try {
				const {data: lessonUploadData} = await axios.post(
					`/api/course/lesson/${slug}/${course.instructor.id}`,
					values,
				)
				console.log(lessonUploadData)
				setShowModal(false)
				// setValues({})
				setCourse(lessonUploadData)
			} catch (error) {
				console.log('error: ', error)
			}
		}

		setIsUploading(false)
	}

	const handleVideoUpload = e => {
		const file = e.target.files[0]
		const videoData = new FormData()
		videoData.append('video', file)
		setVideoFile(videoData)
	}
	useEffect(() => {
		;(async function () {
			if (slug !== undefined) {
				const {data} = await axios.get(`/api/course/${slug}`)
				console.log(data)
				setCourse(data)
			}
		})()
	}, [slug])
	if (!course) {
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
		<>
			<InstructorProtect>
				<Container fluid='md' className='bg-dark p-3'>
					<Spacer height={60} />
					<Row>
						<Col xs={12} md={4}>
							<Card className='h-100'>
								<Card.Img
									style={{
										width: '100%',
										height: 'auto',
										objectFit: 'cover',
									}}
									variant='top'
									src={course.image ? course.image.Location : '/course.png'}
								/>
							</Card>
						</Col>
						{/* <Spacer width='10%' /> */}
						<Col
							xs={12}
							md={8}
							className='d-flex align-items-start flex-column'
						>
							<h1 className='text-light '>{course.name}</h1>
							<h3>
								{course.paid ? `Cost of course is : ${course.price}` : 'Free'}
							</h3>
							<h6>{course.category}</h6>
							<div
								style={{
									width: 'auto',
									gap: '30px',
									display: 'flex',
									justifyContent: 'space-around',
								}}
							>
								<Button
									onClick={() => router.push(`/instructor/course/edit/${slug}`)}
								>
									Edit
								</Button>

								<Button>Publish</Button>
							</div>
						</Col>
					</Row>
					<Spacer height='3vh' />
					<Row>
						<Col className='text-light' style={{fontSize: '1.3rem'}}>
							<ReactMarkdown>{course.description}</ReactMarkdown>
						</Col>
					</Row>
					<Spacer height={30} />
					<div className='d-flex justify-content-center'>
						<Button className='btn-lg px-5' onClick={() => setShowModal(true)}>
							Add Lesson
						</Button>
					</div>
					<Spacer height={60} />
					<ModalVerticalCenter
						title='Add Lesson'
						isUploading={isUploading}
						show={!!showModal}
						onHide={() => {
							setValues({})
							setProgress(0)
							setShowModal(p => !p)
						}}
					>
						<LessonForm
							values={values}
							setValues={setValues}
							handleAddLesson={handleAddLesson}
							handleVideoUpload={handleVideoUpload}
							isUploading={isUploading}
							error={error}
							progress={progress}
						/>
					</ModalVerticalCenter>
					<Row className='pb-5'>
						<Col>
							<h3>There are Total {course?.lessons?.length} lessons</h3>
							<ListGroup>
								{course?.lessons?.map((lesson, index) => (
									<>
										<ListGroup.Item className='d-flex align-items-center'>
											<Badge className='bg-primary '>
												<h3>{index + 1}</h3>
											</Badge>
											<Spacer width='20px' />
											<h3>{lesson.title}</h3>
										</ListGroup.Item>
									</>
								))}
							</ListGroup>
						</Col>
					</Row>
				</Container>
			</InstructorProtect>
		</>
	)
}

export default CourseView
