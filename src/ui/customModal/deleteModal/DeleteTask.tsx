import scss from './DeleteTeacher.module.scss';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeleteTaskInstructorMutation } from '@/src/redux/api/instructor/addTask';
import ButtonDelete from '../../customButton/ButtonDelete';

interface DeleteProps {
	openModalDelete: boolean;
	closeModalDelete: (openModalDelete: boolean) => void;
	deleteById: number | null;
}

const DeleteTask: React.FC<DeleteProps> = ({
	openModalDelete,
	closeModalDelete,
	deleteById
}) => {
	const [deleteTaskInstructor] = useDeleteTaskInstructorMutation();
	const [loading, setLoading] = useState(false);

	console.log('1111111');

	const handleDelete = async () => {
		if (deleteById !== null) {
			setLoading(true);
			await deleteTaskInstructor(deleteById);
			setLoading(false);
			closeModalDelete(false);
		}
	};

	return (
		<div>
			<React.Fragment>
				<div>
					<Dialog
						open={openModalDelete}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						PaperProps={{
							className: scss.dialog_paper
						}}
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								<h3>Вы уверены, что хотите удалить этого задание?</h3>
							</DialogContentText>
						</DialogContent>
						<DialogActions className={scss.buttons}>
							<ButtonCancel
								width="103px"
								type="button"
								disabled={loading}
								onClick={() => {
									closeModalDelete(false);
								}}
							>
								отмена
							</ButtonCancel>
							<ButtonDelete
								type="button"
								disabled={loading}
								onClick={handleDelete}
							>
								Удалить
							</ButtonDelete>
						</DialogActions>
					</Dialog>
				</div>
			</React.Fragment>
		</div>
	);
};

export default DeleteTask;
