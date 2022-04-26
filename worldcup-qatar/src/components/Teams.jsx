import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import Group from './Group';
import Dustbin from './Dustbin';
import countries from '../assets/data/countries.json';

const Teams = () => {
	const [dustbins, setDustbins] = useState([
		{ accepts: ['A'], lastDroppedItem: null },
		{ accepts: ['A'], lastDroppedItem: null },
		{ accepts: ['B'], lastDroppedItem: null },
		{ accepts: ['B'], lastDroppedItem: null },
		{ accepts: ['C'], lastDroppedItem: null },
		{ accepts: ['C'], lastDroppedItem: null },
		{ accepts: ['D'], lastDroppedItem: null },
		{ accepts: ['D'], lastDroppedItem: null },
		{ accepts: ['E'], lastDroppedItem: null },
		{ accepts: ['E'], lastDroppedItem: null },
		{ accepts: ['F'], lastDroppedItem: null },
		{ accepts: ['F'], lastDroppedItem: null },
		{ accepts: ['G'], lastDroppedItem: null },
		{ accepts: ['G'], lastDroppedItem: null },
		{ accepts: ['H'], lastDroppedItem: null },
		{ accepts: ['H'], lastDroppedItem: null },
	]);

	const [droppedBoxNames, setDroppedBoxNames] = useState([]);

	const handleDrop = useCallback(
		(index, item) => {
			const { country } = item;
			setDroppedBoxNames(
				update(droppedBoxNames, country ? { $push: [country] } : { $push: [] })
			);

			if (
				dustbins[index].lastDroppedItem !== item &&
				dustbins[index + 1].lastDroppedItem !== item &&
				dustbins[index - 1]?.lastDroppedItem !== item
			) {
				setDustbins(
					update(dustbins, {
						[index]: {
							lastDroppedItem: {
								$set: item,
							},
						},
					})
				);
			}
		},
		[droppedBoxNames, dustbins]
	);

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

			<section className='headline'>
				<article>CLASIFICADOS</article>
			</section>

			<div className='qualified' style={{ overflow: 'hidden', clear: 'both' }}>
				{dustbins.map(({ accepts, lastDroppedItem }, index) => (
					<div className='dustbinContainer' key={index}>
						<Dustbin
							accept={accepts}
							lastDroppedItem={lastDroppedItem}
							onDrop={item => handleDrop(index, item)}
							key={index}
							index={index}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default Teams;
