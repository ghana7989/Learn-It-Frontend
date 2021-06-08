/** @format */
import {
	Container,
	Form,
	Row,
	Col,
	Button,
} from 'react-bootstrap'
import Spacer from 'react-spacer'
import Link from 'next/link'
import {useState} from 'react'
import axios from 'axios'
import AppToast from '../components/AppToast'

const Register = () => {
	const [email, setEmail] = useState(
		'test@gmail.com',
	)
	const [name, setName] = useState('Pavan')
	const [password, setPassword] =
		useState('123456')
	const [toastMessage, setToastMessage] =
		useState('')
	const handleFormSubmit = async e => {
		e.preventDefault()

		setToastMessage(
			`Registered successfully with ${email}`,
		)
		const {data} = await axios.post(
			'http://localhost:8000/api/register',
			{name, email, password},
		)
		console.log('data: ', data)
		setEmail('')
		setName('')
		setPassword('')
		setTimeout(() => {
			setToastMessage('')
		}, 3100)
	}
	const registerForm = () => {
		return (
			<>
				{toastMessage && (
					<AppToast message={toastMessage} />
				)}
				<Form onSubmit={handleFormSubmit}>
					<Form.Group controlId='name'>
						<Form.Label>Full Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Your Name'
							value={name}
							onChange={({target: {value}}) =>
								setName(value)
							}
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
							onChange={({target: {value}}) =>
								setEmail(value)
							}
						/>
						<Form.Text className='text-muted'>
							We'll never share your email with
							anyone else.
						</Form.Text>
					</Form.Group>
					<Spacer height='30px' />
					<Form.Group controlId='password'>
						<Form.Label>
							Enter Your Password
						</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter Your password'
							value={password}
							onChange={({target: {value}}) =>
								setPassword(value)
							}
						/>
					</Form.Group>
					<Spacer height='30px' />
					<Button type='submit' variant='primary'>
						Register
					</Button>
				</Form>
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
