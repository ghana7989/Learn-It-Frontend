/** @format */

import axios from 'axios'
import {Jumbotron} from 'react-bootstrap'
import InstructorProtect from '../../../components/HOC/InstructorProtect'

const CreateCourse = () => {
	return (
		<InstructorProtect>
			<Jumbotron
				className='text-center text-light bg-dark'
				style={{
					height: '10vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}>
				<h1>CreateCourse</h1>
			</Jumbotron>
		</InstructorProtect>
	)
}

export default CreateCourse
