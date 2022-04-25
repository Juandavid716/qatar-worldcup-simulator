import { memo } from 'react';
import { useDrop } from 'react-dnd';
const style = {
	height: '80px',
	width: '150px',
	color: 'white',
	marginRight: '10px',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
};
const Dustbin = memo(function Dustbin({ accept, lastDroppedItem, onDrop }) {
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
		<div
			ref={drop}
			style={{ ...style, backgroundColor }}
			data-testid='dustbin'
			className='dropZone'
		>
			{lastDroppedItem.length > 0 ? (
				lastDroppedItem.map(item => {
					return (
						<div className='' key={item.id}>
							<img
								src={`/src/assets/images/countries/${item.country}.png`}
								width={50}
								height='40'
								title={'xd'}
							/>
							<span className='countryName'>{item.country.toUpperCase()}</span>
						</div>
					);
				})
			) : (
				<></>
			)}
		</div>
	);
});

export default Dustbin;
