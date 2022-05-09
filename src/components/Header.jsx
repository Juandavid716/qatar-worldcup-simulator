import React from 'react';
import html2canvas from 'html2canvas';
import { AiOutlineDownload } from 'react-icons/ai';
import FifaLogo from '../assets/logo/fifaLogo.svg?component';
const Header = () => {
	const takeScreenshot = async () => {
		const canvas = await html2canvas(document.querySelector('#root'));
		canvas.style.display = 'none';
		canvas.style.height = '100vh';
		document.body.appendChild(canvas);
		const image = canvas
			.toDataURL('image/png')
			.replace('image/png', 'image/octet-stream');
		const a = document.createElement('a');
		a.setAttribute('download', `info.png`);
		a.setAttribute('href', image);
		a.click();
	};
	return (
		<section className='header'>
			<article className='logo'>
				<FifaLogo />
			</article>
			<article className='titleContainer'>
				<div className='content'>
					<h1>PRONÓSTICO</h1>
					<h4>Mundial Qatar 2022</h4>
					<p>
						Arrastre el equipo de cada grupo a la posición en la que cree va a
						clasificar.
					</p>
				</div>
			</article>
			<article className='buttonsSection'>
				<button id='btnDownloader' onClick={takeScreenshot}>
					<AiOutlineDownload />
					<span>Download</span>
				</button>
			</article>
			<article></article>
		</section>
	);
};
export default Header;
