import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeleteLinkMutation } from '@/src/redux/api/instructor/link';
import ButtonDelete from '../../customButton/ButtonDelete';
import { message } from 'antd';

interface DeleteLinkProps {
	openModalDelete: boolean;
	closeModalDelete: (openModalDelete: boolean) => void;
	saveIdElement: number | boolean;
}

const DeleteLink: React.FC<DeleteLinkProps> = ({
	openModalDelete,
	closeModalDelete,
	saveIdElement
}) => {
	const [deleteLink] = useDeleteLinkMutation();
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		if (!loading && typeof saveIdElement === 'number') {
			setLoading(true);
			try {
				await deleteLink(saveIdElement);
				message.success('Ссылка успешно добавлено в корзину!');
				closeModalDelete(false);
			} catch (error) {
				message.error('Ошибка при удалении ссылки');
				console.error('Failed to delete link:', error);
			} finally {
				setLoading(false);
			}
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
						PaperProps={{}}
					>
						<DialogContent style={{ height: 'auto' }}>
							<DialogContentText id="alert-dialog-description">
								<h3>Вы уверены, что хотите удалить ссылку?</h3>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<ButtonCancel
								width="103px"
								type="button"
								disabled={loading}
								onClick={() => {
									closeModalDelete(false);
								}}
							>
								Отмена
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

export default DeleteLink;
