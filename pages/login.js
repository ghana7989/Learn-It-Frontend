/** @format */

// ts-check
/** @format */
import {Container, Form, Row, Col, Button} from 'react-bootstrap'
import Spacer from 'react-spacer'
import Link from 'next/link'
import {useState} from 'react'
import axios from 'axios'
import AppToast from '../components/AppToast'
import Loader from '../components/Loader'

const Login = () => {
	const [email, setEmail] = useState('test@gmail.com')
	const [password, setPassword] = useState('123456')
	const [isLoading, setIsLoading] = useState(false)
	const [toastMessage, setToastMessage] = useState('')
	const handleFormSubmit = async e => {
		e.preventDefault()

		try {
			setIsLoading(true)
			const {data} = await axios.post(
				`/api/login`,
				{
					email,
					password,
				},
				{
					responseType: 'json',
					headers: {'Content-Type': 'application/json'},
				},
			)
			console.table(data)
		} catch (error) {
			setToastMessage(error.response.data)
			setTimeout(() => {
				setToastMessage('')
			}, 3100)
		}
		setIsLoading(false)
		setEmail('')
		setPassword('')
	}
	const loginForm = () => {
		return (
			<>
				{toastMessage && <AppToast message={toastMessage} />}
				<Form onSubmit={handleFormSubmit}>
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email address'
							value={email}
							onChange={({target: {value}}) => setEmail(value)}
						/>
					</Form.Group>
					<Spacer height='30px' />
					<Form.Group controlId='password'>
						<Form.Label>Enter Your Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter Your password'
							value={password}
							onChange={({target: {value}}) => setPassword(value)}
						/>
					</Form.Group>
					<Spacer height='30px' />
					{isLoading ? (
						<Loader />
					) : (
						<Button
							type='submit'
							variant='primary'
							disabled={!email || !password}>
							Login
						</Button>
					)}
				</Form>
				<Spacer height='20px' />
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
					<h1>Login</h1>
					{loginForm()}
				</Col>
			</Row>
		</Container>
	)
}

export default Login