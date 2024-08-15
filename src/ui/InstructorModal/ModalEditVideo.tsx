/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './ModalEditVideo.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import Input from '../customInput/Input';
import { useEffect, useState } from 'react';
import {
	useGetVideoLessonQuery,
	usePatchVideoLessonMutation
} from '@/src/redux/api/instructor/video';
import { useParams } from 'react-router-dom';
import { message } from 'antd'; // Импорт message из Ant Design

interface IFormInputs {
	titleOfVideo: string;
	description: string;
	linkOfVideo: string;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	height: 365,
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

interface modalProps {
	openModalEdit: boolean;
	closeModalEdit: (openModalEdit: boolean) => void;
	saveIdElement: number | null;
}

const ModalEditVideo: React.FC<modalProps> = ({
	openModalEdit,
	closeModalEdit,
	saveIdElement
}) => {
	const { control, handleSubmit, reset, formState } = useForm<IFormInputs>({
		mode: 'onChange'
	});
	const [patchVideo] = usePatchVideoLessonMutation();

	const { lessonId } = useParams();
	const lesson = Number(lessonId);
	const { data } = useGetVideoLessonQuery(lesson);
	const finder = data?.find((item) => item.id === saveIdElement);
	const [isFormChanged, setIsFormChanged] = useState(false);

	const getVideoId = (url: string) => {
		const match = url.match(
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
		);
		return match ? match[1] : '';
	};

	const onSubmit = async (data: IFormInputs) => {
		const videoId = getVideoId(data.linkOfVideo);

		if (!videoId) {
			message.error('Неправильный формат ссылки на видеоурок');
			return;
		}

		const newVideoLesson = {
			...data,
			linkOfVideo: videoId
		};

		try {
			await patchVideo({ newVideoLesson, saveIdElement }).unwrap();
			closeModalEdit(false);
			message.success('Видеоурок успешно обновлен');
		} catch (error: any) {
			if (error.status === 409) {
				message.error('Что то пошло не так!');
			} else {
				message.error('Произошла ошибка. Попробуйте снова.');
			}
		}
	};

	useEffect(() => {
		reset({
			titleOfVideo: finder?.titleOfVideo,
			description: finder?.description,
			linkOfVideo: finder?.linkOfVideo
		});
	}, [finder, reset]);

	useEffect(() => {
		setIsFormChanged(Object.keys(formState.dirtyFields).length > 0);
	}, [formState]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
			<Modal
				open={openModalEdit}
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
						<div className={scss.comText}>Редактировать видеоурок</div>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="titleOfVideo"
								control={control}
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
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите описание видеурока"
									/>
								)}
							/>
							<Controller
								name="linkOfVideo"
								control={control}
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

							<div className={scss.EditButtons}>
								<ButtonCancel
									type="button"
									disabled={false}
									onClick={() => closeModalEdit(false)}
									width="117px"
								>
									Отмена
								</ButtonCancel>
								<ButtonSave
									onClick={handleSubmit(onSubmit)}
									width="117px"
									type="submit"
									disabled={!isFormChanged}
								>
									Отправить
								</ButtonSave>
							</div>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalEditVideo;
