/** @format */

import axios from 'axios'
import {useEffect, useState} from 'react'
import Loader from '../Loader'

const Protect = ({children}) => {
	const [isHidden, setIsHidden] = useState(true)
	useEffect(() => {
		const fetchUser = async () => {
			try {
				await axios.get('/api/current-user')
				setIsHidden(false)
			} catch (e) {
				console.error(e)
				setIsHidden(true)
			}
		}
		fetchUser()
	}, [])

	if (isHidden)
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
					width: '100%',
					flex: 1,
				}}>
				<Loader />
			</div>
		)
	return <>{children}</>
}

export default Protect
