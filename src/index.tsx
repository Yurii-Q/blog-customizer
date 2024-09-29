import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//************************************************************** */
	const [font, setFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backColor, setBackColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	const options: ArticleStateType = structuredClone(defaultArticleState);

	function handleFormResetBtn() {
		setFont(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
	}

	function handleFormSubmitBtn() {
		setFont(options.fontFamilyOption);
		setFontColor(options.fontColor);
		setFontSize(options.fontSizeOption);
		setBackColor(options.backgroundColor);
		setContentWidth(options.contentWidth);
	}

	function handleSelectFontFamilyOption(selected: OptionType) {
		options.fontFamilyOption = selected;
	}

	function handleSelectFontColor(selected: OptionType) {
		options.fontColor = selected;
	}

	function handleSelectSizeFont(selected: OptionType) {
		options.fontSizeOption = selected;
	}

	function handleSelectBackColor(selected: OptionType) {
		options.backgroundColor = selected;
	}

	function handleSelectContentWidth(selected: OptionType) {
		options.contentWidth = selected;
	}
	//*********************************** */
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': font.value,
					'--font-size': fontSize.value,
					'--font-color': fontColor.value,
					'--container-width': contentWidth.value,
					'--bg-color': backColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handleFormSubmitBtn}
				onReset={handleFormResetBtn}
				onSelectFontFamilyOption={handleSelectFontFamilyOption}
				onSelectSizeFont={handleSelectSizeFont}
				onSelectFontColor={handleSelectFontColor}
				onSelectBackColor={handleSelectBackColor}
				onSelectContentWidth={handleSelectContentWidth}
				options={{
					fontFamilyOption: options.fontFamilyOption,
					fontSizeOption: options.fontSizeOption,
					fontColor: options.fontColor,
					backgroundColor: options.backgroundColor,
					contentWidth: options.contentWidth,
				}}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
