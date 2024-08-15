/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Input from '@/src/ui/customInput/Input';
import scss from './EditTest.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCircle from '@/src/ui/customButton/ButtonCircle';
import { Select } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
	useEditTestMutation,
	useGetInsideTestQuery
} from '@/src/redux/api/instructor/test';
import { IconCopy } from '@tabler/icons-react';
import { IconDelete } from '@/src/assets/icons';

interface Option {
	value: string;
	isTrue: boolean;
}

interface Question {
	value?: string;
	options: Option[];
	title: string;
	point: string;
}

interface Test {
	title: string;
	hour: string;
	minute: string;
	questionRequests: Question[];
}

interface FormData {
	[key: string]: string | undefined;
}

const EditTest: React.FC = () => {
	const { control, handleSubmit, reset } = useForm();
	const { getTaskId } = useParams<{ getTaskId: string }>();
	const getTask = Number(getTaskId);
	const { data } = useGetInsideTestQuery(getTask);
	const [editTest] = useEditTestMutation();
	const [time, setTime] = useState<string>('');
	const [inputs, setInputs] = useState<Question[]>([]);
	const [copiesData, setCopiesData] = useState<Question[]>([]);
	const [option, setOption] = useState<'SINGLE' | 'MULTIPLE'>('SINGLE');

	useEffect(() => {
		if (data) {
			setTime(`${data.hour}:${data.minute}`);
			setInputs(
				data.questionResponseList.map((question) => ({
					options: question.optionResponses.map((option) => ({
						value: option.option,
						isTrue: option.isTrue
					})),
					title: question.title,
					point: question.point.toString()
				}))
			);
			setCopiesData([]);
		}
	}, [data]);

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTime(event.target.value);
	};

	const handleOptionClick = (selectedOption: 'SINGLE' | 'MULTIPLE') => {
		setOption(selectedOption);
	};

	const onSubmit = async (formData: FormData) => {
		const initialQuestions = inputs.map((input, index) => ({
			title: formData[`titleValue_${index}`],
			point: formData[`pointValue_${index}`],
			options: input.options.map((option, optionIndex) => ({
				option: formData[`optionValue_${index}_${optionIndex}`],
				isTrue:
					formData[`option_${index}_isTrue_${optionIndex}`] === 'on'
						? true
						: false
			}))
		}));

		const copiedQuestions = copiesData.map((copyData, index) => ({
			title: formData[`copyData_${index}_inputValue3`],
			point: formData[`copyData_${index}_inputValue4`],
			options: copyData.options.map((option, optionIndex) => ({
				option: formData[`copyData_${index}_optionValue_${optionIndex}`],
				isTrue:
					formData[`copyData_${index}_option_${optionIndex}_isTrue`] === 'on'
						? true
						: false
			}))
		}));

		const allQuestions = [...initialQuestions, ...copiedQuestions];

		const newTest: Test = {
			title: formData.title!,
			hour: time.split(':')[0],
			minute: time.split(':')[1],
			questionRequests: allQuestions
		};

		try {
			const response = await editTest({ newTest, getTaskId });
			console.log(response, 'response');
			reset();
		} catch (error) {
			console.error(error);
		}
	};

	const handleCopy = (index: number) => {
		const copiedQuestion = JSON.parse(JSON.stringify(inputs[index]));
		setInputs([...inputs, copiedQuestion]);
	};

	const handleDelete = (index: number) => {
		const newInputs = [...inputs];
		newInputs.splice(index, 1);
		setInputs(newInputs);
	};

	const handleCopies = () => {
		const newCopyData: Question = {
			options: [{ value: '', isTrue: false }],
			title: '',
			point: ''
		};
		setInputs([...inputs, newCopyData]);
	};

	const handleAddOption = (index: number) => {
		const newOptions = [...inputs[index].options, { value: '', isTrue: false }];
		const newInputs = [...inputs];
		newInputs[index].options = newOptions;
		setInputs(newInputs);
	};

	const renderInputFields = (
		questionOptions: Option[],
		questionIndex: number
	) =>
		questionOptions.map((option, index) => (
			<div key={index} className={scss.input_div}>
				<div className={scss.variant_inputs}>
					{data?.questionResponseList &&
					data?.questionResponseList[questionIndex]?.questionType ===
						'MULTIPLE' ? (
						<div className={scss.radio_checkbox}>
							<Controller
								name={`option_${questionIndex}_${index}_isTrue`}
								control={control}
								render={({ field }) => (
									<label>
										<input
											{...field}
											checked={option.isTrue}
											style={{ cursor: 'pointer' }}
											type="checkbox"
										/>
									</label>
								)}
							/>
						</div>
					) : (
						<div className={scss.radio_checkbox}>
							<Controller
								name={`option_${questionIndex}_${index}_isTrue`}
								control={control}
								render={({ field }) => (
									<label>
										<input
											{...field}
											checked={option.isTrue}
											style={{ cursor: 'pointer' }}
											type="radio"
											name={`option_${questionIndex}`}
										/>
									</label>
								)}
							/>
						</div>
					)}
					<div className={scss.option_input}>
						<Controller
							name={`optionValue_${questionIndex}_${index}`}
							control={control}
							defaultValue={option.value}
							render={({ field }) => (
								<Input
									{...field}
									size="small"
									placeholder={`Вариант ${index + 1}`}
									type="text"
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
									newInputs[questionIndex].options.splice(index, 1);
									setInputs(newInputs);
								}}
							>
								<span className={scss.delete_icon}>&times;</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		));

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
								defaultValue={data?.title}
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
									placeholder="Тип теста:"
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
							{inputs.map((item, index) => (
								<div className={scss.mainInput} key={index}>
									<div className={scss.input_text}>
										<h2 className={scss.h2_number}>{index + 1}</h2>
										<Controller
											name={`titleValue_${index}`}
											control={control}
											defaultValue={item.title}
											render={({ field }) => (
												<Input
													type="text"
													placeholder="Вопрос"
													width="100%"
													size="small"
													{...field}
												/>
											)}
										/>
										<Controller
											name={`pointValue_${index}`}
											control={control}
											defaultValue={item.point}
											render={({ field }) => (
												<Input
													type="number"
													placeholder="Введите кол-во баллов"
													width="100%"
													size="small"
													{...field}
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
									{renderInputFields(item.options, index)}
									<div className={scss.buttons_copy_delete}>
										<button
											onClick={() => handleCopy(index)}
											style={{ background: 'none', border: 'none' }}
										>
											{<IconCopy />}
										</button>
										<button
											style={{ background: 'none', border: 'none' }}
											onClick={() => handleDelete(index)}
										>
											{<IconDelete />}
										</button>
									</div>
									<button type="button" onClick={() => handleAddOption(index)}>
										+ Добавить вариант
									</button>
								</div>
							))}
						</div>
						<div className={scss.buttonCercle}>
							<ButtonCircle icon={<IconCopy />} onClick={handleCopies} />
						</div>
					</div>
				</div>
				<div className={scss.btn_div}>
					<ButtonCancel onClick={() => reset()}> Отмена</ButtonCancel>
					<ButtonSave type="submit"> Сохранить</ButtonSave>
				</div>
			</div>
		</form>
	);
};

export default EditTest;
