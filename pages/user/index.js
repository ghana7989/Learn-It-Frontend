/** @format */

import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {Container, Jumbotron} from 'react-bootstrap'
import {UserContext} from '../../context/UserContext'
import Protect from '../../components/HOC/Protect'

const UserIndex = () => {
	const {userState} = useContext(UserContext)

	return (
		<Protect>
			<Jumbotron
				className='text-center text-light bg-dark'
				style={{
					height: '10vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
				}}>
				<Container fluid='true'>
					<h1>{userState?.user?.name}</h1>
				</Container>
			</Jumbotron>
		</Protect>
	)
}

export default UserIndex
