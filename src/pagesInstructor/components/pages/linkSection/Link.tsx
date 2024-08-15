import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import scss from './Link.module.scss';
import { useGetLinkQuery } from '@/src/redux/api/instructor/link';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import ModalAddLink from '@/src/ui/InstructorModal/ModalAddLink';
import EditLink from '@/src/ui/InstructorModal/EditLink';
import DeleteLink from '@/src/ui/InstructorModal/deleteLink/DeleteLink';
import { useParams } from 'react-router-dom';
import empty from '@/src/assets/notCreated0.png';

interface LinkData {
	id: number;
	title: string;
	url: string;
}

const Link = () => {
	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const { lessonId } = useParams<{ lessonId: string }>();
	const lesson = Number(lessonId);
	const { data } = useGetLinkQuery(lesson);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedLinkId, setSelectedLinkId] = useState<number | boolean>(false);
	const [isDeleteId, setIsDeleteId] = useState<number | null>(null);
	const [isEditId, setIsEditId] = useState<number | null>(null);
	const openMenu = Boolean(anchorEl);

	console.log(isDeleteId, isEditId);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
		setIsDeleteId(null);
	};

	const handleOpenAdd = () => {
		setOpenAdd(true);
	};

	const handleCloseAdd = () => {
		setOpenAdd(false);
	};

	const handleOpenEdit = (id: number) => {
		setOpenEdit(true);
		setIsEditId(id);
		setAnchorEl(null);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
		setSelectedLinkId(false);
		setIsEditId(null);
	};

	const handleOpenDelete = (id: number) => {
		setOpenDelete(true);
		setIsDeleteId(id);
		setAnchorEl(null);
	};

	const handleCloseDelete = () => {
		setOpenDelete(false);
		setSelectedLinkId(false);
	};

	return (
		<div className={scss.link}>
			<div
				style={{
					display: 'flex',
					paddingInline: '20px',
					justifyContent: 'flex-end'
				}}
			>
				<div className={scss.buttons}>
					<Button
						size="large"
						className={scss.button}
						variant="contained"
						onClick={handleOpenAdd}
					>
						<div className={scss.icon}>
							<IconPlus stroke={2} />
						</div>
						<span style={{ textTransform: 'none' }}>Добавить ссылку</span>
					</Button>
				</div>
			</div>

			{data?.objects && data.objects.length > 0 ? (
				<div className={scss.card}>
					{data?.objects?.map((link: LinkData) => (
						<div className={scss.cards} key={link.id}>
							<div className={scss.title}>
								<div className={scss.text}>
									<Tooltip title={link.title}>
										<p>
											<a
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
											>
												{link.title}
											</a>
										</p>
									</Tooltip>
								</div>
								<div className={scss.dots}>
									<button
										onClick={(e) => {
											handleMenuClick(e);
											setSelectedLinkId(link.id);
										}}
										className={scss.button}
										aria-controls={openMenu ? 'basic-menu' : undefined}
										aria-haspopup="true"
									>
										<IconDotsVertical stroke={2} />
									</button>
									<Menu
										anchorEl={anchorEl}
										id="positioned-menu"
										open={openMenu}
										onClose={handleCloseMenu}
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
											onClick={() => handleOpenEdit(link.id)}
										>
											<img src={editImg} alt="Edit" />
											<p>Редактировать</p>
										</MenuItem>
										<MenuItem
											style={{ display: 'flex', gap: '10px' }}
											onClick={() => handleOpenDelete(link.id)}
										>
											<img src={deleteImg} alt="Delete" />
											<p>Удалить</p>
										</MenuItem>
									</Menu>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className={scss.empty_page}>
					<img src={empty} alt="" />
				</div>
			)}

			<ModalAddLink handleCloseLink={handleCloseAdd} open={openAdd} />
			<EditLink
				open={openEdit}
				handleClose={handleCloseEdit}
				resultId={selectedLinkId}
			/>
			<DeleteLink
				openModalDelete={openDelete}
				closeModalDelete={handleCloseDelete}
				saveIdElement={selectedLinkId}
			/>
		</div>
	);
};

export default Link;
