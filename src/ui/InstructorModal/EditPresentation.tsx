/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useRef, useState, useEffect } from 'react';
import scss from './Styled.module.scss';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import {
	useCreatePresentationFileMutation,
	useEditPresentationMutation,
	useGetPresentationQuery
} from '@/src/redux/api/instructor/presentation';
import { useParams } from 'react-router-dom';
import { message } from 'antd'; // Import message component from Ant Design

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 357,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

interface EditPresentationProps {
	open: boolean;
	handleClose: () => void;
	presentationId: number | null;
}

interface EditPresentationForm {
	title: string;
	description: string;
	file: string | null;
}

const EditPresentation: FC<EditPresentationProps> = ({
	open,
	handleClose,
	presentationId
}) => {
	const { control, handleSubmit, reset, formState } =
		useForm<EditPresentationForm>({
			mode: 'onChange'
		});
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { lessonId } = useParams();
	const test = Number(lessonId);
	const { data } = useGetPresentationQuery(test);
	const [editPresentation] = useEditPresentationMutation();
	const [createPresentationFile] = useCreatePresentationFileMutation();
	const [isFormChanged, setIsFormChanged] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const onSubmit: SubmitHandler<EditPresentationForm> = async (formData) => {
		if (presentationId !== null) {
			if (isTitleDuplicate(formData.title)) {
				setErrorMessage('Название уже существует');
				return;
			}

			const presentationData = {
				title: formData.title,
				description: formData.description,
				file: selectedFile
			};
			try {
				const response = await editPresentation({
					newPresentation: presentationData,
					presentationId
				}).unwrap();
				console.log(response);

				message.success('Данные успешно изменены');
				reset();
				handleClose();
			} catch (error: any) {
				if (error.status === 409) {
					message.error('Что то пошло не так!');
				} else {
					message.error('Произошла ошибка. Попробуйте снова.');
				}
				console.error('Failed to edit presentation:', error);
			}
		}
	};

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const formData = new FormData();
			formData.append('file', file);
			try {
				const response: any = await createPresentationFile(formData as any);
				const test = JSON.parse(response.data);
				setSelectedFile(test.fileName as any);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const openFilePicker = () => {
		fileInputRef.current?.click();
	};

	const isTitleDuplicate = (title: string) => {
		return data?.some(
			(presentation) =>
				presentation.title === title && presentation.id !== presentationId
		);
	};

	useEffect(() => {
		if (data && presentationId !== null) {
			const finder = data.find((item) => item.id === presentationId);
			if (finder) {
				reset({
					title: finder.title,
					description: finder.description,
					file: finder.file
				});
				setSelectedFile(finder.file);
			}
		}
	}, [data, presentationId, reset]);

	useEffect(() => {
		setIsFormChanged(Object.keys(formState.dirtyFields).length > 0);
	}, [formState]);

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
						<p className={scss.com_text}>Редактировать презентацию</p>
					</Typography>
					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите название презентации' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите название презентации"
									/>
								)}
							/>
							<Controller
								name="description"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите описание презентации' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите описание презентации"
									/>
								)}
							/>
						</div>
						<div className={scss.button_review}>
							<Controller
								name="file"
								control={control}
								defaultValue={null}
								rules={{ required: 'Выберите файл в формате PDF' }}
								render={({ field }) => (
									<div className={scss.review}>
										<input
											type="file"
											accept=".pdf"
											onChange={(e) => {
												handleFileSelect(e);
												field.onChange(e.target.files?.[0] || null);
											}}
											ref={fileInputRef}
											style={{ display: 'none' }}
										/>
										<input
											type="text"
											value={selectedFile ? selectedFile : ''}
											readOnly
											placeholder="Выберите файл в формате только PDF"
											className={scss.input}
										/>
										<ButtonCancel
											type="button"
											disabled={false}
											onClick={openFilePicker}
											width="117px"
										>
											Обзор...
										</ButtonCancel>
									</div>
								)}
							/>
						</div>
						{errorMessage && (
							<Typography
								color="error"
								style={{ color: 'red', marginBottom: '10px' }}
								variant="body2"
							>
								{errorMessage}
							</Typography>
						)}
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
								disabled={false}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								type="submit"
								width="117px"
								disabled={!isFormChanged}
							>
								Сохранить
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default EditPresentation;
