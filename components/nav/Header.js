/** @format */

import {useState} from 'react'
import {
	AiOutlineMail,
	AiOutlineLogin,
} from 'react-icons/ai'
import {
	Navbar,
	Container,
	Nav,
	NavDropdown,
} from 'react-bootstrap'
import Link from 'next/link'

const Header = () => {
	const [current, setCurrent] = useState('')

	const handleOnSelect = e => {
		console.log('e: ', e)
	}
	return (
		<Navbar
			collapseOnSelect
			onSelect={handleOnSelect}
			expand='lg'
			bg='dark'
			variant='dark'>
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
					<Nav>
						<Link href='/login' passHref>
							<Nav.Link>
								Login <AiOutlineLogin size={20} />
							</Nav.Link>
						</Link>
						<Link href='/register' passHref>
							<Nav.Link>
								Register{' '}
								<AiOutlineMail size={20} />
							</Nav.Link>
						</Link>
						<NavDropdown
							title='Username'
							id='collasible-nav-dropdown'>
							<NavDropdown.Item>
								Action
							</NavDropdown.Item>
							<NavDropdown.Item>
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item>
								Something
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item color='danger'>
								Log Out
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header
