/** @format */

import {Container, Form, Row, Col, Button} from 'react-bootstrap'
import Spacer from 'react-spacer'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import AppToast from '../components/AppToast'
import Loader from '../components/Loader'
import {UserContext} from '../context/UserContext'

const ForgotPassword = () => {
	const [email, setEmail] = useState('velvetgloss234@gmail.com')
	const [newPassword, setNewPassword] = useState(undefined)
	const [code, setCode] = useState(undefined)

	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState(false)

	const [toastMessage, setToastMessage] = useState('')
	const {userState, dispatch} = useContext(UserContext)

	const router = useRouter()

	useEffect(() => {
		if (userState.user) {
			router.push('/')
		}
	}, [userState])

	const handleFormSubmit = async e => {
		e.preventDefault()

		try {
			setIsLoading(true)
			const {data} = await axios.post(
				'/api/forgot-password',
				{
					email,
					newPassword,
					code,
				},
				{
					responseType: 'json',
					headers: {'Content-Type': 'application/json'},
				},
			)
			setSuccess(true)
			setToastMessage(
				code
					? 'Password Reset Success. Login with new password'
					: 'Check your email for the secret code',
			)
		} catch (error) {
			console.log('error: ', error.response)
			setToastMessage(error.response?.data)
			setTimeout(() => {
				setToastMessage('')
			}, 3100)
		}
		setIsLoading(false)
		setNewPassword(undefined)
		setCode(undefined)
		setEmail('')
	}
	const forgotPasswordForm = () => {
		return (
			<>
				{toastMessage && <AppToast message={toastMessage} />}
				<Form onSubmit={handleFormSubmit}>
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							value={email}
							onChange={({target: {value}}) => setEmail(value)}
						/>
					</Form.Group>
					<Spacer height='30px' />
					{success && (
						<>
							<Form.Group controlId='newPassword'>
								<Form.Label>Enter Your New Password</Form.Label>
								<Form.Control
									type='password'
									onChange={({target: {value}}) => setNewPassword(value)}
								/>
							</Form.Group>
							<Spacer height='30px' />
							<Form.Group controlId='code'>
								<Form.Label>Enter Your Code</Form.Label>
								<Form.Control
									type='text'
									onChange={({target: {value}}) => setCode(value)}
									autoComplete='off'
								/>
							</Form.Group>
							<Spacer height='30px' />
						</>
					)}
					{isLoading ? (
						<Loader />
					) : (
						<Button type='submit' variant='danger' disabled={!email}>
							{success ? 'Proceed To Reset' : 'Submit'}
						</Button>
					)}
				</Form>
				<Spacer height='20px' />
				<h6>
					Already Registered?{'  '}
					<Link href='/login'>Login</Link>
				</h6>
				<Spacer height='10px' />
				<h6>
					Want to create an account?{'  '}
					<Link href='/register'>Register</Link>
				</h6>
			</>
		)
	}
	return (
		<Container>
			<Spacer height={60} />
			<Row>
				<Col xs={12} md={6}>
					<h1>Forgot Password</h1>
					{forgotPasswordForm()}
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPassword
