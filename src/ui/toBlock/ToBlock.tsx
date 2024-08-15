import { FC, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import editPhoto from '@/src/assets/svgs/edit.svg';
import deletePhoto from '@/src/assets/svgs/delete-red.svg';
import LockOpenStudent from '@/src/assets/svgs/lock-open.svg';
import LockBlockStudent from '@/src/assets/svgs/lock.svg';
import DeleteStudentModal from '@/src/ui/customModal/deleteModal/DeleteStudentModal';
import ModalEditStudent from '../customModal/ModalEditStudent';
import IsBlock from '../InstructorModal/IsBlock';

interface StudentMenuItem {
	id: number;
	fullName: string;
	phoneNumber: string;
	email: string;
	groupName: string;
	studyFormat: string;
	isBlock: boolean;
}

interface MenuProps {
	anchorEl: HTMLElement;
	open: boolean;
	onClose: () => void;
	handleOpenDeleteModal: () => void;
	handleCloseDeleteModal: () => void;
	updateCompletedFunc?: () => void;
	item: StudentMenuItem;
	saveIdElement: number;
	openDeleteModal: boolean;
	setFilteredData: React.Dispatch<React.SetStateAction<StudentMenuItem[]>>;
}

const StudentMenu: FC<MenuProps> = ({
	anchorEl,
	open,
	onClose,
	handleOpenDeleteModal,
	handleCloseDeleteModal,
	item,
	saveIdElement,
	openDeleteModal,
	setFilteredData
}) => {
	const [openEditModalState, setOpenEditModalState] = useState(false);
	const [openIsBlockModal, setOpenIsBlockModal] = useState(false);

	const handleCloseEditModal = () => {
		setOpenEditModalState(false);
	};

	const handleOpenEditModal = () => {
		setOpenEditModalState(true);
	};

	const handleOpenIsBlockModal = () => {
		setOpenIsBlockModal(true);
		onClose();
	};

	const handleCloseIsBlockModal = () => {
		setOpenIsBlockModal(false);
	};

	const handleBlockUnblock = () => {
		setFilteredData((prevData) =>
			prevData.map((student) =>
				student.id === saveIdElement
					? { ...student, isBlock: !student.isBlock }
					: student
			)
		);
		setOpenIsBlockModal(false);
	};

	return (
		<div>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={onClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				PaperProps={{
					style: { boxShadow: 'none', border: '1px solid gray' }
				}}
			>
				<MenuItem
					key="edit"
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						handleOpenEditModal();
						onClose();
					}}
				>
					<img src={editPhoto} alt="Edit" />
					Редактировать
				</MenuItem>
				<MenuItem
					key="delete"
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						handleOpenDeleteModal();
						onClose();
					}}
				>
					<img src={deletePhoto} alt="Delete" />
					Удалить
				</MenuItem>
				<MenuItem
					key="block-unblock"
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						handleOpenIsBlockModal();
					}}
				>
					{item?.isBlock ? (
						<>
							<img src={LockOpenStudent} alt="Unlock" /> Разблокировать
						</>
					) : (
						<>
							<img src={LockBlockStudent} alt="Lock" /> Заблокировать
						</>
					)}
				</MenuItem>
			</Menu>
			<ModalEditStudent
				open={openEditModalState}
				handleClose={handleCloseEditModal}
				saveIdElement={saveIdElement}
			/>
			<DeleteStudentModal
				open={openDeleteModal}
				handleCloseModal={handleCloseDeleteModal}
				saveIdElement={saveIdElement}
			/>
			<IsBlock
				openIsBlock={openIsBlockModal}
				handleCloseIsBlock={handleCloseIsBlockModal}
				saveIdElement={saveIdElement}
				isBlock={item?.isBlock}
				handleBlockUnblock={handleBlockUnblock}
			/>
		</div>
	);
};

export default StudentMenu;
