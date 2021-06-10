/** @format */

import axios from 'axios'
import {useRouter} from 'next/router'
import {useReducer, createContext, useEffect} from 'react'

const initialState = {
	user: undefined,
}

// user reducer
export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {...state, user: action.payload}
		case 'LOGOUT':
			return {...state, user: undefined}
		default:
			return state
	}
}

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
	const [userState, dispatch] = useReducer(userReducer, initialState)
	const router = useRouter()
	useEffect(() => {
		dispatch({
			type: 'LOGIN',
			payload: JSON.parse(window.localStorage.getItem('user')),
		})
	}, [])

	axios.interceptors.response.use(
		response => {
			// any status code which lies in range of 2xx
			// This function is triggered
			return response
		},
		error => {
			// any status code which lies out range of 2xx
			// This function is triggered
			let res = error.response
			if (res.status === 401 && res.config && !res.config.__isRetry) {
				return new Promise((resolve, reject) => {
					axios
						.get('/api/logout')
						.then(data => {
							dispatch({type: 'LOGOUT'})
							window.localStorage.removeItem('user')
							router.push('/login')
							resolve(data)
						})
						.catch(err => {
							reject(err)
						})
				})
			}
			return Promise.reject(error)
		},
	)
	useEffect(() => {
		const getCsrfToken = async () => {
			const {data} = await axios.get('/api/csrf-token')

			axios.defaults.headers['X-CSRF-Token'] = data.csrfToken
		}
		getCsrfToken()
	}, [])
	return (
		<UserContext.Provider value={{userState, dispatch}}>
			{children}
		</UserContext.Provider>
	)
}
