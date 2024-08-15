import { Button, Tooltip } from '@mui/material';
import scss from './StudentPresentation.module.scss';
import { useState } from 'react';
import ModalPresentation from '@/src/ui/InstructorModal/ModalPresentation';
import { useGetPresentationForStudentQuery } from '@/src/redux/api/students/presentationStudent';
import { useParams } from 'react-router-dom';
import empty from '@/src/assets/notCreated0.png';

const StudentPresentation = () => {
	const { lessonId } = useParams();
	const test = Number(lessonId);
	const { data } = useGetPresentationForStudentQuery(test);
	const [openPresentation, setOpenPresentation] = useState(false);
	const [presentationModal, setPresentationModal] = useState<null | number>(
		null
	);

	const openPresentationFunc = (id: number) => {
		setPresentationModal(id);
		setOpenPresentation(true);
	};

	const closePresentation = () => {
		setOpenPresentation(false);
	};

	return (
		<div className={scss.presentation}>
			<div className={scss.card}>
				{data?.length === 0 ? (
					<div className={scss.empty_page}>
						<img src={empty} alt="No presentations available" />
					</div>
				) : (
					data?.map((item) => (
						<div key={item.id} className={scss.content}>
							<div className={scss.cards}>
								<div className={scss.img}>
									<iframe
										style={{ height: '200px' }}
										className={scss.iframe}
										src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${item.file}`}
										frameBorder="0"
									></iframe>
									<div className={scss.button_watch}>
										<Button
											sx={{
												borderRadius: '8px',
												textTransform: 'capitalize',
												background: '#0000ff7f',
												'&:hover': {
													background: '#0000ffb2'
												}
											}}
											size="medium"
											variant="contained"
											onClick={() => openPresentationFunc(item.id)}
										>
											Смотреть
										</Button>
									</div>
								</div>
								<div className={scss.title}>
									<div className={scss.text}>
										<Tooltip title={item.title}>
											<h1
												style={{
													width: '100%',
													maxWidth: '250px',
													textOverflow: 'ellipsis',
													overflow: 'hidden',
													whiteSpace: 'nowrap'
												}}
											>
												{item.title}
											</h1>
										</Tooltip>

										<Tooltip title={item.description}>
											<p
												style={{
													width: '100%',
													maxWidth: '250px',
													textOverflow: 'ellipsis',
													overflow: 'hidden',
													whiteSpace: 'nowrap'
												}}
											>
												{item.description}
											</p>
										</Tooltip>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
			<ModalPresentation
				saveId={presentationModal}
				open={openPresentation}
				handleClose={closePresentation}
			/>
		</div>
	);
};

export default StudentPresentation;
