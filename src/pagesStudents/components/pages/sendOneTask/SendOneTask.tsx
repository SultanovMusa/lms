/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import scss from './SendOneTask.module.scss';
import Input from '@/src/ui/customInput/Input';
import ReactQuill from 'react-quill';
import { useRef, useState } from 'react';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { useCreateGroupFileMutation } from '@/src/redux/api/admin/groups';
import { usePostStudentTaskMutation } from '@/src/redux/api/students/sendTask';
import { IconDownload } from '@tabler/icons-react';
import { message } from 'antd';
import Sources from 'quill';

const SendOneTask = () => {
	const [postStudentTask] = usePostStudentTaskMutation();
	const { coursesId, lessonId, getTaskId } = useParams();
	const lesson = Number(lessonId);
	const { data } = useGetTaskInstructorQuery(lesson);
	const [homeWork, setHomeWork] = useState('');
	const [value, setValue] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [saveSelect, setSelectedFile] = useState<string | null>(null);
	const [secondSave, setSecondSave] = useState<string | null>(null);
	const [description, setDescription] = useState('');
	const [createGroupFile] = useCreateGroupFileMutation();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

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

	const getTask = Number(getTaskId);
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
		if (loading) return;
		setLoading(true);
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

			const response = await postStudentTask({ newTask, getTask });
			navigate(`/courses/${coursesId}/materials/${lessonId}/lesson`);

			if (response) {
				message.success('Задание успешно отправлено');
			} else {
				throw new Error('Invalid response from server');
			}
		} catch (error) {
			console.error('Error creating task:', error);
			message.error('Ошибка при отправке задания');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={scss.get_task}>
			<div className={scss.work}>
				{data?.taskResponse.map((item) => (
					<div className={scss.card} key={item.id}>
						<div className={scss.text}>
							<h3>{item.deadline.split('T')[0]}</h3>
							<h3>{item.deadline.split('T')[1]}</h3>
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
						<div className={scss.buttons}>
							<div className={scss.button}>
								<ButtonCancel
									disabled={false}
									width="100%"
									onClick={() => fileInputRef.current?.click()}
									type="button"
								>
									<div className={scss.button_elements}>
										<div className={scss.icon}>
											<IconDownload stroke={2} />
										</div>
										<span> Загрузить файл</span>
									</div>
								</ButtonCancel>
							</div>
						</div>
					</div>
					<div className={scss.react_quill}>
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

export default SendOneTask;
