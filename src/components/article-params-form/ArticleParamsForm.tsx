import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';

import { FormEvent, useEffect, useRef, useState } from 'react';

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
	onSubmit: (options: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
}: TArticleParamsFormParams) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const [options, setOptions] = useState<ArticleStateType>(
		structuredClone(defaultArticleState)
	);

	const handleClick = (event: MouseEvent) => {
		const { target } = event;
		if (
			target instanceof Node &&
			!rootRef.current?.contains(target) &&
			isMenuOpen
		) {
			handelArrowButtonClick();
		}
	};

	useEffect(() => {
		if (isMenuOpen) {
			window.addEventListener('mousedown', handleClick);
			return;
		}
		return window.removeEventListener('mousedown', handleClick);
	}, [isMenuOpen]);

	function handelArrowButtonClick() {
		if (isMenuOpen) {
			setIsMenuOpen(false);
			rootRef.current?.classList.remove(styles.container_open);
		} else {
			rootRef.current?.classList.add(styles.container_open);
			setIsMenuOpen(true);
		}
	}

	function handleSelectFontFamilyOption(selected: OptionType) {
		setOptions({ ...options, fontFamilyOption: selected });
	}

	function handleSelectFontColor(selected: OptionType) {
		setOptions({ ...options, fontColor: selected });
	}

	function handleSelectSizeFont(selected: OptionType) {
		setOptions({ ...options, fontSizeOption: selected });
	}

	function handleSelectBackColor(selected: OptionType) {
		setOptions({ ...options, backgroundColor: selected });
	}

	function handleSelectContentWidth(selected: OptionType) {
		setOptions({ ...options, contentWidth: selected });
	}

	function handleFormResetBtn() {
		setOptions(structuredClone(defaultArticleState));
		onReset();
	}

	function handleFormSubmitBtn(e: FormEvent) {
		onSubmit(structuredClone(options));
		e.preventDefault();
	}

	return (
		<>
			<ArrowButton onClick={handelArrowButtonClick} isOpen={isMenuOpen} />
			<aside className={styles.container} ref={rootRef}>
				<form onSubmit={handleFormSubmitBtn} className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={options.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleSelectFontFamilyOption}></Select>
					<RadioGroup
						selected={options.fontSizeOption}
						options={fontSizeOptions}
						title='Размер Шрифта'
						name={options.fontSizeOption.title}
						onChange={handleSelectSizeFont}></RadioGroup>
					<Select
						selected={options.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleSelectFontColor}></Select>
					<Separator></Separator>
					<Select
						selected={options.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleSelectBackColor}></Select>
					<Select
						selected={options.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleSelectContentWidth}></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleFormResetBtn}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
