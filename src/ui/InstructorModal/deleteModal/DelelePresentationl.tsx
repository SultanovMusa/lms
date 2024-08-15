import scss from './DeletePresentation.module.scss';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { message } from 'antd';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeletePresentationMutation } from '@/src/redux/api/instructor/presentation';
import ButtonDelete from '../../customButton/ButtonDelete';

interface DeleteProps {
	openModalDelete: boolean;
	closeModalDelete: (openModalDelete: boolean) => void;
	saveIdElement: number | null;
}

const DeletePresentation: React.FC<DeleteProps> = ({
	openModalDelete,
	closeModalDelete,
	saveIdElement
}) => {
	const [deletePresentation] = useDeletePresentationMutation();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleDelete = async () => {
		if (isSubmitting) return;

		setIsSubmitting(true);
		try {
			await deletePresentation(saveIdElement!).unwrap();
			closeModalDelete(false);
			message.success('Презентация успешно добавлено в корзину!');
		} catch (error) {
			console.error('Failed to delete presentation:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<React.Fragment>
				<div className={scss.Delete}>
					<Dialog
						open={openModalDelete}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						PaperProps={{
							className: scss.dialogPaper
						}}
					>
						<DialogContent style={{ height: 'auto' }}>
							<DialogContentText id="alert-dialog-description">
								<h3>Вы уверены, что хотите удалить презентацию?</h3>
							</DialogContentText>
						</DialogContent>
						<DialogActions className={scss.Buttons}>
							<ButtonCancel
								width="103px"
								type="button"
								disabled={isSubmitting}
								onClick={() => {
									closeModalDelete(false);
								}}
							>
								Отмена
							</ButtonCancel>
							<ButtonDelete
								type="button"
								disabled={isSubmitting}
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

export default DeletePresentation;
