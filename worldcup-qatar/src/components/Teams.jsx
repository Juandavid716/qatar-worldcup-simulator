import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import Group from './Group';
import Dustbin from './Dustbin';
import countries from '../assets/data/countries.json';

const Teams = () => {
	const [dustbins, setDustbins] = useState([
		{ accepts: ['A'], lastDroppedItem: [] },
		{ accepts: ['B'], lastDroppedItem: [] },
		{ accepts: ['C'], lastDroppedItem: [] },
		{ accepts: ['D'], lastDroppedItem: [] },
		{ accepts: ['E'], lastDroppedItem: [] },
		{ accepts: ['F'], lastDroppedItem: [] },
		{ accepts: ['G'], lastDroppedItem: [] },
		{ accepts: ['H'], lastDroppedItem: [] },
	]);

	const [droppedBoxNames, setDroppedBoxNames] = useState([]);

	const handleDrop = useCallback(
		(index, item) => {
			const { country } = item;
			setDroppedBoxNames(
				update(droppedBoxNames, country ? { $push: [country] } : { $push: [] })
			);
			setDustbins(
				update(dustbins, {
					[index]: {
						lastDroppedItem: {
							$splice: [[0, 0, item]],
						},
					},
				})
			);
		},
		[droppedBoxNames, dustbins]
	);

	useEffect(() => {}, [droppedBoxNames]);

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
							id={country.id}
						/>
					);
				})}
			</section>

			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{dustbins.map(({ accepts, lastDroppedItem }, index) => (
					<Dustbin
						accept={accepts}
						lastDroppedItem={lastDroppedItem}
						onDrop={item => handleDrop(index, item)}
						key={index}
					/>
				))}
			</div>
			{/* <div
				className='Board'
				ref={drop}
				style={{
					background: 'white',
					height: '200px',
					width: '200px',
					border: isOver ? '5px solid pink' : '0px',
				}}
			>
				{board.map(item => {
					return (
						<div className='group' key={item.id}>
							<img
								src={`/src/assets/images/countries/${item.country}.png`}
								width={50}
								height='40'
								title={'xd'}
							/>
							<span className='countryName'>{item.country.toUpperCase()}</span>
						</div>
					);
				})}
			</div> */}
		</>
	);
};

export default Teams;
