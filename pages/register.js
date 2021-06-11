/** @format */
import {Container, Form, Row, Col, Button} from 'react-bootstrap'
import Spacer from 'react-spacer'
import Link from 'next/link'
import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import AppToast from '../components/AppToast'
import Loader from '../components/Loader'
import {useRouter} from 'next/router'
import {UserContext} from '../context/UserContext'

const Register = () => {
	const [email, setEmail] = useState('puritmp+gzjxm@gmail.com')
	const [name, setName] = useState('Test')
	const [password, setPassword] = useState('123456')
	const [isLoading, setIsLoading] = useState(false)
	const [toastMessage, setToastMessage] = useState('')
	const {userState, _} = useContext(UserContext)
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
				`/api/register`,
				{
					name,
					email,
					password,
				},
				{
					responseType: 'json',
					headers: {'Content-Type': 'application/json'},
				},
			)
			setToastMessage(`Registered successfully with ${email}`)
		} catch (error) {
			console.log('error: ', error.response.data)
			setToastMessage(error.response.data)
		}
		setIsLoading(false)
		setEmail('')
		setName('')
		setPassword('')
		setTimeout(() => {
			setToastMessage('')
			router.push('/login')
		}, 3100)
	}

	const registerForm = () => {
		return (
			<>
				{toastMessage && <AppToast message={toastMessage} />}
				<Form onSubmit={handleFormSubmit}>
					<Form.Group controlId='name'>
						<Form.Label>Full Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Your Name'
							value={name}
							onChange={({target: {value}}) => setName(value)}
							autoFocus
						/>
					</Form.Group>
					<Spacer height='30px' />

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email address'
							value={email}
							onChange={({target: {value}}) => setEmail(value)}
						/>
						<Form.Text className='text-muted'>
							We'll never share your email with anyone else.
						</Form.Text>
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
							disabled={!name || !email || !password}>
							Register
						</Button>
					)}
				</Form>
				<Spacer height='20px' />
				<h6>
					Already Registered?{'  '}
					<Link href='/login'>Login</Link>
				</h6>
			</>
		)
	}
	return (
		<Container>
			<Spacer height={60} />
			<Row>
				<Col xs={12} md={6}>
					<h1>Register</h1>
					{registerForm()}
				</Col>
			</Row>
		</Container>
	)
}

export default Register
