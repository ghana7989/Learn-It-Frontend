/** @format */

import {useContext, useState} from 'react'
import {AiOutlineMail, AiOutlineLogin} from 'react-icons/ai'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import Link from 'next/link'
import {UserContext} from '../../context/UserContext'
import axios from 'axios'
import {useRouter} from 'next/router'
import Spacer from 'react-spacer'

const Header = () => {
	const [current, setCurrent] = useState('')
	const {userState, dispatch} = useContext(UserContext)
	const router = useRouter()
	const handleOnSelect = e => {
		setCurrent(e.target.id)
	}
	const handleLogOutClick = async () => {
		dispatch({type: 'LOGOUT'})
		window.localStorage.removeItem('user')
		await axios.get('/api/logout')
		router.push('/login')
	}
	return (
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
					}}>
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
								id='collasible-nav-dropdown'>
								<NavDropdown.Item>
									<Link href='/user' passHref>
										<Nav.Link>Profile</Nav.Link>
									</Link>
								</NavDropdown.Item>
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
	)
}

export default Header
