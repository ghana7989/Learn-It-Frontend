/** @format */

import axios from 'axios'
import {useEffect, useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Loader from '../Loader'
import InstructorNav from '../nav/InstructorNav'
import {useRouter} from 'next/router'

const InstructorProtect = ({children}) => {
	const [isHidden, setIsHidden] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const fetchInstructor = async () => {
			try {
				await axios.get('/api/current-instructor')
				setIsHidden(false)
			} catch (e) {
				console.error(e)
				setIsHidden(true)
				router.push('/')
			}
		}
		fetchInstructor()
	}, [])

	if (isHidden)
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
					width: '100%',
					flex: 1,
				}}>
				<Loader />
			</div>
		)
	return (
		<Container fluid='true'>
			<Row>
				<Col md={2}>
					<InstructorNav />
				</Col>
				<Col md={10}>{children}</Col>
			</Row>
		</Container>
	)
}

export default InstructorProtect
