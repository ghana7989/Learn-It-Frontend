import {Fragment} from 'react'
import {Badge, Col, Container, ListGroup, Row} from 'react-bootstrap'
import Spacer from 'react-spacer'
import {Player} from 'video-react'

const SingleCourseLessons = ({lessons}) => {
	return (
		<Container>
			<Row>
				<Col>
					<h1 className='mb-3'>There are Total {lessons?.length} lessons</h1>
					<hr />
					<ListGroup>
						{lessons?.map((lesson, index) => (
							<ListGroup.Item
								key={lesson.id}
								draggable
								onDragStart={e => handleOnDragStart(e, index)}
								onDrop={e => handleOnDrop(e, index)}
								className='d-flex align-items-center justify-content-between'
							>
								<div className='d-flex w-100 align-items-center'>
									<Badge className='bg-primary '>
										<h3>{index + 1}</h3>
									</Badge>
									<Spacer width='20px' />
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'flex-start',
											width: '100%',
											gap: '20%',
										}}
									>
										<h3 style={{alignSelf: 'center'}}>{lesson.title}</h3>
										<div>
											{lesson.free_preview && (
												<div
													style={{
														display: 'flex',
														width: '300px',
														alignItems: 'center',
														gap: '20px',
													}}
												>
													<h3>Free Preview</h3>
													<Player>
														<source src={lessons[4]?.video?.Location} />
													</Player>
												</div>
											)}
										</div>
									</div>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>
			</Row>
			<Spacer height='50px' />
		</Container>
	)
}

export default SingleCourseLessons
