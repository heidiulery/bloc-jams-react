import React, { Component } from 'react';

class PlayerBar extends Component {
	render () {
		const {
			handlePrevClick,
			handleSongClick,
			isPlaying,
			handleNextClick,
			formatTime,
			currentTime,
			currentVolume,
			handleTimeChange,
			handleVolumeChange,
			duration
		} = this.props;

		return (
			<section className="player-bar" style={ styles.totalPlay }>
				<section style={ styles.playerBar }>
					<section id="buttons">
					   <button id="previous" onClick={ handlePrevClick }>
						 <span className="icon ion-md-skip-backward"></span>
					   </button>
					   <button id="play-pause" onClick={ handleSongClick }>
						 <span className={ isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play' }></span>
					   </button>
					   <button id="next" onClick={ handleNextClick }>
						 <span className="icon ion-md-skip-forward"></span>
					   </button>
					 </section>
					 <section id="time-control" style={ styles.playerTime }>
						<div className="current-time" style={ styles.icon }>{ formatTime(currentTime) }</div>
						<input 
							type="range"
							className="seek-bar"
							value={ (currentTime / duration) || 0 }
							max ="1"
							min="0"
							step="0.01"
							onChange={ handleTimeChange }
						/>
						<div className="total-time" style={ styles.icon }>{ formatTime(duration) }</div>
					 </section>
				 </section>
				 <section id="volume-control" style={ styles.playerVolume }>
				   <div className="icon ion-md-volume-low" style={ styles.icon }></div>
				   <input 
						type="range" 	
						className="seek-bar" 
						value={ currentVolume }
						max="1"
						min="0"
						step="0.01"
						onChange={ handleVolumeChange }
				   />
				   <div className="icon ion-md-volume-high" style={ styles.icon }></div>
				 </section>
				 <section><div>{ Math.round(currentVolume * 100) }</div></section>
			</section>
		);
	}
}

const styles = {
	totalPlay: {	
		backgroundColor: "#FFB000",
	},

	playerBar: {
		margin: "5px",
		padding: "6px",
	},

	playerTime: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: "8px",
	},

	playerVolume: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",

	},

	icon: {
		padding: "10px",
	},
};

export default PlayerBar;
