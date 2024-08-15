/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent
} from '@mui/material';
import scss from './EditAnnouncement.module.scss';

import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonDelete from '../customButton/ButtonDelete';
import {
	useGetRatingGroupsQuery,
	useDeleteGroupsMutation
} from '@/src/redux/api/instructor/rating';

interface ModalProps {
	openModalEdit: boolean;
	handleClose: (value: boolean) => void;
	saveId: number | null;
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
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalDeleteGroupOfCourse: FC<ModalProps> = ({
	openModalEdit,
	handleClose,
	saveId
}) => {
	const { data: groupData, isLoading } = useGetRatingGroupsQuery(saveId);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const { handleSubmit } = useForm();
	const [deleteGroups] = useDeleteGroupsMutation();

	const handleChange = (event: SelectChangeEvent<number>) => {
		const { value } = event.target;
		setSelectedId(value as number);
	};

	const onSubmit = async () => {
		try {
			await deleteGroups({
				saveId,
				selectedId
			});
			handleClose(false);
		} catch (error) {
			console.error('Failed to delete group:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={openModalEdit}
				onClose={() => handleClose(false)}
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
						<div className={scss.comText}>Добавить студента в группу курса</div>
					</Typography>

					<Box className={scss.input_form}>
						<div className={scss.input}>
							{isLoading ? (
								<Typography>Loading...</Typography>
							) : (
								<FormControl sx={{ m: 1, width: 300 }} className={scss.input}>
									<InputLabel
										id="demo-multiple-checkbox-label"
										style={{
											paddingLeft: '20px',
											textAlign: 'center'
										}}
									>
										Группы
									</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										value={selectedId || ''}
										onChange={handleChange}
										input={<OutlinedInput label="Группы" />}
										renderValue={(selected) => {
											const groupName = groupData?.find(
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
										{groupData?.map((group) => (
											<MenuItem
												key={group.id}
												value={group.id}
												onClick={() => setSelectedId(group.id)}
											>
												<ListItemText primary={group.groupName} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}

							<Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
								<ButtonCancel
									type="button"
									onClick={() => handleClose(false)}
									width="117px"
									disabled={false}
								>
									Отмена
								</ButtonCancel>
								<ButtonDelete
									type="button"
									onClick={handleSubmit(onSubmit)}
									disabled={false}
								>
									Удалить
								</ButtonDelete>
							</Box>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalDeleteGroupOfCourse;
