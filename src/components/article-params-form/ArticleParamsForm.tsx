import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';

import { useEffect, useRef, useState } from 'react';

import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export type TArticleParamsFormParams = {
	onSubmit: () => void;
	onReset: () => void;
	onSelectFontFamilyOption: (selected: OptionType) => void;
	onSelectFontColor: (selected: OptionType) => void;
	onSelectSizeFont: (selected: OptionType) => void;
	onSelectBackColor: (selected: OptionType) => void;
	onSelectContentWidth: (selected: OptionType) => void;
	options: ArticleStateType;
};

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
	onSelectFontFamilyOption,
	onSelectFontColor,
	onSelectSizeFont,
	onSelectBackColor,
	onSelectContentWidth,
	options,
}: TArticleParamsFormParams) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const [font, setFont] = useState<OptionType>(options.fontFamilyOption);
	const [fontColor, setFontColor] = useState<OptionType>(options.fontColor);
	const [backColor, setBackColor] = useState<OptionType>(
		options.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		options.contentWidth
	);
	const [fontSize, setFontSize] = useState<OptionType>(options.fontSizeOption);

	const handleClick = (event: MouseEvent) => {
		const { target } = event;
		if (
			target instanceof Node &&
			!rootRef.current?.contains(target) &&
			isOpen
		) {
			handelArrowButtonClick();
		}
	};

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
			return;
		}
		return window.removeEventListener('mousedown', handleClick);
	}, [isOpen]);

	function handelArrowButtonClick() {
		if (isOpen) {
			setIsOpen(false);
			rootRef.current?.classList.remove(styles.container_open);
		} else {
			rootRef.current?.classList.add(styles.container_open);
			setIsOpen(true);
		}
	}

	function handleSelectFontFamilyOption(selected: OptionType) {
		setFont(selected);
		onSelectFontFamilyOption(selected);
	}

	function handleSelectFontColor(selected: OptionType) {
		setFontColor(selected);
		onSelectFontColor(selected);
	}

	function handleSelectSizeFont(selected: OptionType) {
		setFontSize(selected);
		onSelectSizeFont(selected);
	}

	function handleSelectBackColor(selected: OptionType) {
		setBackColor(selected);
		onSelectBackColor(selected);
	}

	function handleSelectContentWidth(selected: OptionType) {
		setContentWidth(selected);
		onSelectContentWidth(selected);
	}

	function handleFormResetBtn() {
		setFont(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
		onReset();
	}

	function handleFormSubmitBtn() {
		onSubmit();
	}

	return (
		<>
			<ArrowButton onClick={handelArrowButtonClick} isOpen={isOpen} />
			<aside className={styles.container} ref={rootRef}>
				<form onSubmit={(e) => e.preventDefault()} className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={font}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleSelectFontFamilyOption}></Select>
					<RadioGroup
						selected={fontSize}
						options={fontSizeOptions}
						title='Размер Шрифта'
						name={fontSize.title}
						onChange={handleSelectSizeFont}></RadioGroup>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleSelectFontColor}></Select>
					<Separator></Separator>
					<Select
						selected={backColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleSelectBackColor}></Select>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleSelectContentWidth}></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleFormResetBtn}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={handleFormSubmitBtn}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
