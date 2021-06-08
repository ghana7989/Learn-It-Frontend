/** @format */

import Header from '../components/nav/Header'
import '../public/bootstrap.min.css'

function MyApp({Component, pageProps}) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
