/** @format */

import axios from 'axios'
import {Jumbotron} from 'react-bootstrap'

const CreateCourse = () => {
	return (
		<>
			<Jumbotron
				className='text-center text-light bg-dark'
				style={{
					height: '40vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}>
				<h1>CreateCourse</h1>
			</Jumbotron>
		</>
	)
}

export default CreateCourse
