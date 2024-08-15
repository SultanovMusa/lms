import { Button, MenuItem } from '@mui/material';
import scss from './Presentation.module.scss';
import Menu from '@mui/material/Menu';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { useGetPresentationQuery } from '@/src/redux/api/instructor/presentation';
import EditPresentation from '@/src/ui/InstructorModal/EditPresentation';
import DeletePresentation from '@/src/ui/InstructorModal/deleteModal/DelelePresentationl';
import ModalPresentation from '@/src/ui/InstructorModal/ModalPresentation';
import ModalAddPresentation from '@/src/ui/InstructorModal/ModalAddPresentation';
import { useParams } from 'react-router-dom';
import empty from '@/src/assets/notCreated0.png';
import Tooltip from '@mui/material/Tooltip';

const Presentation = () => {
	const [open1, setOpen1] = useState<boolean>(false);
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const { lessonId } = useParams();
	const test = Number(lessonId);
	const { data } = useGetPresentationQuery(test);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [saveIdElement, setSaveIdElement] = useState<null | number>(null);
	const [openPresentation, setOpenPresentation] = useState<boolean>(false);
	const [presentationModal, setPresentationModal] = useState<null | number>(
		null
	);

	useEffect(() => {
		const open1State = localStorage.getItem('open1') === 'true';
		const openEditState = localStorage.getItem('openEdit') === 'true';
		const openDeleteState = localStorage.getItem('openDelete') === 'true';
		const openPresentationState =
			localStorage.getItem('openPresentation') === 'true';
		const presentationModalState = localStorage.getItem('presentationModal');

		setOpen1(open1State);
		setOpenEdit(openEditState);
		setOpenDelete(openDeleteState);
		setOpenPresentation(openPresentationState);
		if (presentationModalState) {
			setPresentationModal(Number(presentationModalState));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('open1', open1.toString());
		localStorage.setItem('openEdit', openEdit.toString());
		localStorage.setItem('openDelete', openDelete.toString());
		localStorage.setItem('openPresentation', openPresentation.toString());
		if (presentationModal !== null) {
			localStorage.setItem('presentationModal', presentationModal.toString());
		} else {
			localStorage.removeItem('presentationModal');
		}
	}, [open1, openEdit, openDelete, openPresentation, presentationModal]);

	const openPresentationFunc = (id: number) => {
		setPresentationModal(id);
		setOpenPresentation(true);
	};

	const closePresentation = () => {
		setOpenPresentation(false);
		setPresentationModal(null);
	};

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseDrop = () => {
		setAnchorEl(null);
	};

	const handleClose = () => {
		setOpen1(false);
	};

	const handleOpen = () => {
		setOpen1(true);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const handleOpenEdit = () => {
		setOpenEdit(true);
	};

	const openDeleteFunc = () => {
		setOpenDelete(true);
	};

	const closeDeleteFunc = () => {
		setOpenDelete(false);
	};

	useEffect(() => {
		if (openPresentation) {
			// Вы можете добавить логику обработки открытия модального окна здесь при необходимости
		}
	}, [openPresentation]);

	return (
		<div className={scss.presentation}>
			<div
				style={{
					display: 'flex',
					paddingInline: '20px',
					justifyContent: 'flex-end'
				}}
			>
				<Button
					size="large"
					className={scss.button}
					variant="contained"
					onClick={handleOpen}
				>
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span style={{ textTransform: 'none' }}>Добавить презентацию</span>
				</Button>
			</div>
			<div className={scss.card}>
				{data?.length ? (
					data.map((item) => (
						<div key={item.id} className={scss.content}>
							<div className={scss.cards}>
								<div className={scss.photo}>
									<iframe
										style={{ height: '200px' }}
										className={scss.iframe}
										src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${item.file}`}
										frameBorder="0"
									></iframe>
									<div className={scss.button_watch}>
										<Button
											sx={{
												borderRadius: '8px',
												textTransform: 'capitalize',
												background: '#0000ff7f',
												'&:hover': {
													background: '#0000ffb2'
												}
											}}
											size="medium"
											variant="contained"
											onClick={() => openPresentationFunc(item.id)}
										>
											Смотреть
										</Button>
									</div>
								</div>
								<div className={scss.title}>
									<div className={scss.text}>
										<Tooltip title={item.title}>
											<h1>{item.title}</h1>
										</Tooltip>
										<Tooltip title={item.description}>
											<p>{item.description}</p>
										</Tooltip>
									</div>
									<div className={scss.dots}>
										<div onClick={handleClick}>
											<button
												onClick={() => {
													setSaveIdElement(item.id);
												}}
												className={scss.button}
												aria-controls={open ? 'basic-menu' : undefined}
												aria-haspopup="true"
											>
												<IconDotsVertical stroke={2} />
											</button>
										</div>
										<Menu
											anchorEl={anchorEl}
											id="positioned-menu"
											open={open}
											onClose={handleCloseDrop}
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
												style={{ display: 'flex', gap: '10px' }}
												onClick={() => {
													handleOpenEdit();
													handleCloseDrop();
												}}
											>
												<img src={editImg} alt="Edit" />
												<p>Редактировать</p>
											</MenuItem>
											<MenuItem
												style={{ display: 'flex', gap: '10px' }}
												onClick={() => {
													openDeleteFunc();
													handleCloseDrop();
												}}
											>
												<img src={deleteImg} alt="Delete" />
												<p>Удалить</p>
											</MenuItem>
										</Menu>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div className={scss.empty_page}>
						<img src={empty} alt="" />
					</div>
				)}
			</div>
			<ModalAddPresentation handleClose={handleClose} open={open1} />
			<EditPresentation
				open={openEdit}
				handleClose={handleCloseEdit}
				presentationId={saveIdElement}
			/>
			<DeletePresentation
				openModalDelete={openDelete}
				closeModalDelete={closeDeleteFunc}
				saveIdElement={saveIdElement}
			/>
			<ModalPresentation
				saveId={presentationModal}
				open={openPresentation}
				handleClose={closePresentation}
			/>
		</div>
	);
};

export default Presentation;
