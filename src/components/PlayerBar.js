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
			<section className="player-bar">
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
				 <section id="time-control">
					<div className="current-time">{ formatTime(currentTime) }</div>
					<input 
						type="range"
						className="seek-bar"
						value={ (currentTime / duration) || 0 }
						max ="1"
						min="0"
						step="0.01"
						onChange={ handleTimeChange }
					/>
					<div className="total-time">{ formatTime(duration) }</div>
				 </section>
				 <section id="volume-control">
				   <div className="icon ion-md-volume-low">{ Math.round(currentVolume * 100) }</div>
				   <input 
						type="range" 	
						className="seek-bar" 
						value={ currentVolume }
						max="1"
						min="0"
						step="0.01"
						onChange={ handleVolumeChange }
				   />
				   <div className="icon ion-md-volume-high"></div>
				 </section>
			</section>
		);
	}
}

export default PlayerBar;
