import React from 'react';
import Team from './Team';

const Group = ({ color, group, countries }) => {
	return (
		<div className='group'>
			<div className='groupLetter' style={{ color }}>
				<div className='letter'>{group}</div>
			</div>
			<div className='countries'>
				{countries.map(team => {
					return (
						<div className='country' key={team.id}>
							<div className='countryItem'>
								<Team team={team} type={group} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Group;
