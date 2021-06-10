/** @format */

import Header from '../components/nav/Header'
import {UserContextProvider} from '../context/UserContext'
import '../public/bootstrap.min.css'
import '../public/styles.css'

//

function MyApp({Component, pageProps}) {
	return (
		<>
			<UserContextProvider>
				<Header />
				<Component {...pageProps} />
			</UserContextProvider>
		</>
	)
}

export default MyApp
