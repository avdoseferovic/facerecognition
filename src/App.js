import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
//import SweetAlert from 'sweetalert2-react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';



const particleOptions = {
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 200
                }
            }
        }
    };
const initialState = {
    input: '',
    imageurl: '',
    box: {},
    route: 'signin',
    signedIn: false,
    show: true,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};
class App extends Component {
    constructor(){
        super();
        this.state = initialState;
    }

    calculate(data){
        const obj = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('faceimage');
        const height = Number(image.height);
        const width = Number(image.width);
        return {
            leftCol: obj.left_col * width,
            topRow: obj.top_row * height,
            bottomRow: height - (obj.bottom_row * height),
            rightCol: width - (obj.right_col * width)
        }
    }
    displayBox(box){
        this.setState({box: box});
        console.log(this.state.box);
    }
    onInputChange = (event) => {
        this.setState({input: event.target.value})
    };

    setUser = (tempdata) => {
        this.setState({user: {
            id: tempdata.id,
            name: tempdata.name,
            email: tempdata.email,
            entries: tempdata.entries,
            joined: tempdata.joined
        }});
    };


    onButtonSubmit = () => {
        this.setState({imageurl: this.state.input});
            fetch('https://limitless-inlet-95122.herokuapp.com/imageurl',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: this.state.input
                })
            })
                .then(response => response.json())
                .then(response => {
                if (response) {
                    fetch('https://limitless-inlet-95122.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(respon => respon.json())
                        .then(counts => {
                            this.setState(Object.assign(this.state.user, {entries: counts}))
                        })
                }
                this.displayBox(this.calculate(response))
            })
            .catch((err) => console.log(err));
    };
    onSignClick = (route) => {
        (route === 'signout' || route === 'register' )
            ? this.setState(initialState)
            : this.setState({route: route, signedIn: true, show: true})
    };
    render() {
    return (
      <div className="App">
          <Particles
              className='particles'
              params={particleOptions}
          />
              {
                  (this.state.signedIn === false && this.state.route === 'signin') ?
                  <Logo /> :
                      (this.state.route === 'register')?
                      <div className='header'>
                              <Logo />
                              <Navigation onClickChange={this.onSignClick} signedIn={this.state.signedIn} stateRoute={this.state.route}/>
                      </div> :
                          <div className='header'>
                              <Logo />
                              <Navigation onClickChange={this.onSignClick} signedIn={this.state.signedIn} stateRoute={this.state.route}/>
                          </div>
              }
          {
          (this.state.route === 'signin' || this.state.route === 'signout')
              ?
                <SignIn onClickChange={this.onSignClick} setUser={this.setUser}/>
              :
              (this.state.route === 'register') ?
                  <Register onClickChange={this.onSignClick}/>
                  :
          <div>
              <Rank stats={this.state.user}/>
              <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonChange={this.onButtonSubmit}
              />
              <FaceRecognition url={this.state.imageurl} box={this.state.box}/>
          </div>
          }

      </div>
    );
  }
}

export default App;
