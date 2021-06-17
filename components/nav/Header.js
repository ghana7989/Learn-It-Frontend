/** @format */

import {useContext, useState} from 'react'
import {
	AiOutlineMail,
	AiOutlineLogin,
	AiOutlineCarryOut,
	AiOutlineTeam,
} from 'react-icons/ai'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import Link from 'next/link'
import {UserContext} from '../../context/UserContext'
import axios from 'axios'
import {useRouter} from 'next/router'

const Header = () => {
	const [current, setCurrent] = useState('')
	const {userState, dispatch} = useContext(UserContext)
	const router = useRouter()
	const handleOnSelect = e => {
		setCurrent(e.target.id)
	}
	const isInstructor = userState?.user?.role.includes('Instructor')
	const handleLogOutClick = async () => {
		dispatch({type: 'LOGOUT'})
		window.localStorage.removeItem('user')
		await axios.get('/api/logout')
		router.push('/login')
	}
	return (
		<>
			<link
				rel='apple-touch-icon'
				sizes='180x180'
				href='/apple-touch-icon.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='32x32'
				href='/favicon-32x32.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='16x16'
				href='/favicon-16x16.png'
			/>
			<link rel='manifest' href='/site.webmanifest' />
			<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
				<Container>
					<Link href='/' passHref>
						<Navbar.Brand>
							{/* <img
							src={logo}
							width='32'
							height='32'
							className='d-inline-block align-top'
							alt='logo'
						/>{' '} */}
							Learn It
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />

					<Navbar.Collapse
						id='responsive-navbar-nav'
						style={{
							justifyContent: 'flex-end',
						}}
					>
						{userState?.user && (
							<Nav>
								{isInstructor ? (
									<Link href='/instructor/course/create' passHref>
										<Nav.Link>
											Create Course <AiOutlineCarryOut size={20} />
										</Nav.Link>
									</Link>
								) : (
									<Link href='/user/become-instructor' passHref>
										<Nav.Link>
											Become an Instructor <AiOutlineTeam size={20} />
										</Nav.Link>
									</Link>
								)}
							</Nav>
						)}

						<Nav onClick={handleOnSelect}>
							{!userState.user ? (
								<>
									<Link href='/login' passHref>
										<Nav.Link id='login'>
											Login <AiOutlineLogin size={20} />
										</Nav.Link>
									</Link>
									<Link href='/register' passHref>
										<Nav.Link id='register'>
											Register <AiOutlineMail size={20} />
										</Nav.Link>
									</Link>
								</>
							) : (
								<NavDropdown
									title={userState.user.name}
									id='collasible-nav-dropdown'
								>
									<NavDropdown.Item>
										<Link href='/user' passHref>
											<Nav.Link as='h6'>Profile</Nav.Link>
										</Link>
									</NavDropdown.Item>

									{isInstructor && (
										<NavDropdown.Item>
											<Link href='/instructor' passHref>
												<Nav.Link as='h6'>Instructor Dashboard</Nav.Link>
											</Link>
										</NavDropdown.Item>
									)}
									<NavDropdown.Divider />
									<NavDropdown.Item color='danger' onClick={handleLogOutClick}>
										Log Out
									</NavDropdown.Item>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header
