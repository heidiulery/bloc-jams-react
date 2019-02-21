import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
	constructor(props) {
		super(props);
		this.state = { albums: albumData };
	}
	
	render() {
		return (
			<section className="library" style={ styles.libraryStyle }>
				{
					this.state.albums.map( (album, index) =>
						<Link to={ `/album/${ album.slug }` } key={ index } style={ styles.links }>
							<section style={ styles.albumContainer }>
								<section style={ styles.albumCover }>
									<img src={ album.albumCover } alt={ album.title } style={{ width: "200px", height: "200px" }} />
								</section>
								<section style={ styles.albumInfo }>	
									<div style={ styles.title }>{ album.title }</div>
									<div style={ styles.artist }>{ album.artist }</div>
								</section>
							</section>
						</Link>
					)
				}
			</section>
		);
	}
}

const styles = {

	libraryStyle: {
		backgroundImage: "radial-gradient(#FFB100, #EF7C00)",
		position: "absolute",
		top: "4vw",
		width: "100%",
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around"
	},

	links: {
		textDecoration: "none"
	},

	albumContainer: {
		width: "250px",
		height: "325px",
		background: "white",
		margin: 30,
		boxShadow: "5px 3px 2px #989898"
	},

	albumCover: {
		width: "225px",
		heigth: "225px",
		padding: "12.5px"
	},

	albumInfo: {
		width: "250px",
		height: "75px",

		background: "#FFB100"
	},

	title: {
		fontSize: "22px",
		color: "white",
		padding: "5px",
		textShadow: "2px 2px #EF7C00"
	},

	artist: {
		fontSize: "18px",
		color: "white",
		padding: "5px",
		textShadow: "2px 2px #EF7C00"
	}

};

export default Library;
