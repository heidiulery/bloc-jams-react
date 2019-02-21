import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import './index.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header style={ styles.navStyle }>
          <nav>
			<section style={ styles.navLeft }>
				<Link to='/' style={ styles.linkStyle }>Bloc Jams</Link>
			</section>
			<section style={ styles.navRight }>
            	<Link to='/' style={ styles.linkStyle }>Home</Link>
            	<Link to='/library' style={ styles.linkStyle }>Library</Link>
			</section>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={ Landing } />
          <Route path="/library" component={ Library } />
          <Route path="/album/:slug" component={ Album } />
        </main>
      </div>
    );
  }
}

const styles = {

	navStyle: {
		position: "fixed",
		width: "100%",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		height: "4vw"
	},

	navLeft: {
		float: "left",
		fontSize: "3vw",
		paddingLeft: 20
	},

	navRight: {
		float: "right",
		fontSize: "3vw",
		paddingRight: 20,
	},

	linkStyle: {
		textDecoration: "none",
		color: "white",
		padding: 20
	}
};

export default App;
