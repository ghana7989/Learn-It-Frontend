/** @format */

import axios from 'axios'
import {useEffect, useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Loader from '../Loader'
import UserNav from '../nav/UserNav'
import {useRouter} from 'next/router'

const Protect = ({children}) => {
	const router = useRouter()
	const [isHidden, setIsHidden] = useState(true)
	useEffect(() => {
		const fetchUser = async () => {
			try {
				await axios.get('/api/current-user')
				setIsHidden(false)
			} catch (e) {
				console.error(e)
				setIsHidden(true)
				router.push('/login')
			}
		}
		fetchUser()
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
					<UserNav />
				</Col>
				<Col md={10}>{children}</Col>
			</Row>
		</Container>
	)
}

export default Protect
