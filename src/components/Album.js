import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

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
			hover: true,
			currentTime: 0,
			currentVolume: 0.5,
			duration: album.songs[0].duration
		};

		this.audioElement = document.createElement('audio');
		this.audioElement.src = album.songs[0].audioSrc;
	}

	componentDidMount() {
		this.eventListeners = {
			timeupdate: e => {
				this.setState({ currentTime: this.audioElement.currentTime });
			},
			durationchange: e => {
				this.setState({ duration: this.audioElement.duration });
			},
			volumechange: e => {
				this.setState({ volume: this.audioElement.volume });
			}
		};

		this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
		this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
		this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
	}

	componentWillUnmount() {
		this.audioElement.src = null;
		this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
		this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
		this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
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

	handlePrevClick(song) {
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		const newIndex = Math.max(0, currentIndex - 1);
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
	}

	handleNextClick(song) {
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		const maxIndex = this.state.album.songs.length - 1;
		const newIndex = Math.min(maxIndex, currentIndex + 1);
		const newSong= this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
	}

	handleTimeChange(e) {
		const newTime = this.audioElement.duration * e.target.value;
		this.audioElement.currentTime = newTime;
		this.setState({ currentTime: newTime });
	}

	formatTime(time) {
		const minutes = Math.floor( time / 60 );
		let seconds = Math.floor( time % 60 );
		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		if (time === isNaN) {
			return "-:--";
		}

		else {
			return (minutes + ":" + seconds);
		}
	}

	handleVolumeChange(e) {
		const newVolume = e.target.value;
		this.audioElement.volume = newVolume;
		this.setState({ currentVolume: newVolume });
	}

	handleMouseEnter(song) {
		this.setState({ hover: song });
	}

	handleMouseLeave() {
		this.setState({ hover: false });
	}

	render() {
		return (
			<section className="album" style={ styles.albumStyle }>
				<section id="album-info" style={ styles.albumCover }>
					<img id="album-cover-art" src={ this.state.album.albumCover } alt={ this.state.album.title } style={{ width: "450px", height: "450px", padding: "25px" }} />
				</section>
				<section style={ styles.albumInfo }>
					<section style={ styles.album }>
						<div style={{ paddingLeft: "25px" }}>{ this.state.album.artist } | <span style={{ fontStyle: "italic" }}>{this.state.album.title}</span></div>
						<div style={{ fontSize: "16px", paddingLeft: "25px" }}>{ this.state.album.releaseInfo }</div>
					</section>
					<table id="song-list" style={ styles.tableStyle }>
						<colgroup>
							<col id="song-number-column" />
							<col id="song-title-column" />
							<col id="song-duration-column" />
						</colgroup>
						<thead>
							<tr>
								<th>Song Number</th>
								<th>Song Title</th>
								<th>Song Duration</th>
							</tr>
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
		
											if(this.state.isPlaying && this.state.currentSong === song) {
												return (<span className="icon ion-md-pause"></span>)
											}

											if(this.state.hover === song) {
												return (<span className="icon ion-md-play"></span>)
											}

											else {
												return (index + 1)
											}

										}) ()}
										</td>
										<td>{ song.title }</td>
										<td>{ this.formatTime(song.duration) }</td>
									</tr>
								)
							}
						</tbody>
					</table>
					<PlayerBar 
						isPlaying={ this.state.isPlaying } 
						currentSong={ this.state.currentSong }
						handleSongClick={ () => this.handleSongClick(this.state.currentSong) }
						handlePrevClick={ () => this.handlePrevClick() }
						handleNextClick={ () => this.handleNextClick() }
						currentTime={ this.audioElement.currentTime }
						duration={ this.state.currentSong.duration }
						handleTimeChange={ (e) => this.handleTimeChange(e) }
						formatTime={ this.formatTime }
						currentVolume={ this.state.currentVolume }
						handleVolumeChange={ (e) => this.handleVolumeChange(e) }
					/>
				</section>
			</section>

		);
	}
}

const styles = {

	albumStyle: {
		backgroundImage: "radial-gradient(#FFB100, #EF7C00)",
		position: "absolute",
		top: "4vw",
		width: "100%",
		minHeight: "1000px",
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around"
	},

	albumCover: {
		width: "500px",
		height: "500px",
		background: "white",
		margin: "30px"
	},

	albumInfo: {
		width: "700px",
		height: "500px",
		background: "white",
		margin: "30px"
	},

	album: {
		width: "700px",
		height: "75px",
		background: "#FFB100",
		color: "white",
		fontSize: "30px",
		textAlign: "left",
		marginTop: "25px",
		paddingTop: "20px",
	},

	tableStyle: {
		marginTop: "25px",
		align: "center"
	},

};

export default Album;
