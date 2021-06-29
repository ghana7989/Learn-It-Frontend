import {Fragment} from 'react'
import {Button, Col, Container, Row} from 'react-bootstrap'
import Spacer from 'react-spacer'
import Player from 'video-react/lib/components/Player'

const SingleCourseSection = ({course}) => {
	const {
		name,
		description,
		instructor,
		updatedAt,
		lessons,
		image: {Location: imageUrl},
		price,
		paid,
		category,
	} = course
	return (
		<Container className='p-5'>
			<Row>
				<Col md={8}>
					<h1 className='text-light font-weight-bold'>{name}</h1>
					<h3>{description && description.substring(0, 200)}...</h3>
					<h5 className='text-light'>{category}</h5>
					<p>Created By {instructor.name}</p>
					<p>Last Updated {new Date(updatedAt).toLocaleDateString()}</p>
					<h2 className='text-light'>{paid ? `$ ${price}` : 'Free'}</h2>
				</Col>
				<Col
					md={4}
					className='d-flex justify-content-center align-items-center'
					style={{flexDirection: 'column'}}
				>
					{lessons[0]?.video && lessons[0].video?.Location ? (
						<Fragment>
							<Player autoplay fluid volume={1}>
								<source src={lessons[4]?.video?.Location} />
							</Player>
							<Spacer height='30px' />
						</Fragment>
					) : (
						<Fragment>
							<img src={imageUrl} alt={name} className='img img-fluid' />
						</Fragment>
					)}
					<Button className=' btn-lg'>Enroll Now</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default SingleCourseSection
