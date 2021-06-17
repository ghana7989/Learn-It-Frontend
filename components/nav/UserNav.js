/** @format */

import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Nav} from 'react-bootstrap'

const UserNav = () => {
	const [currentPath, setCurrentPath] = useState('')
	useEffect(() => {
		console.log('window.location.pathname: ', window.location.pathname)
		process.browser && setCurrentPath(window.location.pathname)
	})
	return (
		<Nav
			fluid='true'
			variant='pills'
			className='justify-content-center flex-column mt-3'
		>
			<Link href='/user' passHref>
				<Nav.Link eventKey='user-link' active={currentPath === '/user'}>
					<h4>Dashboard</h4>
				</Nav.Link>
			</Link>
		</Nav>
	)
}

export default UserNav
