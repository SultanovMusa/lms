import GreenSwitch from './GreenSwitch';
import scss from './ResultTest.module.scss';
import arrow from '@/src/assets/svgs/arrow-right.svg';

const ResultTest = () => {
	return (
		<div className={scss.Result_test}>
			<div className={scss.top_container}>
				<div className={scss.result}>
					<p>
						<a className={scss.title_result_1} href="#">
							Мои курсы
						</a>
					</p>
					<img src={arrow} alt="" />
					<p>
						<a className={scss.title_result_2} href="#">
							Название курса
						</a>
					</p>
				</div>
				<div>
					<h2 className={scss.title_result}>Материалы</h2>
				</div>
			</div>
			<div className={scss.card_container}>
				<div className={scss.item_top}>
					<a className={scss.card_link} href="#">
						0 ответов
					</a>
				</div>
				<div className={scss.item_bottom}>
					<GreenSwitch />
				</div>
			</div>
			<div className={scss.result_container}>
				<table className={scss.table}>
					<thead>
						<tr>
							<th style={{ textAlign: 'start' }}>№</th>
							<th>Имя Фамилия</th>
							<th>Дата прохождения</th>
							<th>Статус</th>
							<th>Баллы</th>
						</tr>
					</thead>
					<tbody>
						<tr className={scss.table_gray}>
							<td>1</td>
							<td>Jeniffer Lopes</td>
							<td>18.05.2024</td>
							<td>Пройден</td>
							<td>20</td>
						</tr>
						<tr className={scss.table_white}>
							<td>2</td>
							<td>Гулзат Мамытбек</td>
							<td>18.05.2024</td>
							<td>Не пройден</td>
							<td>5</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ResultTest;
