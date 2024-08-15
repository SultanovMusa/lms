import scss from './DeleteAnnouncement.module.scss';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeleteAnnouncementTableMutation } from '@/src/redux/api/admin/announcement';
import ButtonDelete from '../../customButton/ButtonDelete';
import { message } from 'antd';

interface DeleteProps {
	openModalDelete: boolean;
	closeModalDelete: (openModalDelete: boolean) => void;
	saveIdElement: number | null;
}

const DeleteAnnouncementModal: React.FC<DeleteProps> = ({
	openModalDelete,
	closeModalDelete,
	saveIdElement
}) => {
	const [deleteAnnouncementTable] = useDeleteAnnouncementTableMutation();

	const handleDelete = async () => {
		try {
			await deleteAnnouncementTable(saveIdElement!);
			message.success('Объявление успешно добавлено в корзину!');
			closeModalDelete(false);
		} catch (error) {
			console.error('Ошибка при удалении объявления:', error);
			message.error('Ошибка при выполнении операции');
		}
	};

	return (
		<div>
			<React.Fragment>
				<div className={scss.dialog_paper}>
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
								<h3>Вы уверены, что хотите удалить объявления?</h3>
							</DialogContentText>
						</DialogContent>
						<DialogActions
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
								width="103px"
								type="button"
								disabled={false}
								onClick={() => {
									closeModalDelete(false);
								}}
							>
								отмена
							</ButtonCancel>
							<ButtonDelete
								onClick={handleDelete}
								type="submit"
								disabled={false}
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

export default DeleteAnnouncementModal;
