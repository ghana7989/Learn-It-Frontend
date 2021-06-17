import {useState, useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import InstructorProtect from '../../../../components/HOC/InstructorProtect'

const CourseView = () => {
	const router = useRouter()
	const slug = router.query.slug

	const [course, setCourse] = useState(null)
	useEffect(() => {
		;(async function () {
			const {data} = await axios.get(`/api/course/${slug}`)
			console.log(data)
			setCourse(data)
		})()
	}, [slug])
	return (
		<>
			<InstructorProtect>
				<div className='container-fluid pt-3'>
					<h1>{slug}</h1>
				</div>
			</InstructorProtect>
		</>
	)
}

export default CourseView
