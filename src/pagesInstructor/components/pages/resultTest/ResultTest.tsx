import GreenSwitch from './GreenSwitch';
import scss from './ResultTest.module.scss';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import TestModal from '@/src/ui/customModal/testModal/TestModal';
import { useGetResultTestQuery } from '@/src/redux/api/instructor/resultTest';

const ResultTest = () => {
	const { testId } = useParams();
	const test = Number(testId);
	const { data } = useGetResultTestQuery(test);
	const [isTrue, setIsTrue] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [saveId, setSaved] = useState<boolean | number>(false);

	const handleClose = () => {
		setOpenModal(false);
	};
	const handleOpen = () => {
		setOpenModal(true);
	};

	return (
		<div className={scss.Result_test}>
			<div className={scss.top_container}>
				<div>
					<h2 className={scss.title_result}>Материалы</h2>
				</div>
			</div>
			<div className={!isTrue ? scss.card_container : scss.card_container2}>
				<div className={scss.item_top}>
					<p className={scss.card_link}>0 ответов</p>
				</div>
				<div className={scss.item_bottom}>
					<GreenSwitch isTrue={isTrue} setIsTrue={setIsTrue} />
				</div>
			</div>
			<div className={scss.result_container}>
				<table className={scss.table}>
					<thead>
						<tr>
							<th style={{ textAlign: 'start', paddingLeft: '20px' }}>№</th>
							<th onClick={handleOpen}>Имя Фамилия</th>
							<th>Статус</th>
							<th
								style={{ textAlign: 'end', paddingRight: '30px' }}
								className={scss.Points}
							>
								Баллы
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.studentTestResponses.map((item, index) => (
							<>
								<tr
									className={
										(index + 1) % 2 == 0 ? scss.table_gray : scss.tadle_white
									}
									onClick={() => {
										setSaved(item.resultTestId);
										handleOpen();
									}}
								>
									<td style={{ paddingLeft: '23px' }}>{index + 1}</td>
									<td>{item.fullName}</td>
									<td>
										{item.isPassed === true ? <>Пройден</> : <>Не пройден</>}
									</td>

									<td style={{ textAlign: 'end', paddingRight: '50px' }}>
										{item.point}
									</td>
								</tr>
							</>
						))}
					</tbody>
				</table>
			</div>
			<TestModal
				openModal={openModal}
				handleClose={handleClose}
				saveId={saveId}
			/>
		</div>
	);
};

export default ResultTest;
