/** @format */
import Link from 'next/link'
import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import Spacer from 'react-spacer'
import {
	Container,
	Jumbotron,
	Row,
	Col,
	Card,
	Button,
	Alert,
} from 'react-bootstrap'
import {UserContext} from '../../context/UserContext'
import InstructorProtect from '../../components/HOC/InstructorProtect'

const Instructor = () => {
	const {userState} = useContext(UserContext)
	const [courses, setCourses] = useState([])
	useEffect(() => {
		loadCourses()
	}, [])

	const loadCourses = async () => {
		const {data} = await axios.get('/api/instructor-courses')
		setCourses(data)
	}
	return (
		<InstructorProtect>
			<Jumbotron
				className='text-center text-light bg-dark'
				style={{
					height: '10vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<Container fluid='true'>
					<h1>{userState?.user?.name}</h1>
				</Container>
			</Jumbotron>
			<Container fluid='true' className='p-3'>
				<Row xs={2} lg={3} className='g-4'>
					{courses.map((course, index) => (
						<Col key={course.id}>
							<Spacer height='30px' />
							<Card className='h-100'>
								<Card.Img
									style={{
										width: '100%',
										height: '12vw',
										objectFit: 'cover',
									}}
									variant='top'
									src={course.image ? course.image.Location : '/course.png'}
								/>
								<Card.Body>
									<Link
										href={`/instructor/course/view/${course.slug}`}
										passHref
									>
										<Card.Title
											style={{
												cursor: 'pointer',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
											}}
											className='text-light'
											as='h2'
										>
											{course.name}
										</Card.Title>
									</Link>
									<Spacer height={5} />
									<Card.Subtitle>{course.lessons.length} Lessons</Card.Subtitle>
									<Spacer height={10} />
									<Card.Text>
										{/* <ReactMarkdown> */}
										{course.description.slice(0, 70) + '...'}
										{/* </ReactMarkdown> */}
									</Card.Text>
									<Spacer height={10} />
									{!courses.length < 5 ? (
										<Alert variant='warning' className='p-1'>
											<Alert.Heading>Warning!</Alert.Heading>
											<p>
												At least 5 lessons are required to publish a course.
											</p>
										</Alert>
									) : course.published ? (
										<Alert variant='success' className='p-1'>
											<Alert.Heading>
												Your course is already published
											</Alert.Heading>
										</Alert>
									) : (
										<Alert variant='light' className='p-1'>
											<Alert.Heading>
												Your Course is ready to be published
											</Alert.Heading>
										</Alert>
									)}
									<Spacer height={10} />
									<Row
										style={{
											position: 'absolute',
											bottom: '20px',
											width: '100%',
										}}
									>
										<Col>
											<Button variant='secondary'>Read More</Button>
										</Col>
										<Col
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<Button
												disabled={!(courses.length > 5) && !courses.published}
											>
												Publish Now
											</Button>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</InstructorProtect>
	)
}

export default Instructor
