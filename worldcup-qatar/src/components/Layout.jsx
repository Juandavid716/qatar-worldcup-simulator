import React from 'react';

const Layout = props => {
	return (
		<main className='layout'>
			{props.children.map(item => {
				return <>{item}</>;
			})}
		</main>
	);
};

export default Layout;
