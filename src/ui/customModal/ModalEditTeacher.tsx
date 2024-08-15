/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { Controller, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './Style.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import {
	useGetAllAllCoursesWithoutPaginationQuery,
	useGetInsructorsForEditQuery,
	usePatchTeacherMutation
} from '@/src/redux/api/admin/teacher';
import Input from '../customInput/Input';
import { useEffect, useState } from 'react';
import { ListItemText, MenuItem, Select } from '@mui/material';

interface IFormInputs {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	login: string;
	specialization: string;
	group: string;
	courseIds: string[];
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	backgroundColor: '#fff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

interface ModalProps {
	openModalEdit: boolean;
	closeModalEdit: (openModalEdit: boolean) => void;
	deleteById: number | null;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const ModalEditTeacher: React.FC<ModalProps> = ({
	openModalEdit,
	closeModalEdit,
	deleteById
}) => {
	const { control, handleSubmit, reset, watch } = useForm<IFormInputs>();
	const [patchTeacher] = usePatchTeacherMutation();
	const test = Number(deleteById);
	const { data } = useGetInsructorsForEditQuery(test);
	const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const { data: courses } = useGetAllAllCoursesWithoutPaginationQuery();
	const [originalData, setOriginalData] = useState<IFormInputs | null>(null);
	const handleChange = (event: any) => {
		const { value } = event.target;
		setSelectedTeachers(typeof value === 'string' ? value.split(', ') : value);
	};
	const handleSelect = (teacherId: number | null, instructorName: string) => {
		setSelectedTeachers((prev) =>
			prev.includes(instructorName) ? prev : [...prev, instructorName]
		);
		setSelectedIds((prev) =>
			prev.includes(String(teacherId)) ? prev : [...prev, String(teacherId)]
		);
	};

	const onSubmit = async (data: IFormInputs) => {
		const updateTeacher = {
			...data,
			courseIds: selectedIds
		};
		const link = {
			linkForPassword: 'https://lms-js12-topaz.vercel.app/auth/newPassword'
		};
		await patchTeacher({ updateTeacher, deleteById, link });
		setSelectedIds([]);
		closeModalEdit(false);
	};

	const fullName = data?.fullName || '';
	const nameParts = fullName.trim().split(' ');

	const firstName = nameParts[0] || '';
	const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

	useEffect(() => {
		const initialData: IFormInputs = {
			firstName: firstName,
			lastName: lastName,
			email: data?.email || '',
			phoneNumber: data?.phoneNumber || '',
			specialization: data?.specialization || '',
			courseIds: data?.courseNames || [],
			login: '',
			group: ''
		};
		reset(initialData);
		setOriginalData(initialData);
	}, [data]);

	const watchedValues = watch();

	const isButtonDisabled = () => {
		if (!originalData) return true;
		return Object.keys(watchedValues).every(
			(key) =>
				watchedValues[key as keyof IFormInputs] ===
				originalData[key as keyof IFormInputs]
		);
	};

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
						<div className={scss.comText}>
							Редактировать учителя по имени {data?.fullName}
						</div>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="First Name"
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Last Name"
									/>
								)}
							/>
							<Controller
								name="phoneNumber"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Phone Number"
									/>
								)}
							/>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Email"
									/>
								)}
							/>
							<Controller
								name="specialization"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="string"
										width="100%"
										placeholder="Специализация"
									/>
								)}
							/>
							<Select
								style={{ borderRadius: '10px' }}
								labelId="demo-multiple-checkbox-label"
								id="demo-multiple-checkbox"
								multiple
								value={selectedTeachers}
								onChange={handleChange}
								renderValue={(selected) => {
									if (selected.length === 0) {
										return <p>Выберите курсы</p>;
									}
									return selected.join(', ');
								}}
								displayEmpty
								MenuProps={MenuProps}
							>
								<MenuItem disabled value="">
									<p>Выберите курсы</p>
								</MenuItem>
								{courses?.map((teacher) => (
									<MenuItem
										key={teacher.id}
										value={`${teacher.courseName}`}
										onClick={() => handleSelect(teacher.id, teacher.courseName)}
									>
										<ListItemText primary={teacher.courseName} />
									</MenuItem>
								))}
							</Select>

							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'flex-end',
									alignItems: 'center',
									paddingBottom: '10px',
									paddingTop: '13px',
									gap: '10px',
									paddingRight: '0px'
								}}
							>
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
									disabled={isButtonDisabled()}
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

export default ModalEditTeacher;
