import { FC, useState, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import scss from './AnnouncementForm.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { Box, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {
	useGetAnnouncementGroupsQuery,
	usePostAnnouncementTableMutation
} from '@/src/redux/api/admin/announcement';
import InputAnnouncement from '../customInput/InputAnnouncement';
import Input from '../customInput/Input';
import { message } from 'antd';

interface PostAnnouncementProps {
	announcementContent: string;
	targetGroupIds: string[];
	publishedDate: string;
	expirationDate: string;
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
	minHeight: 330,
	backgroundColor: '#ffffff',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

interface AnnouncementProps {
	open: boolean;
	handleClose: () => void;
}

const AnnouncementForm: FC<AnnouncementProps> = ({ open, handleClose }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { dirtyFields }
	} = useForm<PostAnnouncementProps>();
	const [postAnnouncementTable, { isSuccess }] =
		usePostAnnouncementTableMutation();
	const [personName, setPersonName] = useState<string[]>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const { data: groupData } = useGetAnnouncementGroupsQuery();
	const [publishedDateErrorVisible, setPublishedDateErrorVisible] =
		useState<boolean>(false);
	const [expirationDateErrorVisible, setExpirationDateErrorVisible] =
		useState<boolean>(false);

	const handleSelect = (groupId: number, groupName: string) => {
		setSelectedIds((prev) =>
			prev.includes(String(groupId)) ? prev : [...prev, String(groupId)]
		);
		setPersonName((prev) =>
			prev.includes(groupName) ? prev : [...prev, groupName]
		);
	};

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		const { value } = event.target;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};

	const isButtonDisabled = !dirtyFields.announcementContent;

	const validatePublishedDate = (value: string) => {
		const currentDate = new Date();
		const selectedDate = new Date(value);

		if (selectedDate > currentDate) {
			setPublishedDateErrorVisible(false);
		} else {
			setPublishedDateErrorVisible(true);
			message.error('Выберите сегодняшнюю или будущую дату');
		}
	};

	const validateExpirationDate = (value: string) => {
		const currentDate = new Date();
		const selectedDate = new Date(value);

		if (selectedDate >= currentDate) {
			setExpirationDateErrorVisible(false);
		} else {
			setExpirationDateErrorVisible(true);
			message.error('Выберите будущую дату');
		}
	};

	const onSubmit: SubmitHandler<PostAnnouncementProps> = async (data) => {
		if (
			data.announcementContent.length > 0 &&
			personName.length > 0 &&
			!publishedDateErrorVisible &&
			!expirationDateErrorVisible
		) {
			const newAnnouncement = {
				announcementContent: data.announcementContent,
				expirationDate: data.expirationDate,
				publishedDate: data.publishedDate,
				targetGroupIds: selectedIds
			};
			await postAnnouncementTable(newAnnouncement);
			handleClose();
			reset();
			setPersonName([]);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			message.success('Объявление успешно добавлено');
		}
	}, [isSuccess]);

	useEffect(() => {
		if (open) {
			reset({
				announcementContent: '',
				expirationDate: '',
				publishedDate: '',
				targetGroupIds: []
			});
			setSelectedIds([]);
			setPersonName([]);
			setPublishedDateErrorVisible(false);
			setExpirationDateErrorVisible(false);
		}
	}, [open, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.Announcement_form}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						className={scss.text}
					>
						<p>Добавить объявление</p>
					</Typography>

					<Box className={scss.input_form}>
						<div className={scss.input}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<div
									className={scss.inputText}
									style={{ marginBottom: '15px' }}
								>
									<Controller
										name="announcementContent"
										control={control}
										defaultValue=""
										render={({ field }) => (
											<InputAnnouncement
												{...field}
												type="text"
												label="Введите текст объявления"
											/>
										)}
									/>
								</div>

								<FormControl className={scss.input}>
									<InputLabel
										id="demo-multiple-checkbox-label"
										style={{
											textAlign: 'center',
											background: '#fff'
										}}
									>
										Группы
									</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={personName}
										onChange={handleChange}
										input={<OutlinedInput label="Группы" />}
										renderValue={(selected) => selected.join(', ')}
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
										{groupData &&
											groupData.map((group) => (
												<MenuItem
													key={group.id}
													value={group.groupName}
													onClick={() =>
														handleSelect(group.id, group.groupName)
													}
												>
													<Checkbox
														checked={personName.indexOf(group.groupName) > -1}
													/>
													<ListItemText primary={group.groupName} />
												</MenuItem>
											))}
									</Select>
								</FormControl>

								<div className={scss.date_input}>
									<div className={scss.inputText}>
										<Controller
											name="publishedDate"
											control={control}
											defaultValue=""
											render={({ field }) => (
												<Input
													placeholder="Enter published date"
													width="100%"
													size="medium"
													type="date"
													{...field}
													onChange={(e) => {
														field.onChange(e);
														validatePublishedDate(e.target.value);
													}}
													error={publishedDateErrorVisible}
												/>
											)}
										/>
									</div>
									<div className={scss.inputText}>
										<Controller
											name="expirationDate"
											control={control}
											defaultValue=""
											render={({ field }) => (
												<Input
													placeholder="Enter expiration date"
													width="100%"
													size="medium"
													type="date"
													{...field}
													onChange={(e) => {
														field.onChange(e);
														validateExpirationDate(e.target.value);
													}}
													error={expirationDateErrorVisible}
												/>
											)}
										/>
									</div>
								</div>
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
									disabled={false}
									type="button"
									onClick={handleClose}
									width="117px"
								>
									Отмена
								</ButtonCancel>
								<ButtonSave
									disabled={
										isButtonDisabled ||
										publishedDateErrorVisible ||
										expirationDateErrorVisible
									}
									width="100px"
									type="submit"
									onClick={handleSubmit(onSubmit)}
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

export default AnnouncementForm;
