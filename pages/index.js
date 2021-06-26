/** @format */
import axios from 'axios'
import {useEffect, useState} from 'react'
import {Container, Form, Row, Col, Button, Card} from 'react-bootstrap'
import Link from 'next/link'
import Spacer from 'react-spacer'
import CourseCard from '../components/cards/CourseCard'
const Index = () => {
	const [courses, setCourses] = useState([])
	useEffect(() => {
		;(async function () {
			const {data} = await axios.get('/api/courses')
			setCourses(data)
		})()
	}, [])
	return (
		<Container fluid='true' className='p-3'>
			<Row xs={2} lg={3} className='g-4'>
				{courses.map(course => {
					return (
						<Col key={course.id}>
							<CourseCard course={course} />
						</Col>
					)
				})}
			</Row>
		</Container>
	)
}

export default Index
