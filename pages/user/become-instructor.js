/** @format */
import Spacer from 'react-spacer'
import axios from 'axios'
import Link from 'next/link'
import {useState, useContext} from 'react'
import {Jumbotron, Button, Container, Row, Col} from 'react-bootstrap'
import {
	AiOutlineSetting,
	AiOutlineUserSwitch,
	AiOutlineLoading,
} from 'react-icons/ai'
import AppToast from '../../components/AppToast'
import {UserContext} from '../../context/UserContext'

const BecomeInstructor = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [toastMessage, setToastMessage] = useState('')
	const {userState, _} = useContext(UserContext)
	const handleBecomeInstructorClick = () => {
		setIsLoading(true)
		axios
			.post('/api/make-instructor')
			.then(res => {
				window.location.href = res.data
			})
			.catch(err => {
				console.log(err.response)
				setIsLoading(false)
				setToastMessage(err.response?.data)
				setTimeout(() => {
					setToastMessage('')
				}, 3100)
			})
	}
	return (
		<>
			<Jumbotron
				className='text-center text-light bg-dark'
				style={{
					height: '10vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}>
				<h1>Become Instructor</h1>
			</Jumbotron>
			<Container fluid className='d-flex justify-content-center'>
				<Row className='justify-content-center'>
					<Col className='text-center'>
						<Spacer height='30px' />
						<AiOutlineUserSwitch color='#fff' size={100} />
						<Spacer height='30px' />
						<h1 className='text-light'>
							Setup Stripe to publish your courses on{' '}
							<Link href='/'>Learn It</Link>
						</h1>
						<Spacer height='30px' />
						<h4 className='text-info'>
							Learn It uses stripe to manage your payments
						</h4>
						<Spacer height='30px' />
						<Button
							disabled={
								isLoading || userState?.user?.role.includes('Instructor')
							}
							onClick={handleBecomeInstructorClick}>
							{isLoading ? (
								<>Processing...</>
							) : (
								<>
									Become an Instructor <AiOutlineSetting size={30} />
								</>
							)}
						</Button>
						<Spacer height='50px' />
						<h4 className='text-light'>
							You will be redirected to stripe to complete the payment process.
						</h4>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default BecomeInstructor
