import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import Group from './Group';
import Dustbin from './Dustbin';
import countries from '../assets/data/countries.json';
import { compareArrays } from '../helpers/compareArrays';

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

	const [quarter, setQuarter] = useState([
		{ accepts: ['A'], lastDroppedItem: null },
		{ accepts: ['B'], lastDroppedItem: null },
		{ accepts: ['C'], lastDroppedItem: null },
		{ accepts: ['D'], lastDroppedItem: null },
		{ accepts: ['E'], lastDroppedItem: null },
		{ accepts: ['F'], lastDroppedItem: null },
		{ accepts: ['G'], lastDroppedItem: null },
		{ accepts: ['H'], lastDroppedItem: null },
		{ accepts: ['B'], lastDroppedItem: null },
		{ accepts: ['A'], lastDroppedItem: null },
		{ accepts: ['D'], lastDroppedItem: null },
		{ accepts: ['C'], lastDroppedItem: null },
		{ accepts: ['F'], lastDroppedItem: null },
		{ accepts: ['E'], lastDroppedItem: null },
		{ accepts: ['H'], lastDroppedItem: null },
		{ accepts: ['G'], lastDroppedItem: null },
	]);

	const [qualified, setQualified] = useState([
		{ accepts: ['01'], lastDroppedItem: null },
		{ accepts: ['23'], lastDroppedItem: null },
		{ accepts: ['45'], lastDroppedItem: null },
		{ accepts: ['67'], lastDroppedItem: null },
		{ accepts: ['89'], lastDroppedItem: null },
		{ accepts: ['1011'], lastDroppedItem: null },
		{ accepts: ['1213'], lastDroppedItem: null },
		{ accepts: ['1415'], lastDroppedItem: null },
	]);

	const [semifinal, setSemifinal] = useState([
		{ accepts: ['0123'], lastDroppedItem: null },
		{ accepts: ['4567'], lastDroppedItem: null },
		{ accepts: ['891011'], lastDroppedItem: null },
		{ accepts: ['12131415'], lastDroppedItem: null },
	]);

	const [final, setFinal] = useState([
		{ accepts: ['01234567'], lastDroppedItem: null },
		{ accepts: ['89101112131415'], lastDroppedItem: null },
	]);

	const handleDrop = useCallback(
		(index, item) => {
			if (
				dustbins[index].lastDroppedItem !== item &&
				dustbins[index + 1]?.lastDroppedItem !== item &&
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
		[dustbins]
	);

	const handleQuarter = useCallback(
		(index, item) => {
			const result = compareArrays(quarter, dustbins[index], index, item);

			setQuarter(result);
		},
		[quarter]
	);

	const handleFinalStages = useCallback((index, item, array, setState) => {
		setState(
			update(array, {
				[index]: {
					lastDroppedItem: {
						$set: item,
					},
				},
			})
		);
	}, []);

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
							onDrop={item => {
								handleDrop(index, item);
								handleQuarter(index, item);
							}}
							key={index}
							index={index}
							isOptional={true}
						/>
					</div>
				))}
			</div>

			<section className='headline'>
				<article>OCTAVOS DE FINAL</article>
			</section>

			<div className='qualified' style={{ overflow: 'hidden', clear: 'both' }}>
				{quarter.map(({ accepts, lastDroppedItem }, index) => (
					<div className='dustbinContainer' key={index}>
						<Dustbin
							accept={accepts + ' '}
							lastDroppedItem={lastDroppedItem}
							onDrop={item => handleQuarter(index, item)}
							key={index}
							index={index}
							stage={'eight'}
						/>
					</div>
				))}
			</div>
			<div className='separatorText'>
				<p className='separatorItem'>CUARTOS</p>
				<p className='separatorItem'>CUARTOS</p>
				<p className='separatorItem'>CUARTOS</p>
				<p className='separatorItem'>CUARTOS</p>
			</div>
			<div
				className='containerTeams'
				style={{ overflow: 'hidden', clear: 'both' }}
			>
				{qualified.map(({ accepts, lastDroppedItem }, index) => (
					<div className='containerTeam' key={index}>
						<Dustbin
							accept={accepts}
							lastDroppedItem={lastDroppedItem}
							onDrop={item =>
								handleFinalStages(index, item, qualified, setQualified)
							}
							key={index}
							index={index}
							isQualified={true}
							stage={'quarter'}
						/>
					</div>
				))}
			</div>

			<div className='separatorText separator--modifier--grid'>
				<p className='separatorItem'>SEMIFINALES</p>
				<p className='separatorItem'>SEMIFINALES</p>
			</div>

			<div
				className='containerTeams containerTeams--modifier--grid'
				style={{ overflow: 'hidden', clear: 'both' }}
			>
				{semifinal.map(({ accepts, lastDroppedItem }, index) => (
					<div className='containerTeam' key={index}>
						<Dustbin
							accept={accepts}
							lastDroppedItem={lastDroppedItem}
							onDrop={item =>
								handleFinalStages(index, item, semifinal, setSemifinal)
							}
							key={index}
							index={index}
							isQualified={true}
							stage={'semifinal'}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default Teams;
