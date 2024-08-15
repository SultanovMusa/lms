/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { Box, Typography } from '@mui/material';
import { usePostProcentsMutation } from '@/src/redux/api/instructor/rating';
import Input from '../../customInput/Input';
import scss from './RatingModal.module.scss';

interface IFormInputs {
	taskPercentage: number;
	testPercentage: number;
	examPercentage: number;
}

interface TeacherAddProps {
	open: boolean;
	handleClose: () => void;
	saveId: number | null;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	backgroundColor: '#fff',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const RatingModal: FC<TeacherAddProps> = ({ open, handleClose, saveId }) => {
	const { control, handleSubmit, reset } = useForm<IFormInputs>({
		defaultValues: {
			taskPercentage: 0,
			testPercentage: 0,
			examPercentage: 0
		}
	});
	const [postTeacher] = usePostProcentsMutation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [inputValues, setInputValues] = useState<IFormInputs>({
		taskPercentage: 0,
		testPercentage: 0,
		examPercentage: 0
	});

	const handleInputChange = (name: keyof IFormInputs, value: number) => {
		setInputValues((prevValues) => ({
			...prevValues,
			[name]: value
		}));
	};

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		setIsSubmitting(true);
		const newData = {
			taskPercentage: data.taskPercentage,
			testPercentage: data.testPercentage,
			examPercentage: data.examPercentage
		};

		try {
			await postTeacher({ newData, saveId });
			handleClose();
			reset();
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (open) {
			reset({
				taskPercentage: 0,
				testPercentage: 0,
				examPercentage: 0
			});
			setInputValues({
				taskPercentage: 0,
				testPercentage: 0,
				examPercentage: 0
			});
		}
	}, [open, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.main_modal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.comText}>Распределение рейтинга</p>
					</Typography>
					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="taskPercentage"
								control={control}
								rules={{ required: 'Задания % обязателен для заполнения' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="number"
										width="100%"
										placeholder="Задания %"
										value={
											inputValues.taskPercentage === 0
												? ''
												: String(inputValues.taskPercentage)
										}
										onChange={(e) => {
											field.onChange(e);
											handleInputChange(
												'taskPercentage',
												Number(e.target.value)
											);
										}}
									/>
								)}
							/>
							<Controller
								name="testPercentage"
								control={control}
								rules={{ required: 'Тесты % обязателен для заполнения' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="number"
										width="100%"
										placeholder="Тесты %"
										value={
											inputValues.testPercentage === 0
												? ''
												: String(inputValues.testPercentage)
										}
										onChange={(e) => {
											field.onChange(e);
											handleInputChange(
												'testPercentage',
												Number(e.target.value)
											);
										}}
									/>
								)}
							/>
							<Controller
								name="examPercentage"
								control={control}
								rules={{ required: 'Экзамены % обязателен для заполнения' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="number"
										width="100%"
										placeholder="Экзамены %"
										value={
											inputValues.examPercentage === 0
												? ''
												: String(inputValues.examPercentage)
										}
										onChange={(e) => {
											field.onChange(e);
											handleInputChange(
												'examPercentage',
												Number(e.target.value)
											);
										}}
									/>
								)}
							/>
						</div>
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								paddingBottom: '10px',
								paddingTop: '13px',
								gap: '10px',
								paddingRight: '14px'
							}}
						>
							<ButtonCancel
								type="button"
								disabled={isSubmitting}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								width="117px"
								type="submit"
								disabled={
									isSubmitting ||
									inputValues.taskPercentage === 0 ||
									inputValues.testPercentage === 0 ||
									inputValues.examPercentage === 0
								}
								onClick={handleSubmit(onSubmit)}
							>
								Отправить
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default RatingModal;
