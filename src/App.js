import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { firstNine} from './redux/firstninesongs';
import { connect } from 'react-redux';
import { createRef } from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      info: "",
      url: "",
     
    };

    this.audioRefs = {};
    for (let i = 1; i < 10; i++) {
      this.audioRefs[`audio${i}`] = createRef();
    }

    this.handlePlayback = this.handlePlayback.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
 
    
    
  }

  

  componentDidMount() {
    this.props.firstNine();
    
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    // Remove event listener to prevent memory leaks
    document.removeEventListener("keydown", this.handleKeyDown);
  };

  handleKeyDown(event) {
    // Define a key mapping to your audio buttons
    const keyMap = {
      Q: "audio1",
      W: "audio2",
      E: "audio3",
      A: "audio4",
      S: "audio5",
      D: "audio6",
      Z: "audio7",
      X: "audio8",
      C: "audio9",
    };

    const audioKey = keyMap[event.key.toUpperCase()];
    if (audioKey) {
      this.handlePlayback(audioKey);
    }
  }

  handlePlayback = (audioKey) => {
    const audioElement = this.audioRefs[audioKey].current;
  
    if (!audioElement) return;
  
    // If the same audio is playing, pause it
    if (this.state.currentlyPlaying === audioKey) {
      audioElement.pause();
      this.setState({ currentlyPlaying: null });
    } else {
      // Pause all other audios before playing the new one
      Object.keys(this.audioRefs).forEach((key) => {
        if (this.audioRefs[key].current && key !== audioKey) {
          this.audioRefs[key].current.pause();
        }
      });
  
      // Play the selected audio
      audioElement.play();
      this.setState({ currentlyPlaying: audioKey });
    }

   

     const letsSee = this.props.songArr.find(e => e.id === audioKey);
     this.setState({
        info: letsSee.text,
        url: letsSee.url
     });
    
  };

   
    
  

  render() {
    if (!this.props.songArr || this.props.songArr.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div id="drum-machine">
        
        <div id="pad-holder">
          <div className="container mt-5">
            <div className="row">
              {/* Button 1 */}
                <div className="col-4 mb-3">
                  <div onClick={() => this.handlePlayback('audio1')} id="woohoo" className="w-100 drum-pad 8">Q
                  <audio src={this.props.songArr[0].song} type="audio/mpeg" ref={this.audioRefs.audio1} preload="none" id="Q" className="clip"/>
                  </div>
                </div>
                {/* Button 2 */}
                <div className="col-4 mb-3">
                  <div onClick={() => this.handlePlayback('audio2')} id="so-long" className="w-100 drum-pad">W
                  <audio src={this.props.songArr[1].song} type="audio/mpeg" ref={this.audioRefs.audio2} preload="none" id="W" className="clip"/>
                  </div>
                </div>
                {/* Button 3 */}
                <div className="col-4 mb-3" >
                  <div onClick={() => this.handlePlayback('audio3')} id="rental" className="w-100 drum-pad">E
                  <audio src={this.props.songArr[2].song} type="audio/mpeg" ref={this.audioRefs.audio3} preload="none" id="E" className="clip"/>
                  </div>
                </div>
            </div>

            <div className="row">
              {/* Button 4 */}
              <div className="col-4 mb-3">
                <div onClick={() => this.handlePlayback('audio4')} id="pain-below" className="w-100 drum-pad">A
                <audio src={this.props.songArr[3].song} type="audio/mpeg" ref={this.audioRefs.audio4} preload="none" id="A" className="clip"/>
                </div>
              </div>
              {/* Button 5 */}
              <div className="col-4 mb-3">
                <div onClick={() => this.handlePlayback('audio5')} id="cayendo" className="w-100 drum-pad">S
                <audio src={this.props.songArr[4].song} type="audio/mpeg" ref={this.audioRefs.audio5} preload="none" id="S" className="clip"/>
                </div>
              </div>
              {/* Button 6 */}
              <div className="col-4 mb-3">
                <div onClick={() => this.handlePlayback('audio6')} id="strangers" className="w-100 drum-pad">D
                <audio src={this.props.songArr[5].song} type="audio/mpeg" ref={this.audioRefs.audio6} preload="none" id="D" className="clip"/>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Button 7 */}
              <div className="col-4 mb-3">
                <div onClick={() => this.handlePlayback('audio7')} id="ava" className="w-100 drum-pad">Z
                <audio src={this.props.songArr[6].song} type="audio/mpeg" ref={this.audioRefs.audio7} preload="none" id="Z" className="clip"/>
                </div>
              </div>
              {/* Button 8 */}
              <div className="col-4 mb-3">
                <div onClick={() => this.handlePlayback('audio8')} id="how-you-feel" className="w-100 drum-pad">X
                <audio src={this.props.songArr[7].song} type="audio/mpeg" ref={this.audioRefs.audio8} preload="none" id="X" className="clip"/> 
                </div>
              </div>
              {/* Button 9 */}
              <div className="col-4 mb-3">
                <div onClick={() => this.handlePlayback('audio9')} id="skin" className="w-100 drum-pad">C
                <audio src={this.props.songArr[8].song} type="audio/mpeg" ref={this.audioRefs.audio9} preload="none" id="C" className="clip"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="display">
          <img src={this.state.url} alt="album-cover"/>
          {this.state.info}
          
        </div>
      
        
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    firstNine: () => dispatch(firstNine()),
   


  }
};

const mapStateToProps = (state) => {
  return {
    songArr: state.send

  }
};




export default connect(mapStateToProps, mapDispatchToProps)(App);
