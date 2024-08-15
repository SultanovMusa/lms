import scss from './ModalPassword.module.scss';
import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import { useForgotPasswordMutation } from '@/src/redux/api/auth';
import { notification } from 'antd';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 290,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

interface ModalPasswordProps {
	open: boolean;
	handleClose: () => void;
}

interface FormData {
	email: string;
}

const ModalPassword: FC<ModalPasswordProps> = ({ open, handleClose }) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>();

	const [forgotPasswordMutation] = useForgotPasswordMutation();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setIsLoading(true);
		const { email } = data;
		const newData = {
			email,
			link: 'https://lms-js12-topaz.vercel.app/auth/newPassword'
		};
		try {
			await forgotPasswordMutation(newData).unwrap();
			reset();
			handleClose();
			notification.success({
				message: 'Успешно',
				description: 'Ссылка была успешно отправлена.'
			});
		} catch (error) {
			notification.error({
				message: 'Ошибка',
				description:
					'Произошла ошибка при отправке ссылки. Пожалуйста, попробуйте еще раз.'
			});
		} finally {
			setIsLoading(false);
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
				<Box sx={style} className={scss.MainModal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.comText}>Забыли пароль?</p>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<p className={scss.textarea}>
							Вам будет отправлена ссылка для сброса пароля
						</p>

						<div className={scss.input}>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								rules={{
									required: 'Email обязателен для заполнения',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Введите действительный email адрес'
									}
								}}
								render={({ field }) => (
									<>
										<Input
											size="medium"
											{...field}
											type="text"
											value={inputValue}
											width="100%"
											placeholder="Введите ваш email"
											onChange={(e) => {
												field.onChange(e);
												handleInputChange(e);
											}}
										/>
										{errors.email && (
											<span style={{ color: 'red' }}>
												{errors.email.message}
											</span>
										)}
									</>
								)}
							/>
						</div>
						<div className={scss.buttonAdd}>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								type="submit"
								width="100%"
								disabled={isLoading || !inputValue}
							>
								{isLoading ? 'Загрузка...' : 'Отправить'}
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalPassword;
