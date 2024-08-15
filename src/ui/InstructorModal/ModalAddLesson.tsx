import { FC, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { usePostMaterialsMutation } from '@/src/redux/api/instructor/materials';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import scss from './Styled.module.scss';

interface FormData {
	title: string;
	date: string;
}

interface AddLessonProps {
	handleOpen: (value: boolean) => void;
	open: boolean;
	handleClose: () => void;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalAddLesson: FC<AddLessonProps> = ({ open, handleClose }) => {
	const {
		handleSubmit,
		reset,
		control,
		formState: { dirtyFields, errors },
		clearErrors
	} = useForm<FormData>();
	const [postMaterials] = usePostMaterialsMutation();
	const { courseId } = useParams();
	const course = Number(courseId);

	const [loading, setLoading] = useState(false);
	const [dateError, setDateError] = useState<string | null | boolean>(null);

	const isButtonDisabled = !(dirtyFields.title && dirtyFields.date) || loading;

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setLoading(true);
		const { title, date } = data;
		if (title !== '' && date !== '') {
			const postData = {
				title: title,
				createdAt: date
			};
			try {
				await postMaterials({ postData, course });
				reset();
				handleClose();
				message.success('Урок успешно добавлен');
			} catch (error) {
				console.error(error);
				message.error('Ошибка при добавлении урока');
			} finally {
				setLoading(false);
			}
		}
	};

	const validateDate = (value: string) => {
		const selectedDate = new Date(value);
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		if (selectedDate < currentDate) {
			setDateError(true);
			message.error('Нужно выбрать будущую дату');
			return 'Вы не можете выбрать прошедшую дату';
		} else {
			setDateError(null);
			clearErrors('date');
			return true;
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.ModalMain}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.com_text}>Добавить урок</p>
					</Typography>

					<Typography className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								defaultValue=""
								rules={{ required: 'Название урока обязательно' }}
								render={({ field }) => (
									<>
										<Input
											size="medium"
											{...field}
											type="text"
											width="100%"
											placeholder="Название урока"
										/>
										{errors.title && (
											<span style={{ color: 'red' }}>
												{errors.title.message}
											</span>
										)}
									</>
								)}
							/>
							<Controller
								name="date"
								control={control}
								defaultValue=""
								rules={{ validate: validateDate }}
								render={({ field }) => (
									<>
										<Input
											size="medium"
											{...field}
											type="date"
											width="100%"
											placeholder="Дата"
											error={!!dateError}
										/>
										{dateError && (
											<span style={{ color: 'red' }}>{dateError}</span>
										)}
									</>
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
								gap: '10px'
							}}
						>
							<ButtonCancel
								type="button"
								onClick={handleClose}
								disabled={loading}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								type="submit"
								width="117px"
								disabled={isButtonDisabled}
							>
								Создать
							</ButtonSave>
						</div>
					</Typography>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalAddLesson;
