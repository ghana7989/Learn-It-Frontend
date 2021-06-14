/** @format */

import Link from 'next/link'
import {Nav} from 'react-bootstrap'

const UserNav = () => {
	return (
		<Nav
			fluid
			variant='pills'
			className='justify-content-center flex-column mt-3'
			defaultActiveKey='user-link'>
			<Link href='/user' passHref>
				<Nav.Link eventKey='user-link'>Dashboard</Nav.Link>
			</Link>
		</Nav>
	)
}

export default UserNav
