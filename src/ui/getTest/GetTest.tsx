import { useState } from 'react';
import scss from './GetTest.module.scss';
import ButtonSave from '../customButton/ButtonSave';

function GetTest() {
	const [questions, setQuestions] = useState([
		{
			id: 1,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 1, text: ' int ', isCorrect: true, isChecked: false },
				{ id: 2, text: ' float', isCorrect: true, isChecked: false },
				{ id: 3, text: ' double', isCorrect: false, isChecked: false },
				{ id: 4, text: ' bubble', isCorrect: false, isChecked: false }
			]
		},
		{
			id: 2,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 5, text: ' int', isCorrect: true, isChecked: false },
				{ id: 6, text: ' float', isCorrect: true, isChecked: false },
				{ id: 7, text: ' double', isCorrect: true, isChecked: false },
				{ id: 8, text: ' bubble', isCorrect: true, isChecked: false }
			]
		},
		{
			id: 3,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 5, text: ' int', isCorrect: false, isChecked: false },
				{ id: 6, text: ' float', isCorrect: false, isChecked: false },
				{ id: 7, text: ' double', isCorrect: true, isChecked: false },
				{ id: 8, text: ' bubble', isCorrect: true, isChecked: false }
			]
		},
		{
			id: 4,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 5, text: ' int', isCorrect: false, isChecked: false },
				{ id: 6, text: ' float', isCorrect: false, isChecked: false },
				{ id: 7, text: ' double', isCorrect: false, isChecked: false },
				{ id: 8, text: ' bubble', isCorrect: false, isChecked: false }
			]
		}
	]);

	const handleCheckboxChange = (questionId: number, optionId: number) => {
		const updatedQuestions = questions.map((question) =>
			question.id === questionId
				? {
						...question,
						options: question.options.map((option) =>
							option.id === optionId
								? { ...option, isChecked: !option.isChecked }
								: option.isCorrect && option.isChecked
									? { ...option, isChecked: false }
									: option
						)
					}
				: question
		);
		setQuestions(updatedQuestions);
	};

	return (
		<div className={scss.Main_div}>
			<div className={scss.get_test_name_test}>
				<h2>Название теста</h2>
				<p className={scss.get_test_time}>59:39</p>
			</div>
			<div className={scss.testing_container}>
				{questions.map((question) => (
					<div key={question.id} className={scss.question}>
						<div className={scss.get_test_testing_second_container}>
							<h4>{question.id}.</h4>
							<h4>{question.text}</h4>
						</div>
						{question.options.map((option) => (
							<div key={option.id} className={scss.option}>
								<input
									type={
										question.options.filter((opt) => opt.isCorrect).length === 2
											? 'checkbox'
											: 'radio'
									}
									checked={option.isChecked}
									onChange={() => handleCheckboxChange(question.id, option.id)}
									className={option.isCorrect ? scss.correct_checkbox : ''}
								/>
								<label>{option.text}</label>
							</div>
						))}
						<hr className={scss.getTest_hr} />
					</div>
				))}
				<div className={scss.getTest_button}>
					<ButtonSave
						type={'button'}
						width={'92px'}
						children={'Отправить'}
						disabled={false}
						onClick={() => {
							console.log('Отправить');
						}}
					></ButtonSave>
				</div>
			</div>
		</div>
	);
}

export default GetTest;
