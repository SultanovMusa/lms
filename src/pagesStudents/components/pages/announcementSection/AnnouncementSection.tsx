import { useState } from 'react';
import scss from './AnnouncementSection.module.scss';
import { Pagination, Stack, Tooltip } from '@mui/material';
import { useGetAnnouncementStudentQuery } from '@/src/redux/api/students/announcement';
import { IconArticle, IconBook } from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NotCreatedWithoutButton from '@/src/ui/notCreated/NotCreatedWithoutButton';

const AnnouncementSection = () => {
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(4);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString);
		setSearchParams(searchParams);
		navigate(`/announcements?${searchParams.toString()}`);
	};
	const handleOpenSize = (value: number) => {
		const valueString = value.toString();
		searchParams.set('size', valueString);
		setSearchParams(searchParams);
		navigate(`/announcements?${searchParams.toString()}`);
	};
	const { data } = useGetAnnouncementStudentQuery({
		page: searchParams.toString(),
		size: searchParams.toString()
	});

	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPage(value);
		handleOpenPage(value);
	};

	return (
		<div className={scss.section_announcement}>
			{data !== undefined && <h1>Объявление</h1>}
			<div style={{ minHeight: '70vh' }}>
				{data !== undefined ? (
					<>
						<div className={scss.announce_card}>
							{data?.objects.map((item) => (
								<li key={item.announcementId} className={scss.announce_list}>
									<div className={scss.announcement_owners}>
										<p className={scss.announcement_owner}>
											<span className={scss.announc_user}>Кем создан:</span>
											{item.author}
										</p>
									</div>
									<p className={scss.announce_contents}>
										<span className={scss.announce_content}>Текст:</span>
										<Tooltip title={item.content}>
											<p
												style={{
													width: '100%',
													maxWidth: '250px',
													textOverflow: 'ellipsis',
													overflow: 'hidden',
													whiteSpace: 'nowrap',
													cursor: 'pointer'
												}}
											>
												{item.content}
											</p>
										</Tooltip>
									</p>
								</li>
							))}
						</div>
					</>
				) : (
					<>
						<NotCreatedWithoutButton
							text="Объявление пусто!"
							name="Объявление"
						/>
					</>
				)}
			</div>
			<div className={scss.pagination}>
				<div className={scss.inputs}>
					<p className={scss.text}>Перейти на страницу</p>
					<div className={scss.pagination_element}>
						<IconBook stroke={2} />
					</div>
					<input
						type="text"
						value={openPart}
						onChange={(e) => setOpenPart(+e.target.value)}
						onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
							if (e.key === 'Enter') {
								handleOpenPage(openPart);
							}
						}}
					/>
				</div>
				<div className={scss.stack}>
					<Stack direction="row" spacing={2}>
						<Pagination
							count={data?.totalPages}
							page={openPart}
							onChange={handleChangePage}
							shape="rounded"
							variant="outlined"
						/>
					</Stack>
				</div>
				<div className={scss.inputs}>
					<p className={scss.text}>Показать</p>
					<div className={scss.pagination_element}>
						<IconArticle stroke={2} />
					</div>
					<input
						type="text"
						value={openPage}
						onChange={(e) => setOpenPage(+e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleOpenSize(openPage);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnnouncementSection;
