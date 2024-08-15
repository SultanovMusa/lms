import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, Box, Typography } from '@mui/material';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import scss from './Styled.module.scss';
import { FC, useEffect } from 'react';
import {
	useEditLinkMutation,
	useGetLinkQuery
} from '@/src/redux/api/instructor/link';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

interface LinkProps {
	title: string;
	url: string;
}

interface EditLinkProps {
	open: boolean;
	handleClose: () => void;
	resultId: number | boolean;
}

const EditLink: FC<EditLinkProps> = ({ open, handleClose, resultId }) => {
	const { control, handleSubmit, reset, formState } = useForm<LinkProps>();
	const { dirtyFields } = formState;
	const { lessonId } = useParams();
	const { data: linkData, isFetching } = useGetLinkQuery(Number(lessonId));
	const [editLink] = useEditLinkMutation();

	const finder = linkData?.objects.find((item) => item.id === resultId);

	useEffect(() => {
		reset({
			title: finder?.title || '',
			url: finder?.url || ''
		});
	}, [finder, reset]);

	const onSubmit: SubmitHandler<LinkProps> = async (formData) => {
		if (resultId === undefined) {
			console.error('resultId is undefined');
			return;
		}
		const { title, url } = formData;
		try {
			await editLink({
				linkId: resultId,
				newData: { title, url }
			});
			reset();
			handleClose();
			message.success('Данные успешно обновлены');
		} catch (error) {
			message.error('Ошибка при обновлении данных');
			console.error('Failed to edit link:', error);
		}
	};

	if (isFetching) return null;

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
						className={scss.add_text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.com_text}>Редактировать ссылку</p>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								defaultValue={finder?.title || ''}
								rules={{ required: 'Введите название' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите название"
									/>
								)}
							/>
						</div>

						<div className={scss.input}>
							<Controller
								name="url"
								control={control}
								defaultValue={finder?.url || ''}
								rules={{
									required: 'Введите ссылку',
									pattern: {
										value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
										message: 'Введите правильный URL'
									}
								}}
								render={({ field, fieldState: { error } }) => (
									<>
										<Input
											size="medium"
											{...field}
											type="text"
											width="100%"
											placeholder="Введите ссылку"
										/>
										{error && (
											<span style={{ color: 'red' }}>{error.message}</span>
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
								disabled={false}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="submit"
								width="117px"
								disabled={!Object.keys(dirtyFields).length}
								onClick={handleSubmit(onSubmit)}
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

export default EditLink;
