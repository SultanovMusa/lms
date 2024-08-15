import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import scss from './TestModal.module.scss';
import { FormControlLabel, Radio, Tooltip } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import { useGetResultTestOfStudentQuery } from '@/src/redux/api/instructor/resultTest';
import Checkbox from '@mui/material/Checkbox';
import notCreated from '@/src/assets/notCreated0.png';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	backgroundColor: '#fff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};
interface modalProps {
	openModal: boolean;
	handleClose: (openModalEdit: boolean) => void;
	saveId: number | boolean;
}
const TestModal: React.FC<modalProps> = ({
	openModal,
	handleClose,
	saveId
}) => {
	const { data } = useGetResultTestOfStudentQuery(saveId);

	return (
		<form onSubmit={close} className={scss.form}>
			<Modal
				open={openModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				onClose={handleClose}
			>
				<Box sx={style} className={scss.main_modal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<div className={scss.comText}>Резултаты тестирования</div>
					</Typography>

					<Box className={scss.input_button_card}>
						{saveId === 0 ? (
							<>
								<img src={notCreated} alt="" />
								<h1 style={{ fontSize: '22px', fontWeight: '600' }}>
									Тест ещё не пройден!
								</h1>
							</>
						) : (
							<>
								<div style={{ height: '560px', width: '100%' }}>
									{data?.answerQuestionResponses?.map((question) => (
										<div className={scss.Main_div}>
											<div key={question.questionId} className={scss.question}>
												<>
													<Tooltip title={question.questionTitle}>
														<p
															style={{
																fontSize: '16px',
																fontWeight: '600',
																marginTop: '15px',
																width: '100%',
																maxWidth: '500px',
																textOverflow: 'ellipsis',
																overflow: 'hidden',
																whiteSpace: 'nowrap'
															}}
														>
															{question.questionTitle}
														</p>
													</Tooltip>
												</>
												{question.answerOptionResponses.map((option) => (
													<div key={option.optionId} className={scss.option}>
														{question.answerOptionResponses.filter(
															(opt) => opt.true
														).length == 1 ? (
															<>
																<FormControlLabel
																	value={option.option}
																	control={
																		<Radio
																			checked={
																				option.true || option.yourChoice !== 3
																			}
																			className={
																				option.true ? scss.correct_checkbox : ''
																			}
																			style={{
																				color:
																					option.yourChoice === 1 &&
																					option.true === true
																						? blue[500]
																						: option.yourChoice === 3 &&
																							  option.true === true
																							? green[500]
																							: option.yourChoice === 2 &&
																								  !option.true
																								? red[500]
																								: ''
																			}}
																		/>
																	}
																	label={option.option}
																/>
															</>
														) : (
															<div className={scss.div_checkbox}>
																<Checkbox
																	checked={
																		option.true || option.yourChoice !== 3
																	}
																	className={
																		option.true ? scss.correct_checkbox : ''
																	}
																	style={{
																		color:
																			option.yourChoice === 1 &&
																			option.true === true
																				? blue[500]
																				: option.yourChoice === 3 &&
																					  option.true === true
																					? green[500]
																					: option.yourChoice === 2 &&
																						  !option.true
																						? red[500]
																						: ''
																	}}
																/>
																a<label>{option.option}</label>
															</div>
														)}
													</div>
												))}
												<hr className={scss.getTest_hr} />
											</div>
										</div>
									))}
								</div>
							</>
						)}
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default TestModal;
