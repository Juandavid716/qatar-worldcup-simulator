import React from 'react';

const Group = ({ color, group, countries }) => {
	return (
		<div className='group'>
			<div className='groupLetter' style={{ color }}>
				<div className='letter'>{group}</div>
			</div>
			<div className='countries'>
				{countries.map(country => {
					return (
						<div className='country'>
							<div className='countryItem'>
								<img
									src={`/src/assets/images/countries/${country}.png`}
									width={50}
									height='40'
									title={country}
								/>
								<span className='countryName'>{country.toUpperCase()}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Group;
