/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import scss from './EditGroup.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import gallery from '@/src/assets/photo-bg.png';
import {
	useCreateGroupFileMutation,
	useGetGroupQuery,
	useUpdateGroupMutation
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

interface EditModalProps {
	open: boolean;
	handleClose: () => void;
	saveId: number | null;
}

const EditGroup: FC<EditModalProps> = ({ open, handleClose, saveId }) => {
	const { data } = useGetGroupQuery({ page: '1', size: '8' });
	const findData = data?.objects.find((el) => el.id === saveId);

	const [value, setValue] = useState<string>('');
	const [initialValue, setInitialValue] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [initialDate, setInitialDate] = useState<string>('');
	const [text, setText] = useState<string>('');
	const [initialText, setInitialText] = useState<string>('');
	const [hidePhoto, setHidePhoto] = useState<boolean>(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [updateGroup] = useUpdateGroupMutation();
	const [saveSelect, setSelectedFile] = useState<string | null>(null);
	const [createGroupFile] = useCreateGroupFileMutation();
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		if (findData) {
			setValue(findData.title || '');
			setInitialValue(findData.title || '');
			setDate(findData.dateOfEnd || '');
			setInitialDate(findData.dateOfEnd || '');
			setText(findData.description || '');
			setInitialText(findData.description || '');
			setImage(findData.image || '');
			setSelectedFile(findData.image || '');
		}
	}, [findData]);

	useEffect(() => {
		const isDisabled =
			!value ||
			!date ||
			!text ||
			(value === initialValue && date === initialDate && text === initialText);
		setIsButtonDisabled(isDisabled);
	}, [value, date, text, initialValue, initialDate, initialText]);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
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
			setHidePhoto(true);
			setSelectedFile('');
			try {
				const response: any = await createGroupFile(formData);
				const test = response.data;
				const fileName = test.fileName;
				setSelectedFile(fileName);
			} catch (error) {
				messageApi.error('Error uploading file');
				console.error('Error uploading file:', error);
			}
		}
	};

	const updateGroupFunc = async () => {
		const newGroup = {
			title: value,
			image: saveSelect,
			dateOfEnd: date,
			description: text
		};
		try {
			await updateGroup({ newGroup, saveId });
			messageApi.success('Успешно обновлено!');
			handleClose();
			setSelectedFile('');
		} catch (error) {
			messageApi.error('Error updating group');
			console.error('Error updating group:', error);
		}
	};

	const handleDateChange = (newDate: string) => {
		const currentDate = new Date();
		const selectedDate = new Date(newDate);

		if (selectedDate < currentDate) {
			messageApi.error('Выбрана прошлая дата');
		} else {
			setDate(newDate);
		}
	};

	return (
		<>
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
						<p>Редактировать</p>
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
									<img
										style={{
											borderRadius: '8px',
											width: '100%',
											maxWidth: '300px',
											height: '160px'
										}}
										src={gallery}
										alt=""
									/>
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
										src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${saveSelect} `}
									/>
								</div>
							)}
							<p>Нажмите на иконку чтобы загрузить</p>
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
								<input
									type="date"
									min={new Date().toISOString().split('T')[0]}
									value={date}
									onChange={(e) => handleDateChange(e.target.value)}
								/>
							</div>
						</div>
						<textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder="Описание группы"
						/>
						<div className={scss.buttons}>
							<ButtonCancel
								type="submit"
								onClick={handleClose}
								disabled={false}
								width="103px"
							>
								Отмена
							</ButtonCancel>

							<ButtonSave
								type="submit"
								onClick={updateGroupFunc}
								disabled={isButtonDisabled}
								width="117px"
							>
								Добавить
							</ButtonSave>
						</div>
					</Typography>
				</Box>
			</Modal>
		</>
	);
};

export default EditGroup;
