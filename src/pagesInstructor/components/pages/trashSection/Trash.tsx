/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import scss from './Trash.module.scss';
import trash from '@/src/assets/svgs/trash (1).svg';
import refrash from '@/src/assets/svgs/refresh.svg';
import {
	useDeleteTrashMutation,
	useGetTrashQuery,
	useUpdatedTrashMutation
} from '@/src/redux/api/instructor/trash';
import { Pagination, Stack, Tooltip } from '@mui/material';
import { IconArticle, IconBook } from '@tabler/icons-react';
import { Box, ScrollArea } from '@mantine/core';
import NotCreatedWithoutButton from '@/src/ui/notCreated/NotCreatedWithoutButton';
import { message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Trash: FC = () => {
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [UpdatedTrash] = useUpdatedTrashMutation();
	const [DeleteTrash] = useDeleteTrashMutation();
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString === '0' ? '1' : valueString);
		setSearchParams(searchParams);
		navigate(`/instructor/trash/?${searchParams.toString()}`);
	};

	const handleInputValuePaginationSize = (value: number) => {
		const valueSize = value.toString();
		searchParams.set('size', valueSize);
		setSearchParams(searchParams);
		navigate(`/instructor/trash/?${searchParams.toString()}`);
	};
	const { data } = useGetTrashQuery({
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

	const updatedTrashFunc = async (id: number) => {
		try {
			await UpdatedTrash(id);
			message.success('Успешно обновлено');
		} catch (error) {
			console.error('Ошибка при обновлении', error);
			message.error('Ошибка при обновлении');
		}
	};

	const DeleteTrashFunc = async (id: number) => {
		try {
			await DeleteTrash(id);
			message.success('Успешно удалено');
		} catch (error: any) {
			console.error('Ошибка при удалении', error);
			if (error.status === 403) {
				message.error('Ошибка: доступ запрещен');
			} else {
				message.error('Ошибка при удалении');
			}
		}
	};

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	return (
		<div className={scss.trash_parent}>
			<div className={scss.container}>
				{data !== undefined ? (
					<>
						<h1>Корзина</h1>
					</>
				) : null}
				<ScrollArea
					type="always"
					scrollbars="xy"
					offsetScrollbars
					classNames={scss}
				>
					<Box>
						<div style={{ minHeight: '64vh' }}>
							{data === undefined ? (
								<>
									<NotCreatedWithoutButton
										name="Корзина"
										text="Корзина пусто !"
									/>
								</>
							) : (
								<>
									<div className={scss.table_container}>
										<div className={scss.text}>
											<p>
												Элементы в корзине автоматически удаляются через 7 дней
												с момента добавления!
											</p>
										</div>
										<div className={scss.trash}>
											<table className={scss.table}>
												<thead>
													<tr>
														<th>Название</th>
														<th className={scss.date}>Дата удаления</th>
														<th className={scss.last_th}>Действие</th>
													</tr>
												</thead>
												<tbody>
													{data?.objects.map((card, index) => (
														<tr
															className={
																index % 2 === 1
																	? scss.table_alternate_row
																	: '' || scss.table_container_second
															}
															key={card.id}
														>
															<td style={{ paddingLeft: '20px' }}>
																<Tooltip title={card.name}>
																	<p
																		style={{
																			width: '100%',
																			maxWidth: '400px',
																			textOverflow: 'ellipsis',
																			overflow: 'hidden',
																			cursor: 'pointer',
																			whiteSpace: 'nowrap'
																		}}
																	>
																		{card.name}
																	</p>
																</Tooltip>
															</td>
															<td
																style={{
																	textAlign: 'end',
																	paddingRight: '70px'
																}}
															>
																{formatDate(card.dateOfDelete)}
															</td>
															<td>
																<div
																	style={{
																		display: 'flex',
																		alignItems: 'end',
																		justifyContent: 'end',
																		gap: '20px',
																		paddingRight: '50px',
																		cursor: 'pointer'
																	}}
																>
																	<button
																		style={{
																			border: 'none',
																			background: 'none',
																			cursor: 'pointer'
																		}}
																		onClick={() => updatedTrashFunc(card.id)}
																	>
																		<img src={refrash} alt="#" />
																	</button>
																	<button
																		style={{
																			border: 'none',
																			background: 'none',
																			cursor: 'pointer'
																		}}
																		onClick={() => DeleteTrashFunc(card.id)}
																	>
																		<img src={trash} alt="#" />
																	</button>
																</div>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</>
							)}
						</div>
					</Box>
				</ScrollArea>

				{data !== undefined && (
					<>
						<div className={scss.pagination}>
							<div className={scss.Inputs}>
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
							<div className={scss.Inputs}>
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
											if (data?.totalObjects && data.totalObjects >= openPage) {
												handleInputValuePaginationSize(openPage);
											}
										}
									}}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Trash;