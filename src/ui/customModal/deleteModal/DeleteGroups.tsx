import React from 'react';
import { message } from 'antd';
import scss from './DeleteGroupsModal.module.scss';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeleteGroupMutation } from '@/src/redux/api/admin/groups';
import ButtonDelete from '../../customButton/ButtonDelete';

interface DeleteProps {
	openModalDelete: boolean;
	closeModalDelete: (openModalDelete: boolean) => void;
	deleteById: number | null;
}

const DeleteGroupModal: React.FC<DeleteProps> = ({
	openModalDelete,
	closeModalDelete,
	deleteById
}) => {
	const [deleteGroup] = useDeleteGroupMutation();
	const [messageApi, contextHolder] = message.useMessage();

	const handleDelete = async () => {
		try {
			await deleteGroup(deleteById!).unwrap();
			messageApi.success('Группа успешно добавлено в корзину!');
			closeModalDelete(false);
		} catch (error) {
			messageApi.error('Failed to delete group');
			console.error('Error deleting group:', error);
		}
	};

	return (
		<div>
			{contextHolder}
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
								<p>Вы уверены, что хотите удалить группу?</p>
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
								type="submit"
								disabled={false}
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

export default DeleteGroupModal;
