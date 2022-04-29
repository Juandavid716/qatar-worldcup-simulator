import { memo } from 'react';
import { useDrop, useDrag } from 'react-dnd';

const Dustbin = memo(function Dustbin({
	accept,
	lastDroppedItem,
	onDrop,
	index,
	isQualified,
	isOptional,
}) {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept,
		drop: onDrop,
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: 'qualifed' + accept,
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
						src={`/src/assets/images/countries/${lastDroppedItem.country}.png`}
						width={50}
						height='40'
						ref={drag}
						style={{
							border: isDragging && !isOptional ? '5px solid white' : '0px',
							cursor: !isOptional && 'grab',
						}}
						title={lastDroppedItem.country}
						key={lastDroppedItem.id}
					/>
					{!isQualified && (
						<p className='qualifiedText'>
							{index % 2 === 0 ? `1°${accept}` : `2°${accept}`}
						</p>
					)}
				</div>
			) : (
				<div className='qualifiedCountry'>
					<div style={{ width: 50, height: 40, backgroundColor }} />

					{!isQualified && (
						<p className='qualifiedText'>
							{index % 2 === 0 ? `1°${accept}` : `2°${accept}`}
						</p>
					)}
				</div>
			)}
		</div>
	);
});

export default Dustbin;
