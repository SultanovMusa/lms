import React, { FC, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import scss from './Login.module.scss';
import Logo from '@/src/assets/svgs/logo.svg';
import { IconClosed, IconOpen_Eye } from '@/src/assets/icons';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { useNavigate } from 'react-router-dom';
import MenLogo from '@/src/assets/svgs/boy-proger.svg';
import {
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput
} from '@mui/material';
import Input from '@/src/ui/customInput/Input';
import { usePostLoginMutation } from '@/src/redux/api/auth';
import ModalPassword from '@/src/ui/customModal/ModalPassword';

type FormData = {
	login: string;
	password: string;
};

type ResponseData = {
	id: number;
	token: string;
	email: string;
	role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
	httpStatus: string;
	message: string;
};

const Login: FC = () => {
	const [postLogin] = usePostLoginMutation();
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<FormData>();
	const [showPassword, setShowPassword] = useState(false);
	const [open, setOpen] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setIsLoading(true);
		try {
			const response = (await postLogin(data).unwrap()) as ResponseData;
			const { role, token } = response;
			localStorage.setItem('role', role);

			switch (role) {
				case 'STUDENT':
					localStorage.setItem('token', token);
					localStorage.setItem('isAuth', 'true');
					localStorage.setItem('isInstructor', 'false');
					localStorage.setItem('admin', 'false');

					navigate('/courses');
					break;
				case 'INSTRUCTOR':
					localStorage.setItem('token', token);
					localStorage.setItem('isAuth', 'false');
					localStorage.setItem('isInstructor', 'true');
					localStorage.setItem('isAdmin', 'false');
					navigate('/instructor/course');
					break;
				case 'ADMIN':
					localStorage.setItem('token', token);
					localStorage.setItem('isAuth', 'false');
					localStorage.setItem('isInstructor', 'false');
					localStorage.setItem('isAdmin', 'true');
					navigate('/admin/analytics');
					break;
				default:
					console.error('Unknown role:', role);
					break;
			}
			reset();
			setErrorMessage(null);
		} catch (error) {
			setErrorMessage('Логин или пароль не правильный');
			console.log('Login error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => event.preventDefault();

	return (
		<div className={scss.Login}>
			<div className={scss.content}>
				<div className={scss.LoginLogoBlue}>
					<div className={scss.Logos}>
						<img src={Logo} alt="#" />
						<img src={MenLogo} alt="#" />
					</div>
				</div>
				<div className={scss.LoginElementsWhite}>
					<div className={scss.LoginWhiteElements}>
						<h1 className={scss.WelcomeMedia}>Добро пожаловать:</h1>
						<h1 className={scss.PeakSoftMedia}>
							в <span className={scss.title_red}>PEAKSOFT LMS</span>!
						</h1>
						<form
							style={{ maxWidth: '540px', width: '100%', position: 'relative' }}
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className={scss.Parent_element_inputs}>
								<div className={scss.Element_inputs_login}>
									<p>Логин :</p>
									<Controller
										control={control}
										name="login"
										defaultValue=""
										rules={{
											required: 'Логин обязателен для заполнения'
										}}
										render={({ field }) => (
											<Input
												size="medium"
												width="100%"
												{...field}
												placeholder="Введите логин"
												type="text"
												error={!!errors.login}
											/>
										)}
									/>
									{errors.login && (
										<span
											style={{
												color: 'red',
												position: 'absolute',
												top: '165px',
												left: '20px'
											}}
										>
											{errors.login.message}
										</span>
									)}
								</div>
								<div className={scss.Element_inputs_password}>
									<InputLabel htmlFor="outlined-adornment-password">
										<p>Пароль : </p>
									</InputLabel>
									<Controller
										control={control}
										defaultValue=""
										name="password"
										rules={{
											required: 'Пароль обязателен для заполнения',
											minLength: {
												value: 5,
												message: 'Пароль должен содержать минимум 5 символов'
											}
										}}
										render={({ field }) => (
											<OutlinedInput
												className={scss.OutlinedInputEyes}
												{...field}
												placeholder="Введите пароль"
												id="outlined-adornment-password"
												type={showPassword ? 'text' : 'password'}
												endAdornment={
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
															edge="end"
														>
															{showPassword ? <IconOpen_Eye /> : <IconClosed />}
														</IconButton>
													</InputAdornment>
												}
												error={!!errors.password}
											/>
										)}
									/>
									{errors.password && (
										<span
											style={{
												color: 'red',
												position: 'absolute',
												top: '280px',
												left: '20px'
											}}
										>
											{errors.password.message}
										</span>
									)}
								</div>
							</div>
							{errorMessage && (
								<div className={scss.errorMessage}>{errorMessage}</div>
							)}
							<div className={scss.Link_Element}>
								<p onClick={handleOpen}>Забыли пароль?</p>
							</div>
							<div className={scss.Button_Element}>
								<ButtonSave
									type="submit"
									width="214px"
									disabled={isLoading}
									onClick={() => {}}
								>
									{isLoading ? 'Вход...' : 'Войти'}
								</ButtonSave>
								<ModalPassword open={open} handleClose={handleClose} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
