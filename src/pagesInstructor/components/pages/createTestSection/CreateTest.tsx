/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from 'react';
import { IconCopy } from '@tabler/icons-react';
import { IconDelete } from '@/src/assets/icons';
import { Select } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostTestMutation } from '@/src/redux/api/instructor/test';
import scss from './CreateTest.module.scss';
import Input from '@/src/ui/customInput/Input';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCircle from '@/src/ui/customButton/ButtonCircle';

interface OptionResponse {
	option: string;
	isTrue: boolean;
}

interface QuestionRequest {
	title: string;
	point: string;
	questionType: string;
	optionRequests: OptionResponse[];
}

interface Option {
	value: string;
	isTrue: boolean;
}
interface TestRequest {
	title: string;
	hour: string;
	minute: string;
	questionRequests: QuestionRequest[];
}

interface CopyData {
	inputValue3: string;
	inputValue4: string;
	option: string;
	inputs: { value: string; visible: boolean; isTrue: boolean }[];
}
interface Question {
	id: number;
	value: string;
	visible: boolean;
	options: Option[];
	title: string;
	point: string;
	questionType: string;
	optionRequests: OptionResponse[];
}

const CreateTest = () => {
	const { control, handleSubmit, reset } = useForm();
	const [option, setOption] = useState('SINGLE');
	const [time, setTime] = useState('00:00');
	const navigate = useNavigate();
	const [inputs, setInputs] = useState<
		{ id: number; value: string; visible: boolean; isTrue: boolean }[]
	>([{ id: 1, value: '', visible: true, isTrue: false }]);
	// const [copiesData, setCopiesData] = useState<CopyData[]>([]);
	const [titleValue, setTitleValue] = useState('');
	const [pointValue, setPointValue] = useState('');
	const [postTest] = usePostTestMutation();
	const { courseId, lessonId } = useParams();
	const [copiesData, setCopiesData] = useState([
		{
			inputValue3: '',
			inputValue4: '',
			inputs: [{ value: '', visible: true, isTrue: false }],
			option: 'SINGLE'
		}
	]);

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setTime(event.target.value);
	const handleChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitleValue(e.target.value);
	const handleChangePointValue = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPointValue(e.target.value);

	const handleAddInput = () =>
		setInputs([
			...inputs,
			{ id: inputs.length + 1, value: '', visible: true, isTrue: false }
		]);
	const handleOptionClick = (selectedOption: string) => {
		setOption(selectedOption);
		if (selectedOption === 'SINGLE') {
			const newInputs = inputs.map((input, index) => ({
				...input,
				isTrue: index === 0 ? input.isTrue : false
			}));
			setInputs(newInputs);
		}
	};

	const handleCopy = (copyDataIndex: number) => {
		console.log('Copying index:', copyDataIndex); // Debugging log
		const newCopyData = JSON.parse(JSON.stringify(copiesData[copyDataIndex]));
		setCopiesData([...copiesData, newCopyData]);
		console.log('New copiesData:', copiesData); // Debugging log
	};

	const handleDelete = (copyDataIndex: number) => {
		setCopiesData(copiesData.filter((_, index) => index !== copyDataIndex));
	};

	const handleCopies = () => {
		const newCopyData = {
			inputValue3: '',
			inputValue4: '',
			inputs: [{ value: '', visible: true, isTrue: false }],
			option: 'SINGLE'
		};
		setCopiesData([...copiesData, newCopyData]);
	};

	const handleAddInputOption = (copyDataIndex: number) => {
		const updatedCopiesData = [...copiesData];
		updatedCopiesData[copyDataIndex].inputs.push({
			value: '',
			visible: true,
			isTrue: false
		});
		setCopiesData(updatedCopiesData);
	};

	const onSubmit = async (data) => {
		const initialQuestion: QuestionRequest = {
			title: titleValue,
			point: pointValue,
			questionType: option,
			optionRequests: inputs.map((input) => ({
				option: input.value,
				isTrue: input.isTrue
			}))
		};

		const copiedQuestions = copiesData.map((copyData) => {
			return {
				title: copyData.inputValue3,
				point: copyData.inputValue4,
				questionType: copyData.option === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
				optionRequests: copyData.inputs.map((input) => ({
					option: input.value,
					isTrue: input.isTrue
				}))
			};
		});

		const questionRequests: QuestionRequest[] = [
			initialQuestion,
			...copiedQuestions
		];

		const newTest: TestRequest = {
			title: data.title,
			hour: time.split(':')[0],
			minute: time.split(':')[1],
			questionRequests: questionRequests
		};

		const response = await postTest({ newTest, lessonId });
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/test`);
		reset();
	};

	const renderInputFields = (inputs: Question[], setInputs, option: string) =>
		inputs.map(
			(input, index: number) =>
				input.visible && (
					<div key={index} className={scss.input_div}>
						{option === 'SINGLE' ? (
							<div className={scss.radio_checkbox}>
								<label>
									<input
										style={{ cursor: 'pointer' }}
										type="radio"
										name={`option_${index}`}
										checked={inputs[index].isTrue}
										onChange={(e) => {
											const newInputs = inputs.map((input, idx) => ({
												...input,
												isTrue: idx === index
											}));
											newInputs[index].isTrue = e.target.checked;
											setInputs(newInputs);
										}}
									/>
								</label>
							</div>
						) : (
							<div className={scss.radio_checkbox}>
								<label>
									<input
										style={{ cursor: 'pointer' }}
										type="checkbox"
										name={`option_${index}`}
										checked={inputs[index].isTrue}
										onChange={(e) => {
											const newInputs = [...inputs];
											newInputs[index].isTrue = e.target.checked;
											setInputs(newInputs);
										}}
									/>
								</label>
							</div>
						)}
						<div className={scss.variant_inputs}>
							<Controller
								name={`Вариант ${index + 1}`}
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										size="small"
										placeholder={`Вариант ${index + 1}`}
										type="text"
										value={input.value}
										onChange={(e) => {
											const newInputs = [...inputs];
											newInputs[index].value = e.target.value;
											setInputs(newInputs);
										}}
										width="100%"
									/>
								)}
							/>
							<div className={scss.notice}>
								<button
									className={scss.button_cancel}
									type="button"
									onClick={() => {
										const newInputs = [...inputs];
										newInputs.splice(index, 1);
										setInputs(newInputs);
									}}
								>
									<span className={scss.delete_icon}>&times;</span>
								</button>
							</div>
						</div>
					</div>
				)
		);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={scss.test}>
				<h1>Материалы</h1>
				<div className={scss.name_of_the_test}>
					<h2>Название теста</h2>
					<div className={scss.container}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										{...field}
										placeholder="Введи название теста"
										size="small"
										width="100%"
									/>
								)}
							/>
						</div>
						<div className={scss.input_time}>
							<p>Время прохождения теста</p>
							<input
								className={scss.time_inputs}
								name="time"
								type="time"
								value={time}
								onChange={handleTimeChange}
							/>
							<p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
								<span>Тип теста</span>
								<Select
									placeholder="  Тип теста:"
									data={['Soft', 'Medium', 'Hard']}
									defaultValue="soft"
									clearable
								/>
							</p>
						</div>
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
					<div className={scss.div_component2}>
						<div className={scss.input_contain2}>
							<div className={scss.input_text}>
								<h2 className={scss.h2_number}>1</h2>
								<Controller
									name="titleValue"
									control={control}
									render={({ field }) => (
										<Input
											type="text"
											placeholder="Вопрос"
											width="100%"
											size="small"
											{...field}
											value={titleValue}
											onChange={handleChangeTitleValue}
										/>
									)}
								/>
								<Controller
									name="pointValue"
									control={control}
									render={({ field }) => (
										<Input
											type="number"
											placeholder="Введите кол-во баллов"
											width="100%"
											size="small"
											{...field}
											value={pointValue}
											onChange={handleChangePointValue}
										/>
									)}
								/>
								<div className={scss.radio_input}>
									<label style={{ display: 'flex', gap: '5px' }}>
										<input
											style={{ cursor: 'pointer' }}
											type="checkbox"
											name="option"
											checked={option === 'SINGLE'}
											onChange={() => handleOptionClick('SINGLE')}
										/>
										Один <span>из списка</span>
									</label>
									<label style={{ display: 'flex', gap: '5px' }}>
										<input
											style={{ cursor: 'pointer' }}
											type="checkbox"
											name="option"
											checked={option === 'MULTIPLE'}
											onChange={() => handleOptionClick('MULTIPLE')}
										/>
										Несколько <span>из списка</span>
									</label>
								</div>
							</div>
							<div className={scss.div_text2}>
								<div className={scss.components}>
									{renderInputFields(inputs, setInputs, option)}
									<p className={scss.p_text2}>
										<a
											style={{ color: '#258aff' }}
											href="#"
											onClick={handleAddInput}
										>
											Добавить вариант
										</a>
										<div style={{ display: 'flex', gap: '15px' }}>
											<div
												className={scss.copy_icon}
												onClick={() => handleCopy(0)}
											>
												<IconCopy />
											</div>
											<div className={scss.delete_icon}>
												<IconDelete />
											</div>
										</div>
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* CopiesData */}
					{copiesData.map((copyData, copyIndex) => (
						<div key={copyIndex} className={scss.div_component2}>
							<div className={scss.input_contain2}>
								<div className={scss.input_text}>
									<h2 className={scss.h2_number}>{copyIndex + 2}</h2>
									<Controller
										name={`copyData_${copyIndex}_inputValue3`}
										control={control}
										render={({ field }) => (
											<Input
												type="text"
												placeholder="Вопрос"
												width="100%"
												size="small"
												{...field}
												value={copyData.inputValue3}
												onChange={(e) => {
													const updatedCopiesData = [...copiesData];
													updatedCopiesData[copyIndex].inputValue3 =
														e.target.value;
													setCopiesData(updatedCopiesData);
												}}
											/>
										)}
									/>
									<Controller
										name={`copyData_${copyIndex}_inputValue4`}
										control={control}
										render={({ field }) => (
											<Input
												type="number"
												placeholder="Введите кол-во баллов"
												width="100%"
												size="small"
												{...field}
												value={copyData.inputValue4}
												onChange={(e) => {
													const updatedCopiesData = [...copiesData];
													updatedCopiesData[copyIndex].inputValue4 =
														e.target.value;
													setCopiesData(updatedCopiesData);
												}}
											/>
										)}
									/>
									<div className={scss.radio_input}>
										<label style={{ display: 'flex', gap: '5px' }}>
											<input
												style={{ cursor: 'pointer' }}
												type="checkbox"
												name="options"
												checked={copyData.option === 'SINGLE'}
												onChange={() => {
													const updatedCopiesData = [...copiesData];
													updatedCopiesData[copyIndex].option = 'SINGLE';
													setCopiesData(updatedCopiesData);
												}}
											/>
											Один <span>из списка</span>
										</label>
										<label style={{ display: 'flex', gap: '5px' }}>
											<input
												style={{ cursor: 'pointer' }}
												type="checkbox"
												name="options"
												checked={copyData.option === 'MULTIPLE'}
												onChange={() => {
													const updatedCopiesData = [...copiesData];
													updatedCopiesData[copyIndex].option = 'MULTIPLE';
													setCopiesData(updatedCopiesData);
												}}
											/>
											Несколько <span>из списка</span>
										</label>
									</div>
								</div>
								<div className={scss.div_text2}>
									<div className={scss.components}>
										{renderInputFields(
											copyData.inputs,
											(updatedInputs) => {
												const updatedCopiesData = [...copiesData];
												updatedCopiesData[copyIndex].inputs = updatedInputs;
												setCopiesData(updatedCopiesData);
											},
											copyData.option
										)}
										<p className={scss.p_text2}>
											<a
												style={{ color: '#258aff' }}
												href="#"
												onClick={() => handleAddInputOption(copyIndex)}
											>
												Добавить вариант
											</a>
											<div style={{ display: 'flex', gap: '15px' }}>
												<div
													className={scss.copy_icon}
													onClick={() => handleCopy(copyIndex)}
												>
													<IconCopy />
												</div>
												<div
													className={scss.delete_icon}
													onClick={() => handleDelete(copyIndex)}
												>
													<IconDelete />
												</div>
											</div>
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={scss.button_contain}>
					<ButtonCancel
						onClick={() => {}}
						width="100px"
						type={'button'}
						disabled={false}
					>
						Отмена
					</ButtonCancel>
					<ButtonSave
						onClick={() => {}}
						width="30px"
						type="submit"
						disabled={false}
					>
						Сохранить
					</ButtonSave>
				</div>
				<div className={scss.button_circle}>
					<ButtonCircle
						onClick={handleCopies}
						type="button"
						disabled={false}
						children={undefined}
					></ButtonCircle>
				</div>
			</div>
		</form>
	);
};

export default CreateTest;
