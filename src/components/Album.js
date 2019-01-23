import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
	constructor(props) {
		super(props);

		const album = albumData.find(album => {
			return album.slug === this.props.match.params.slug
		});

		this.state = {
			album: album,
			currentSong: album.songs[0],
			isPlaying: false,
			hover: true
		};

		this.audioElement = document.createElement('audio');
		this.audioElement.src = album.songs[0].audioSrc;
	}

	play() {
		this.audioElement.play();
		this.setState({ isPlaying: true });
	}

	pause() {
		this.audioElement.pause();
		this.setState({ isPlaying: false });
	}

	setSong(song) {
		this.audioElement.src = song.audioSrc;
		this.setState({ currentSong: song });
	}

	handleSongClick(song) {
		const isSameSong = this.state.currentSong === song;

		if (this.state.isPlaying && isSameSong) {
			this.pause();
		} 
		else {
			if (!isSameSong) {
				this.setSong(song);
			}
			this.play();
		}
	}

	handleMouseEnter(song) {
		this.setState({ hover: song });
	}

	handleMouseLeave() {
		this.setState({ hover: false });
	}

	render() {
		return (
			<section className="album">
				<section id="album-info">
					<img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
					<div className="album-details">
						<h1 id="album-title">{this.state.album.title}</h1>
						<h2 className="artist">{this.state.album.artist}</h2>
						<div id="release-info">{this.state.album.releaseInfo}</div>
					</div>
				</section>
				<table id="song-list" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: '50px' }}>
					<colgroup>
						<col id="song-number-column" />
						<col id="song-title-column" />
						<col id="song-duration-column" />
					</colgroup>
					<thead>
						<th style={{ paddingRight: '20px' }}>Song Number</th>
						<th>Song Title</th>
						<th style={{ paddingLeft: '20px' }}>Song Duration</th>
					</thead>
					<tbody>
						{
							this.state.album.songs.map((song, index) =>
								<tr
									className="song"
									key={index}
									onClick={ () => this.handleSongClick(song) }
									onMouseEnter={ () => this.handleMouseEnter(song) }
									onMouseLeave={ () => this.handleMouseLeave(song) }>
									<td>{( () => {

										if(this.state.hover === song && this.state.hover !== this.state.currentSong) {
											return (<span className="icon ion-md-play"></span>)
										}

										if(this.state.isPlaying && this.state.currentSong === song) {
											return (<span className="icon ion-md-pause"></span>)
										}

										if(!this.state.isPlaying && this.state.currentSong === song) {
											return(<span className="icon ion-md-play"></span>)
										}

										else {
											return (index + 1)
										}
									}) ()}
									</td>
									<td>{song.title}</td>
									<td>{song.duration}</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</section>

		);
	}
}

export default Album;
