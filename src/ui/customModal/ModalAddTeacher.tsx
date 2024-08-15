/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { message } from 'antd';
import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './Style.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import { usePostTeacherMutation } from '@/src/redux/api/admin/teacher';
import Input from '../customInput/Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IFormInputs {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	specialization: string;
}

interface TeacherAddProps {
	open: boolean;
	handleClose: () => void;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	backgroundColor: '#fff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalAddTeacher: FC<TeacherAddProps> = ({ open, handleClose }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { dirtyFields, errors }
	} = useForm<IFormInputs>();
	const [postTeacher] = usePostTeacherMutation();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isButtonDisabled =
		!dirtyFields.firstName ||
		!dirtyFields.lastName ||
		!dirtyFields.email ||
		!dirtyFields.phoneNumber ||
		!dirtyFields.specialization;

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		setIsSubmitting(true);

		try {
			const response = await postTeacher({
				...data,
				linkForPassword: 'https://lms-js12-topaz.vercel.app/auth/newPassword'
			}).unwrap();

			if (response) {
				message.success('Учитель успешно добавлен!');
				handleClose();
				reset();
			} else {
				throw new Error('Unexpected response');
			}
		} catch (error) {
			message.error('Ошибка при добавлении учителя');
			console.error('Error:', error);
		} finally {
			setIsSubmitting(false);
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
				<Box sx={style} className={scss.main_modal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.comText}>Добавить учителя</p>
					</Typography>
					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
								defaultValue=""
								rules={{ required: 'Имя обязательно для заполнения' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Имя"
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								defaultValue=""
								rules={{ required: 'Фамилия обязательна для заполнения' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Фамилия"
									/>
								)}
							/>
							<Controller
								name="phoneNumber"
								control={control}
								defaultValue=""
								rules={{
									required: 'Номер обязателен для заполнения',
									pattern: {
										value: /^\+[0-9]+$/,
										message: 'Номер телефона должен содержать символ "+"'
									}
								}}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="string"
										width="100%"
										placeholder="Номер телефона"
										error={!!errors.phoneNumber}
									/>
								)}
							/>
							{errors.phoneNumber && message.error(errors.phoneNumber.message)}
							<Controller
								name="email"
								control={control}
								defaultValue=""
								rules={{
									required: 'Email обязателен для заполнения',
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
										message: 'Введите корректный email'
									}
								}}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="email"
										width="100%"
										placeholder="Email"
										error={!!errors.email}
									/>
								)}
							/>
							{errors.email && message.error(errors.email.message)}
							<Controller
								name="specialization"
								control={control}
								defaultValue=""
								rules={{ required: 'Специализация обязательна для заполнения' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="string"
										width="100%"
										placeholder="Специализация"
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
								disabled={false}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								width="117px"
								type="submit"
								disabled={isButtonDisabled || isSubmitting}
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

export default ModalAddTeacher;
