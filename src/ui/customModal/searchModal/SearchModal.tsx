/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
	Button,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent
} from '@mui/material';
import scss from './SerchModal.module.scss';
import {
	useGetGroupAllQuery,
	useGetStudentTableQuery
} from '@/src/redux/api/admin/student';
import { useSearchParams } from 'react-router-dom';

interface ModalProps {
	openModalEdit: boolean;
	handleClose: () => void;
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

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minHeight: 230,
	backgroundColor: '#fff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const SearchModal: FC<ModalProps> = ({ openModalEdit, handleClose }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedId, setSelectedId] = useState<string>('');
	const { handleSubmit, control } = useForm();
	const { data } = useGetGroupAllQuery();
	const [formatName, setFormatName] = useState<string>('');
	const handleChange = (event: SelectChangeEvent<number>) => {
		const { value } = event.target;
		setSelectedId(value as string);
	};
	const { data: student } = useGetStudentTableQuery({
		page: `page=${searchParams.get('page') || ''}`,
		size: `size=${searchParams.get('size') || ''}`,
		search: `search=${searchParams.get('search') || ''}`,
		studyFormat: searchParams.get('studyFormat') || '',
		groupId: searchParams.get('groupId') || ''
	});
	console.log(student);

	const handleFormatChange = (event: SelectChangeEvent<string>) => {
		setFormatName(event.target.value);
	};

	const onSubmit = async () => {};
	const handleSubmitFormButton = () => {
		searchParams.set('groupId', selectedId);
		searchParams.set('studyFormat', formatName);
		setSearchParams(searchParams);
		handleClose();
	};

	const handleDeleteSearch = () => {
		searchParams.delete('groupId');
		searchParams.delete('studyFormat');
		setSearchParams(searchParams);
		handleClose();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={openModalEdit}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.Announcement_form}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<h1 className={scss.com_text}>Параметры сортировки</h1>
					</Typography>

					<Box className={scss.input_form}>
						<div className={scss.input}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '10px'
								}}
							>
								<FormControl style={{ width: '100%' }}>
									<InputLabel
										style={{ background: '#fff' }}
										id="demo-multiple-checkbox-label"
									>
										Группы
									</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										value={selectedId !== '' ? parseInt(selectedId) : undefined}
										onChange={handleChange}
										input={<OutlinedInput label="Группы" />}
										renderValue={(selected) => {
											const groupName = data?.find(
												(g) => g.id === selected
											)?.groupName;
											return groupName;
										}}
										MenuProps={MenuProps}
										style={{
											maxWidth: '540px',
											width: '100%',
											height: '55px',
											borderRadius: '12px',
											position: 'relative',
											top: '0'
										}}
									>
										{data?.map((group) => (
											<MenuItem
												key={group.id}
												value={group.id}
												onClick={() => setSelectedId(group.id.toString())}
											>
												<ListItemText primary={group.groupName} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<div
									style={{
										width: '100%',
										maxWidth: '540px'
									}}
								>
									<FormControl style={{ width: '100%' }}>
										<InputLabel
											style={{ background: '#fff' }}
											id="study-format-label"
										>
											Формат обучения
										</InputLabel>
										<Controller
											name="studyFormat"
											control={control}
											defaultValue=""
											rules={{
												required: 'Формат обучения обязателен для заполнения'
											}}
											render={({ field }) => (
												<Select
													{...field}
													style={{ borderRadius: '12px' }}
													labelId="study-format-label"
													id="study-format-select"
													input={<OutlinedInput label="studyFormat" />}
													MenuProps={MenuProps}
													value={formatName}
													onChange={handleFormatChange}
												>
													<MenuItem value="ONLINE">ONLINE</MenuItem>
													<MenuItem value="OFFLINE">OFFLINE</MenuItem>
												</Select>
											)}
										/>
									</FormControl>
								</div>
							</div>

							<Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
								<Button
									type="button"
									onClick={handleDeleteSearch}
									disabled={false}
									variant="outlined"
									style={{ padding: '10px', borderRadius: '8px' }}
								>
									Сбросить фильтры
								</Button>
								<Button
									variant="contained"
									style={{ padding: '10px', borderRadius: '8px' }}
									type="button"
									onClick={handleSubmitFormButton}
									disabled={false}
								>
									Применить
								</Button>
							</Box>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default SearchModal;
