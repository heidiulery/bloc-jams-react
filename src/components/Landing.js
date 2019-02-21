import React from 'react';

const Landing = () => (
	<section className='landing'>
		<div style={ styles.sellingPoints }>
			<div style={ styles.point }>* Choose your music *</div>
			<div style={ styles.point }>* Unlimited, streaming, ad-free *</div>
			<div style={ styles.point }>* Mobile enabled *</div>
		</div>
		<h1 className="hero-title" style={ styles.heroStyle }>Turn the music up!</h1>
	</section>
);

const styles = {
	
	sellingPoints: {
		position: "absolute",
		top: "6vw",
		right: "8vw",
		fontSize: "2vw",
		color: "white",
		fontWeight: "bold"
	},

	point: {
		padding: "1vw"
	},

	heroStyle: {
		color: "white",
		fontSize: "5vw",
		position: "absolute",
		bottom: "0.5vw",
		textAlign: "center",
		width: "100%"
	}
};

export default Landing;
