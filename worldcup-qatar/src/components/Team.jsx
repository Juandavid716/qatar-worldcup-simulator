import React from 'react';
import { useDrag } from 'react-dnd';

const Team = ({ team, type }) => {
	let { country, id } = team;

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type,
			item: { country, id },
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[country, id, type]
	);
	return (
		<>
			<img
				ref={drag}
				src={`/src/assets/images/countries/${country}.png`}
				width={50}
				height='40'
				title={country}
				style={{ border: isDragging ? '5px solid pink' : '0px' }}
			/>
			<span className='countryName'>{country.toUpperCase()}</span>
		</>
	);
};

export default Team;
