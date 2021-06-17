/** @format */

import {useContext, useEffect, useLayoutEffect} from 'react'
import Protect from '../../components/HOC/Protect'
import {UserContext} from '../../context/UserContext'
import axios from 'axios'

const StripeCallback = () => {
	const {
		userState: {user},
		dispatch,
	} = useContext(UserContext)
	useEffect(() => {
		if (user) {
			axios.get('/api/get-account-status').then(res => {
				window.location.reload()
			})
		}
	}, [])
	return (
		<div
			style={{
				height: '100vh',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h1>You will be logged out, need to login again</h1>
		</div>
	)
}

export default StripeCallback
