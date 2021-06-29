import {Card} from 'react-bootstrap'
import Link from 'next/link'
import Spacer from 'react-spacer'

const CourseCard = ({course}) => {
	const {
		image: {Location: imageUrl},
		name,
		lessons,
		description,
		slug,
		category,
		paid,
		price,
	} = course
	return (
		<Card className='h-100'>
			<Card.Img
				style={{
					width: '100%',
					height: '12vw',
					objectFit: 'cover',
				}}
				variant='top'
				src={imageUrl || '/course.png'}
			/>
			<Card.Body>
				<Link href={`/course/${slug}`} passHref>
					<Card.Title
						style={{
							cursor: 'pointer',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
						className='text-light'
						as='h2'
					>
						{name}
					</Card.Title>
				</Link>
				<Spacer height={5} />
				<Card.Subtitle>{category}</Card.Subtitle>
				<Spacer height={10} />
				<Card.Subtitle>{lessons.length} Lessons</Card.Subtitle>
				<Spacer height={10} />
				<Card.Text>
					{/* <ReactMarkdown> */}
					{description.slice(0, 70) + '...'}
					{/* </ReactMarkdown> */}
				</Card.Text>
				<Spacer height={5} />
				<h2 className='text-light'>${paid ? price : 'Free'}</h2>
			</Card.Body>
		</Card>
	)
}

export default CourseCard
