import React from 'react';
import SVG from 'react-inlinesvg';

const Teams = () => {
	return (
		<>
			<section className='headline'>
				<article>FASE DE GRUPOS</article>
			</section>
			<SVG
				src={`/src/assets/images/${'fifaLogo'}.svg`}
				width={200}
				height='150px'
				title='Menu'
			/>
		</>
	);
};

export default Teams;
