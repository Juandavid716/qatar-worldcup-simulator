import { memo } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import checkIndexes from '../helpers/checkIndexes';
import { isOdd } from '../helpers/compareArrays';

const Dustbin = memo(function Dustbin({
	accept,
	lastDroppedItem,
	onDrop,
	index,
	isQualified,
	isOptional,
	stage,
}) {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept,
		drop: onDrop,
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});
	let newIndex = '';
	let result;
	switch (stage) {
		case 'eight':
			result = isOdd(index) ? index : index - 1;
			newIndex = `${result}` + `${result + 1}`;
			break;
		case 'quarter':
			newIndex = checkIndexes(accept, index);
			break;

		case 'semifinal':
			newIndex = checkIndexes(accept, index);
			break;

		case 'final':
			newIndex = checkIndexes(accept, index);
			break;
	}

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: `${newIndex}`,
			item: lastDroppedItem,
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[lastDroppedItem]
	);

	const isActive = isOver && canDrop;
	let backgroundColor = '#222';
	if (isActive) {
		backgroundColor = 'darkgreen';
	} else if (canDrop) {
		backgroundColor = 'darkkhaki';
	}

	return (
		<div ref={drop} data-testid='dustbin' className='dropZone'>
			{lastDroppedItem ? (
				<div className='qualifiedCountry'>
					<img
						src={`assets/images/countries/${lastDroppedItem.country}.png`}
						width={50}
						height='40'
						ref={drag}
						style={{
							transform: isDragging && !isOptional ? 'scale(1.2)' : 'scale(1)',
							cursor: !isOptional && 'grab',
						}}
						title={lastDroppedItem.country}
						key={lastDroppedItem.id}
					/>
					{!isQualified ? (
						<p className='qualifiedText'>
							{index % 2 === 0 ? `1°${accept}` : `2°${accept}`}
						</p>
					) : (
						<p className='countryName'>{lastDroppedItem.country}</p>
					)}
				</div>
			) : (
				<div className='qualifiedCountry'>
					<div style={{ width: 50, height: 40, backgroundColor }} />

					{!isQualified ? (
						<p className='qualifiedText'>
							{index % 2 === 0 ? `1°${accept}` : `2°${accept}`}
						</p>
					) : (
						<p className='countryName' style={{ height: 40 }}></p>
					)}
				</div>
			)}
		</div>
	);
});

export default Dustbin;
