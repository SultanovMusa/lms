/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import Input from '@/src/ui/customInput/Input';
import scss from './AddTask.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreateTaskInstructorMutation } from '@/src/redux/api/instructor/addTask';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useParams, useNavigate } from 'react-router-dom';
import { IconDownload } from '@tabler/icons-react';
import { Dayjs } from 'dayjs';
import { Box, ScrollArea } from '@mantine/core';
import Sources from 'quill';
import ButtonDelete from '@/src/ui/customButton/ButtonDelete';
import { useCreateGroupFileMutation } from '@/src/redux/api/admin/groups';

const AddTask: React.FC = () => {
	const [title, setTitle] = useState('');
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
	const [createGroupFile] = useCreateGroupFileMutation();
	const [value, setValue] = useState('');
	const { courseId, lessonId } = useParams();
	const navigate = useNavigate();
	const [createTaskInstructor] = useCreateTaskInstructorMutation();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [saveSelect, setSelectedFile] = useState<string | null>(null);
	const [secondSave, setSecondSave] = useState<string | null>(null);
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const formData = new FormData();
			formData.append('file', file);
			formData.append('description', description);
			try {
				const response: any = await createGroupFile(formData).unwrap();
				const fileName = response.fileName;
				setSelectedFile(fileName);
				setDescription(description);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	function dataURItoBlob(dataURI: string) {
		const [mime, data] = dataURI.split(';base64,');
		const binary = atob(data);
		const arrayBuffer = new ArrayBuffer(binary.length);
		const uint8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < binary.length; i++) {
			uint8Array[i] = binary.charCodeAt(i);
		}
		return new Blob([uint8Array], { type: mime });
	}

	const handleImageUpload = async (imageData: string, description: string) => {
		try {
			const blob = dataURItoBlob(imageData);
			const file = new File([blob], 'filename.jpg', { type: 'image/jpeg' });
			const formData = new FormData();
			formData.append('file', file);
			const cleanedDescription = description.replace(/\\/g, '');
			formData.append('description', cleanedDescription);
			const response: any = await createGroupFile(formData).unwrap();
			if (response && response.urlFile) {
				setSecondSave(response.urlFile);
			} else {
				console.error('Invalid response structure:', response);
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};

	const handleEditorChange = (
		content: string,
		delta: any,
		source: Sources | string
	): void => {
		setValue(content);
		if (source === 'user' && delta.ops.length > 0) {
			for (let i = 0; i < delta.ops.length; i++) {
				const operation = delta.ops[i];
				if (operation.insert && operation.insert.image) {
					handleImageUpload(operation.insert.image, description);
				}
			}
		}
	};

	const addTask = async () => {
		setIsLoading(true);
		try {
			const newDescription = value.replace(
				/<img[^>]*>/,
				secondSave ? `<img src="${secondSave}"/>` : ''
			);
			const newTask = {
				title,
				file: saveSelect,
				description: newDescription,
				deadline: selectedDate
			};
			const response = await createTaskInstructor({
				newTask,
				lessonId
			}).unwrap();
			if (response) {
				navigate(`/instructor/course/${courseId}/materials/${lessonId}/lesson`);
				setTitle('');
				setValue('');
				setSelectedDate(null);
			}
		} catch (error) {
			console.error('Error creating task:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteFile = async () => {
		try {
			const selector = document.querySelector('.ql-editor');
			if (selector) {
				const paragraph = selector.querySelector('p');
				if (paragraph) {
					const imgTags = paragraph.querySelectorAll('img');
					console.log(`Number of <img> tags inside <p>: ${imgTags.length}`);

					if (imgTags.length > 0) {
						const lastImg = imgTags[imgTags.length - 1];
						paragraph.removeChild(lastImg);
					}

					setSelectedFile(null);
					setSecondSave(null);
				}
			}
		} catch (error) {
			console.error('Error deleting file:', error);
		}
	};

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ font: [] }],
			[{ size: [] }],
			[
				'bold',
				'italic',
				'underline',
				'strike',
				'blockquote',
				'link',
				'image',
				'code-block'
			],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' }
			],
			[{ color: [] }, { background: [] }]
		]
	};

	return (
		<div className={scss.addTask}>
			<h1>Материалы</h1>
			<ScrollArea
				type="always"
				scrollbars="y"
				offsetScrollbars
				classNames={scss}
			>
				<Box>
					<div className={scss.container}>
						<div className={scss.main_task}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}
							>
								<p style={{ color: '#1F6ED4' }}>Создать задание</p>
								<div className={scss.save_file}>
									<input
										type="file"
										ref={fileInputRef}
										style={{ display: 'none' }}
										onChange={handleFileSelect}
									/>
									<ButtonCancel
										disabled={false}
										width="207px"
										onClick={() => fileInputRef.current?.click()}
										type="button"
									>
										<span> Загрузить файл</span> <IconDownload stroke={2} />
									</ButtonCancel>
								</div>
							</div>
							<div className={scss.input_part}>
								<Input
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									size="small"
									type="text"
									width="100%"
									placeholder="Название задания"
								/>
							</div>
							<div className={scss.second_part}>
								<div className={scss.second}>
									<div className={scss.editor}>
										<ReactQuill
											theme="snow"
											value={value}
											onChange={handleEditorChange}
											className={scss.editorInput}
											modules={modules}
										/>
									</div>

									<div className={scss.button}>
										{value.includes('<img') && (
											<>
												<ButtonDelete
													disabled={false}
													type="button"
													onClick={handleDeleteFile}
												>
													Удалить
												</ButtonDelete>
											</>
										)}
									</div>

									<div>
										{saveSelect !== null ? (
											<a href={saveSelect}>{saveSelect}</a>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={scss.calendar}>
						<div className={scss.dataInput}>
							<p>Срок сдачи:</p>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateTimePicker
									label="Выберите дату и время"
									value={selectedDate}
									onChange={(newDate) => setSelectedDate(newDate)}
								/>
							</LocalizationProvider>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
							<ButtonCancel
								type="button"
								disabled={false}
								width="105px"
								onClick={() =>
									navigate(
										`/instructor/course/${courseId}/materials/${lessonId}/lesson`
									)
								}
							>
								Отмена
							</ButtonCancel>
							<Button
								variant="contained"
								style={{
									padding: '10px 24px',
									borderRadius: '8px',
									textTransform: 'capitalize'
								}}
								onClick={addTask}
								disabled={!title || !selectedDate || isLoading}
							>
								{isLoading ? 'Отправка' : 'Добавить'}
							</Button>
						</div>
					</div>
				</Box>
			</ScrollArea>
		</div>
	);
};

export default AddTask;
