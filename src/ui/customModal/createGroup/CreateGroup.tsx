/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef, useState } from 'react';
import scss from './CreateGroup.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import gallery from '@/src/assets/photo-bg.png';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import { message } from 'antd';

import {
	useCreateGroupFileMutation,
	useCreateGroupMutation
} from '@/src/redux/api/admin/groups';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	sx: {
		bgcolor: 'background.paper',
		padding: '0px'
	}
};

interface CreateGroupsProps {
	handleOpen: (value: boolean) => void;
	open: boolean;
	handleClose: () => void;
}

const CreateGroup: FC<CreateGroupsProps> = ({ open, handleClose }) => {
	const [value, setValue] = useState('');
	const [data, setData] = useState('');
	const [text, setText] = useState('');
	const [hidePhoto, setHidePhoto] = useState(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [createGroup] = useCreateGroupMutation();
	const [createGroupFile] = useCreateGroupFileMutation();
	const [urlImg, setUrlImg] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const [creatingGroup, setCreatingGroup] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			const formData = new FormData();
			formData.append('file', file);
			try {
				const response: any = await createGroupFile(formData);
				const fileName = response?.data?.fileName;
				if (fileName) {
					setHidePhoto(true);
					setUrlImg(fileName);
					const fileURL = URL.createObjectURL(file);
					setImage(fileURL);
				} else {
					console.error('Unexpected response format:', response);
				}
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const notifySuccess = () => messageApi.success('Группа успешно создана!');
	const notifyError = () =>
		messageApi.error('Произошла ошибка при создании группы');
	const notifyIncomplete = () => messageApi.error('Заполните все поля');
	const notifyInvalidDate = () =>
		messageApi.error('Выберите будущую дату для "Дата окончания"');

	const handleCreateGroup = async () => {
		if (creatingGroup) {
			return;
		}

		if (!value || !urlImg || !data || !text) {
			notifyIncomplete();
			setIsFormValid(false);
			return;
		}

		const endDate = new Date(data);
		const currentDate = new Date();

		if (endDate <= currentDate) {
			notifyInvalidDate();
			return;
		}

		setCreatingGroup(true);

		const newGroup = {
			title: value,
			image: urlImg,
			dateOfEnd: data,
			description: text
		};

		try {
			await createGroup(newGroup);
			notifySuccess();
			handleClose();
			setData('');
			setText('');
			setImage('');
			setValue('');
			setUrlImg('');
			setHidePhoto(false);
			setIsFormValid(false);
		} catch (error: any) {
			if (
				error.response &&
				[400, 403, 404, 417].includes(error.response.status)
			) {
				if (error.response.status === 400) {
					messageApi.error('Ошибка: Неправильный запрос');
				} else if (error.response.status === 403) {
					messageApi.error('Ошибка: Доступ запрещён');
				} else if (error.response.status === 404) {
					messageApi.error('Ошибка: Ресурс не найден');
				} else if (error.response.status === 417) {
					messageApi.error('Ошибка: Ожидаемое неполное');
				}
			} else {
				notifyError();
			}
		} finally {
			setCreatingGroup(false);
		}
	};

	useEffect(() => {
		setIsFormValid(!!value && !!urlImg && !!data && !!text);
	}, [value, urlImg, data, text]);

	const handleDateChange = (newDate: string) => {
		const currentDate = new Date();
		const selectedDate = new Date(newDate);

		if (selectedDate < currentDate) {
			setData('');
		} else {
			setData(newDate);
		}
	};

	return (
		<div>
			{contextHolder}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={scss.main_modal} sx={style}>
					<Typography
						className={scss.curse}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p> Создать группу</p>
					</Typography>
					<Typography
						className={scss.text_part}
						id="modal-modal-description"
						sx={{ mt: 2 }}
					>
						<div className={scss.img_part}>
							<input
								className={scss.fileInput}
								type="file"
								ref={fileInputRef}
								onChange={handleFileSelect}
							/>
							{image === '' ? (
								<div
									onClick={handleButtonClick}
									className={hidePhoto ? scss.background_none : scss.background}
									style={{
										backgroundImage: `url(${gallery})`
									}}
								>
									<img style={{ borderRadius: '8px' }} src={gallery} alt="" />
								</div>
							) : (
								<div className={scss.img} onClick={handleButtonClick}>
									<img
										style={{
											borderRadius: '8px',
											width: '100%',
											maxWidth: '173px',
											minWidth: '173px',
											height: '145px'
										}}
										src={image}
									/>
								</div>
							)}
							<p className={hidePhoto ? scss.hide_text : scss.show}>
								Нажмите на иконку чтобы загрузить
							</p>
						</div>
						<div className={scss.inputs}>
							<div className={scss.first_input}>
								<Input
									size="medium"
									width="100%"
									placeholder="Название группы"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									type="text"
								/>
							</div>
							<div className={scss.second_input}>
								{/* <Input
									size="medium"
									placeholder="Дата окончания"
									value={data}
									onChange={(e) => handleDateChange(e.target.value)}
									width="100%"
									type="date"
								/> */}
								<input
									type="date"
									min={new Date().toISOString().split('T')[0]}
									value={data}
									onChange={(e) => handleDateChange(e.target.value)}
								/>
							</div>
						</div>
						<textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder="Описание группы"
						></textarea>
						<div className={scss.buttons}>
							<ButtonCancel
								type="button"
								onClick={handleClose}
								disabled={false}
								width="103px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="button"
								onClick={handleCreateGroup}
								disabled={!isFormValid || creatingGroup}
								width="117px"
							>
								{creatingGroup ? <CircularProgress size={24} /> : 'Добавить'}
							</ButtonSave>
						</div>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default CreateGroup;
