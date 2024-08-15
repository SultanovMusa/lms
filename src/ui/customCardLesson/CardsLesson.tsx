import scss from './CardsLesson.module.scss';
import Video from '@/src/assets/icons/icon-Video';
import Presentation from '@/src/assets/icons/icon-Presentation-LaptopScreen';
import File from '@/src/assets/icons/icon-File';
import Link from '@/src/assets/icons/icon-Link';
import ArrowToDown from '@/src/assets/icons/icon-arrowToDown';

const CardsLesson = () => {
	return (
		<div className={scss.CardsLesson}>
			<div className={scss.container}>
				<div className={scss.top_content}>
					<div className={scss.pen}>
						<img
							className={scss.pen_img}
							src="../../assets/svgs/pen.svg"
							alt="penImg"
						/>
						<h1 className={scss.text_lesson}>Lesson_1</h1>
					</div>
					<div className={scss.arrow_del}>
						<div className={scss.add_arrow}>
							<a className={scss.add_text} href="#">
								Добавить
							</a>
							<a href="#">
								<ArrowToDown />
							</a>
						</div>
						<div>
							<a href="#">
								<img src="../../assets/svgs/delete-red.svg" alt="" />
							</a>
						</div>
					</div>
				</div>
				<div className={scss.bottom_content}>
					<div className={scss.screen_content}>
						<Video />
						<a className={scss.text_screen} href="#">
							Видеоурок
						</a>

						<div className={scss.btn_screen1}>
							<img src="../../assets/svgs/pen-green.svg" alt="" />
							<a className={scss.pen_edit_del} href="#">
								Редактировать
							</a>
						</div>
						<div className={scss.btn_screen2}>
							<img src="../../assets/svgs/delete-red.svg" alt="" />
							<a className={scss.pen_edit_del} href="#">
								Удалить
							</a>
						</div>
					</div>

					<div className={scss.screen_content}>
						<Presentation />
						<a className={scss.text_screen} href="#">
							Презентация
						</a>
						<div className={scss.btn_screen1}>
							<img src="../../assets/svgs/pen-green.svg" alt="" />
							<a className={scss.pen_edit_del} href="#">
								Редактировать
							</a>
						</div>
						<div className={scss.btn_screen2}>
							<img src="../../assets/svgs/delete-red.svg" alt="" />
							<a className={scss.pen_edit_del} href="#">
								Удалить
							</a>
						</div>
					</div>
					<div className={scss.screen_content}>
						<File />
						<a className={scss.text_screen} href="#">
							Задание
						</a>
					</div>
					<div className={scss.screen_content}>
						<Link />
						<a className={scss.text_screen} href="#">
							Ссылка
						</a>
					</div>
					<div className={scss.screen_content}>
						<img src="../../assets/svgs/letter-BA.svg" alt="letter-BA" />
						<a className={scss.text_screen} href="#">
							Тест
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardsLesson;
