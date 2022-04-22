import React from 'react';

const Layout = props => {
	return props.children.map(item => {
		return <>{item}</>;
	});
};

export default Layout;
