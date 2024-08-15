/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import Input from '@/src/ui/customInput/Input';
import scss from './EditTask.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEditTaskInstructorMutation } from '@/src/redux/api/instructor/addTask';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useParams, useNavigate } from 'react-router-dom';
import { IconDownload } from '@tabler/icons-react';
import { Dayjs } from 'dayjs';
import { Box, ScrollArea } from '@mantine/core';
import { useCreateGroupFileMutation } from '@/src/redux/api/admin/groups';
import { useGetTaskInstructorAQuery } from '@/src/redux/api/instructor/getTask';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Bishkek');

const EditTask = () => {
	const [title, setTitle] = useState('');
	const [selectedDate, setSelectedDate] = useState<Dayjs | null | undefined>(
		null
	);
	const { courseId, lessonId, getTaskId } = useParams();
	const test = Number(getTaskId);
	const { data } = useGetTaskInstructorAQuery(test);
	const [createGroupFile] = useCreateGroupFileMutation();
	const [value, setValue] = useState('');
	const navigate = useNavigate();
	const [editTaskInstructor] = useEditTaskInstructorMutation();
	const getTask = Number(getTaskId);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [saveSelect, setSelectedFile] = useState<null | string>(null);
	const [secondSave, setSecondSave] = useState(null);
	const [description, setDescription] = useState('');

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
				const response: any = await createGroupFile(formData as any);
				const test = JSON.parse(response.data);
				const fileName = test.fileName;
				setSelectedFile(fileName);
				setDescription(description);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	function dataURItoBlob(dataURI: string): Blob {
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
		const blob = dataURItoBlob(imageData);
		const file = new File([blob], 'filename.jpg', { type: 'image/jpeg' });
		const formData = new FormData();
		formData.append('file', file);
		const cleanedDescription = description.replace(/\\/g, '');
		formData.append('description', cleanedDescription);

		try {
			const response = await createGroupFile(formData);
			if (response && response.data && response.data.fileName) {
				setSecondSave(response.data.urlFile);
			} else {
				console.error('Invalid response from server:', response);
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};

	const handleEditorChange = (
		content: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delta: any,
		source: string
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

	const transformData = (deadline: Dayjs | string) => {
		if (typeof deadline === 'string') {
			return dayjs(deadline).tz('Asia/Bishkek');
		} else {
			return deadline;
		}
	};

	useEffect(() => {
		if (data) {
			setTitle(data?.title);
			setValue(data?.description);
			setSelectedFile(data?.file);
			const transformedDeadline = transformData(data.deadline);
			setSelectedDate(transformedDeadline);
		}
	}, [data]);

	const addTask = async () => {
		const newDescription = value.replace(
			/<img[^>]*>/,
			`<img src="${secondSave}"/>`
		);

		const newTask = {
			title,
			file: saveSelect,
			description: newDescription,
			deadline: selectedDate
		};

		await editTaskInstructor({ newTask, getTask });

		setTitle('');
		setValue('');
		setSelectedDate(null);
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/lesson`);
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
								<p style={{ color: '#1f6ed4' }}>Создать задание</p>
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
							<div className={scss.secon_part}>
								<div className={scss.second_part}>
									<div className={scss.editor}>
										<ReactQuill
											theme="snow"
											value={value}
											onChange={handleEditorChange}
											className={scss.editorInput}
											modules={modules}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={scss.calendar}>
						<div className={scss.dataInput}>
							<p>Срок сдачи:</p>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={['DateTimePicker']}>
									<DateTimePicker
										label="Выберите дату и время"
										value={selectedDate}
										onChange={(newDate) => setSelectedDate(newDate)}
									/>
								</DemoContainer>
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
								style={{ padding: '10px 24px', borderRadius: '8px' }}
								onClick={addTask}
							>
								Добавить
							</Button>
						</div>
					</div>
				</Box>
			</ScrollArea>
		</div>
	);
};

export default EditTask;
