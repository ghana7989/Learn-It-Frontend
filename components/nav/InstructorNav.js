/** @format */

import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Nav} from 'react-bootstrap'

const InstructorNav = () => {
	const [currentPath, setCurrentPath] = useState('')
	useEffect(() => {
		process.browser && setCurrentPath(window.location.pathname)
	})
	return (
		<Nav
			fluid='true'
			variant='pills'
			className='justify-content-center flex-column mt-3'
		>
			<Link href='/instructor' passHref>
				<Nav.Link
					active={currentPath === '/instructor'}
					eventKey='instructor-link'
				>
					<h4>Dashboard</h4>
				</Nav.Link>
			</Link>
			<Link href='/instructor/course/create' passHref>
				<Nav.Link
					eventKey='create-course'
					active={currentPath === '/instructor/course/create'}
				>
					<h4>Create Course</h4>
				</Nav.Link>
			</Link>
		</Nav>
	)
}

export default InstructorNav
