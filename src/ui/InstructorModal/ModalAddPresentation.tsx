/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useRef, useState } from 'react';
import scss from './Styled.module.scss';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import CircularProgress from '@mui/material/CircularProgress';
import {
	useCreatePresentationFileMutation,
	usePostPresentationMutation
} from '@/src/redux/api/instructor/presentation';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

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

interface ModalAddPresentationProps {
	open: boolean;
	handleClose: () => void;
}

interface PostModalAddPresentation {
	title: string;
	description: string;
	file: File | null;
}

const ModalAddPresentation: FC<ModalAddPresentationProps> = ({
	handleClose,
	open
}) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { dirtyFields }
	} = useForm<PostModalAddPresentation>();
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [createPresentationFile] = useCreatePresentationFileMutation();
	const { lessonId } = useParams();
	const lesson = Number(lessonId);
	const [postPresentation] = usePostPresentationMutation();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isButtonDisabled = !(
		dirtyFields.title &&
		dirtyFields.description &&
		dirtyFields.file
	);

	const onSubmit: SubmitHandler<PostModalAddPresentation> = async (data) => {
		if (isSubmitting) return;

		setIsSubmitting(true);
		const { title, description } = data;

		if (title !== '' && description !== '' && selectedFile !== null) {
			const presentationData = {
				title,
				description,
				file: selectedFile
			};

			try {
				await postPresentation({ lesson, presentationData }).unwrap();
				message.success('Презентация успешно добавлена'); // Display success message
				reset();
				handleClose();
			} catch (error) {
				console.error('Failed to upload presentation:', error);
			} finally {
				setIsSubmitting(false);
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
						<p className={scss.com_text}>Добавить презентацию</p>
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
											value={(selectedFile as string | null) || ''}
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
								disabled={isSubmitting}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								type="submit"
								width="117px"
								disabled={isButtonDisabled || isSubmitting}
							>
								{isSubmitting ? <CircularProgress size={24} /> : 'Добавить'}
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalAddPresentation;
