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
				src={`assets/images/countries/${country}.png`}
				width={50}
				height='40'
				title={country}
				style={{
					transform: isDragging ? 'scale(1.2)' : 'scale(1)',
					cursor: 'grab',
				}}
			/>
			<span className='countryName'>{country}</span>
		</>
	);
};

export default Team;
