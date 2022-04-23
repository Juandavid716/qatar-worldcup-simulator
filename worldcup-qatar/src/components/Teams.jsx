import React from 'react';
import Group from './Group';
import countries from '../assets/data/countries.json';

const Teams = () => {
	return (
		<>
			<section className='headline'>
				<article>FASE DE GRUPOS</article>
			</section>

			<section className='groups'>
				{countries.map(country => {
					return (
						<Group
							key={country.group}
							color={country.color}
							group={country.group}
							countries={country.countries}
						/>
					);
				})}
			</section>
		</>
	);
};

export default Teams;
