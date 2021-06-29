import axios from 'axios'
import {Fragment, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Col, Container, Jumbotron, Row} from 'react-bootstrap'
import Player from 'video-react/lib/components/Player'
import Spacer from 'react-spacer'
import SingleCourseSection from '../../components/cards/SingleCourseSection'
import SingleCourseLessons from '../../components/cards/SingleCourseLessons'

export async function getServerSideProps({query}) {
	const {data} = await axios.get(`${process.env.API}/course/${query.slug}`)
	return {
		props: {
			course: data,
		},
	}
}

const SingleCourse = ({course}) => {
	const router = useRouter()
	const {slug} = router.query

	return (
		<Fragment key={slug}>
			<SingleCourseSection course={course} />
			{course.lessons.length && (
				<SingleCourseLessons lessons={course.lessons} />
			)}
		</Fragment>
	)
}

export default SingleCourse
