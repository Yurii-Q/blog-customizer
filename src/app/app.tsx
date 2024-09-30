import { CSSProperties, useState } from 'react';

import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';

import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [options, setOptins] = useState<ArticleStateType>(
		structuredClone(defaultArticleState)
	);

	function handleFormReset() {
		setOptins(structuredClone(defaultArticleState));
	}

	function handleFormSubmit(options: ArticleStateType) {
		setOptins(options);
	}

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': options.fontFamilyOption.value,
					'--font-size': options.fontSizeOption.value,
					'--font-color': options.fontColor.value,
					'--container-width': options.contentWidth.value,
					'--bg-color': options.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handleFormSubmit}
				onReset={handleFormReset}
			/>
			<Article />
		</main>
	);
};
