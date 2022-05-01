import React from 'react';

const Layout = props => {
	return (
		<main className='layout'>
			{props.children.map((item, index) => {
				return <div key={index}>{item}</div>;
			})}
		</main>
	);
};

export default Layout;
