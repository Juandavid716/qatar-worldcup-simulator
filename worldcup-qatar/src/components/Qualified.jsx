import { memo } from 'react';
import { useDrop } from 'react-dnd';

const Qualified = memo(function Qualified({
	accept,
	lastDroppedItem,
	onDrop,
	index,
}) {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept,
		drop: onDrop,
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

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
						style={{ border: isDragging ? '5px solid white' : '0px' }}
						title={lastDroppedItem.country}
						key={lastDroppedItem.id}
					/>

					<p className='qualifiedText'>
						{index % 2 === 0 ? `1°${accept}` : `2°${accept}`}
					</p>
				</div>
			) : (
				<div className='qualifiedCountry'>
					<div style={{ width: 50, height: 40, backgroundColor }} />

					<p className='qualifiedText'>
						{index % 2 === 0 ? `1°${accept}` : `2°${accept}`}
					</p>
				</div>
			)}
		</div>
	);
});

export default Qualified;
