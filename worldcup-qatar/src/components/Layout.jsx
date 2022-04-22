import React from 'react';

const Layout = props => {
	console.log(props.children);
	return (
		<main className='layout'>
			{props.children.map(item => {
				return <>{item}</>;
			})}
		</main>
	);
};

export default Layout;
