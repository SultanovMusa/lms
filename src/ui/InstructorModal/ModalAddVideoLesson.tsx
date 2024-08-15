import { FC, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { usePostVideoLessonMutation } from '@/src/redux/api/instructor/video';
import { message } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import scss from './Styled.module.scss';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 367,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

interface VideoProps {
	titleOfVideo: string;
	description: string;
	linkOfVideo: string;
}

interface LessonVideoProps {
	open: boolean;
	handleCloseVideo: () => void;
}

const ModalAddVideoLesson: FC<LessonVideoProps> = ({
	open,
	handleCloseVideo
}) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { dirtyFields }
	} = useForm<VideoProps>();
	const [postVideoLesson] = usePostVideoLessonMutation();
	const { lessonId } = useParams();
	const lesson = Number(lessonId);

	const [loading, setLoading] = useState(false);

	const isButtonDisabled = !(
		dirtyFields.titleOfVideo &&
		dirtyFields.description &&
		dirtyFields.linkOfVideo
	);

	const extractVideoId = (url: string): string => {
		if (url.includes('youtube.com/watch?v=')) {
			return url.split('v=')[1].split('&')[0];
		} else if (url.includes('youtu.be/')) {
			return url.split('youtu.be/')[1].split('?')[0];
		}
		return '';
	};

	const onSubmit: SubmitHandler<VideoProps> = async (data) => {
		const { titleOfVideo, description, linkOfVideo } = data;

		if (linkOfVideo && linkOfVideo !== '') {
			const videoId = extractVideoId(linkOfVideo);

			if (videoId) {
				const postData = {
					titleOfVideo: titleOfVideo,
					description: description,
					linkOfVideo: videoId
				};
				setLoading(true);
				try {
					await postVideoLesson({ postData, lesson });
					reset();
					handleCloseVideo();
					message.success('Видеоурок успешно добавлен');
				} catch (error) {
					console.error(error);
				} finally {
					setLoading(false);
				}
			} else {
				message.error('Неправильный формат ссылки на видеоурок');
			}
		} else {
			message.error('Введите ссылку на видеоурок');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={open}
				onClose={handleCloseVideo}
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
						<p className={scss.com_text}>Добавить видеоурок</p>
					</Typography>
					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="titleOfVideo"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите название видеоурока' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите название видеоурока"
									/>
								)}
							/>
							<Controller
								name="description"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите описание видеоурока' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите описание видеоурока"
									/>
								)}
							/>
							<Controller
								name="linkOfVideo"
								control={control}
								defaultValue=""
								rules={{ required: 'Вставьте ссылку на видеоурок' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="url"
										width="100%"
										placeholder="Вставьте ссылку на видеоурок"
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
								disabled={loading}
								onClick={handleCloseVideo}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								type="submit"
								width="117px"
								disabled={isButtonDisabled || loading}
							>
								{loading ? <CircularProgress size={24} /> : 'Добавить'}
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalAddVideoLesson;
