import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

import React from 'react';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { searchResults: [{name: "Umbrella", artist: "Rihanna", album: "Single", id: 1},
                                   {name: "Born to die", artist: "Lana Del Rey", album: "Paradise", id: 2},
                                   {name: "Without me", artist: "Halsey", album: "Single", id: 3}],
                   playlistName: "Playlist",
                   playlistTracks: []
                 };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track) {

    let tracks = this.state.playlistTracks;

    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);

    this.setState({ playlistTracks: tracks });

  }

  removeTrack(track) {

    let tracks = this.state.playlistTracks;

    const newTracks = tracks.filter((savedTrack) => {
      return savedTrack.id !== track.id;
    });

    this.setState({playlistTracks: newTracks});

  }

  updatePlaylistName(name) {

    this.setState({ playlistName: name });

  }

  savePlaylist() {

    const trackURIs = [];

    
  }

  search(track) {

    console.log(track);

  }

  render() {

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={ this.search }/>
          <div className="App-playlist">
             <SearchResults searchResults={ this.state.searchResults } onAdd={this.addTrack} />
             <Playlist playlistName={ this.state.playlistName } playlistTracks={ this.state.playlistTracks } onRemove={ this.removeTrack } onNameChange={ this.updatePlaylistName } onSave={ this.savePlaylist }/>
          </div>
        </div>
      </div>
    );

  }

}

export default App;

