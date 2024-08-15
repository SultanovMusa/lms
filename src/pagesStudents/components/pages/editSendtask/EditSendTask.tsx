/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import {
	useAnswerTaskStudentQuery,
	useGetTaskInstructorQuery
} from '@/src/redux/api/instructor/addTask';
import scss from './EditSendTask.module.scss';
import Input from '@/src/ui/customInput/Input';
import ReactQuill from 'react-quill';
import { useEffect, useRef, useState } from 'react';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { useCreateGroupFileMutation } from '@/src/redux/api/admin/groups';
import { useEditSendTaskMutation } from '@/src/redux/api/students/sendTask';
import { IconDownload } from '@tabler/icons-react';
import Sources from 'quill';
import { message } from 'antd';

const EditSendTask = () => {
	const { coursesId, lessonId, getTaskId } = useParams();
	const getTask = Number(getTaskId);
	const lesson = Number(lessonId);
	const { data } = useGetTaskInstructorQuery(lesson);
	const [homeWork, setHomeWork] = useState<string[] | undefined>([]);
	const [value, setValue] = useState('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [saveSelect, setSelectedFile] = useState<string | null>(null);
	const [secondSave, setSecondSave] = useState<string | null>(null);
	const [description, setDescription] = useState('');
	const [createGroupFile] = useCreateGroupFileMutation();
	const { data: responseTask } = useAnswerTaskStudentQuery(getTask);
	const navigate = useNavigate();
	const [editSendTask] = useEditSendTaskMutation();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (responseTask) {
			setValue(responseTask?.text);
			setSelectedFile(responseTask.file);
			setHomeWork(responseTask.comment?.map((item) => item.content));
		}
	}, [responseTask]);

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

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			console.log(file);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('description', description);
			try {
				const response: any = await createGroupFile(formData).unwrap();
				const fileName = response.fileName;
				console.log('File uploaded:', fileName);
				setSelectedFile(fileName);
				setDescription(description);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const dataURItoBlob = (dataURI: string): Blob => {
		const [mime, data] = dataURI.split(';base64,');
		const binary = atob(data);
		const arrayBuffer = new ArrayBuffer(binary.length);
		const uint8Array = new Uint8Array(arrayBuffer);

		for (let i = 0; i < binary.length; i++) {
			uint8Array[i] = binary.charCodeAt(i);
		}
		return new Blob([uint8Array], { type: mime });
	};

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
				console.log('Image uploaded:', response.urlFile);
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
		setLoading(true); // Set loading to true
		try {
			const newDescription = value.replace(
				/<img[^>]*>/,
				secondSave ? `<img src="${secondSave}"/>` : ''
			);

			const newTask = {
				text: newDescription,
				file: saveSelect,
				comment: homeWork
			};

			const response = await editSendTask({ newTask, getTask });
			navigate(`/courses/${coursesId}/materials/${lessonId}/lesson`);

			if (!response) {
				throw new Error('Invalid response from server');
			}

			message.success('Задание успешно отправлено'); // Show success message
		} catch (error) {
			console.error('Error creating task:', error);
			message.error('Ошибка при отправке задания'); // Show error message
		} finally {
			setLoading(false); // Set loading to false
		}
	};

	return (
		<div className={scss.get_task}>
			<div className={scss.work}>
				{data?.taskResponse.map((item) => (
					<div className={scss.card} key={item.id}>
						<div className={scss.text}>
							<h2>{item.deadline.split('T')[0]}</h2>
							<h2>{item.deadline.split('T')[1]}</h2>
						</div>
						<div
							className={scss.inner_html}
							dangerouslySetInnerHTML={{ __html: item.description }}
						/>
					</div>
				))}
				<div className={scss.content}>
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
							<span style={{ paddingLeft: '10px' }}> Загрузить файл</span>
							<IconDownload stroke={2} />
						</ButtonCancel>
					</div>
					<div>
						<ReactQuill
							theme="snow"
							value={value}
							onChange={handleEditorChange}
							modules={modules}
							placeholder="Текст домашнего задания"
						/>
					</div>
					<div className={scss.saveInput_button}>
						<Input
							type="text"
							value={homeWork}
							onChange={(e) => setHomeWork(e.target.value)}
							size="small"
							placeholder="Комментарий к заданию"
							width="100%"
						/>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'end',
							paddingBottom: '30px'
						}}
					>
						<ButtonSave
							disabled={loading}
							onClick={addTask}
							width="117px"
							type="button"
						>
							{loading ? 'Отправка...' : 'Отправить'}
						</ButtonSave>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditSendTask;
