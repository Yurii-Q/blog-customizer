import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useRef, useEffect } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TProps = {
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: TProps) => {
	const btnRef = useRef<HTMLDivElement>(null);
	const btnImgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (isOpen) {
			btnImgRef.current?.classList.add(styles.arrow_open);
			btnRef.current?.classList.add(styles.container_open);
		} else {
			btnImgRef.current?.classList.remove(styles.arrow_open);
			btnRef.current?.classList.remove(styles.container_open);
		}
	}, [isOpen]);

	function handelClick() {
		onClick();
	}

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container}
			ref={btnRef}
			onClick={handelClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={styles.arrow}
				ref={btnImgRef}
			/>
		</div>
	);
};
