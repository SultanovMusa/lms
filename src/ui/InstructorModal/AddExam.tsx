import { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import scss from './Styled.module.scss';
import { useCreateExamInstructorMutation } from '@/src/redux/api/instructor/examApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormData {
	title: string;
	examDate: string;
}

interface AddLessonProps {
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

const AddExam: FC<AddLessonProps> = ({ open, handleClose }) => {
	const { handleSubmit, reset, control } = useForm<FormData>();
	const { courseId } = useParams();
	const [createExamInstructor] = useCreateExamInstructorMutation();

	const course = Number(courseId);
	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const { title, examDate } = data;

		if (title !== '' && examDate !== '') {
			const examData = {
				title: title,
				examDate: examDate
			};
			try {
				await createExamInstructor({ examData, course });
				toast.success('Экзамен успешно добавлен');
				reset();
				handleClose();
			} catch (error) {
				toast.error('Ошибка при добавлении экзамена');
				console.error('Failed to add exam', error);
			}
		} else {
			toast.error('Заполните все поля');
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
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Название урока"
									/>
								)}
							/>
							<Controller
								name="examDate"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="date"
										width="100%"
										placeholder="Дата"
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
								gap: '10px'
							}}
						>
							<ButtonCancel
								type="button"
								onClick={handleClose}
								disabled={false}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="button"
								width="117px"
								disabled={false}
								onClick={handleSubmit(onSubmit)}
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

export default AddExam;
