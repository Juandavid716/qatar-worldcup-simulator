import React from 'react';
import FifaLogo from '../assets/images/fifaLogo.svg?component';

const Header = () => {
	return (
		<section className='header'>
			<article className='logo'>
				<FifaLogo />
			</article>
			<article className='titleContainer'>
				<div className='content'>
					<h1>PRONÓSTICO</h1>
					<h4>Mundial Qatar 2022</h4>
					<p>
						Arrastre el equipo de cada grupo a la posición en la que cree va a
						clasificar.
					</p>
				</div>
			</article>
			<article></article>
		</section>
	);
};
export default Header;
