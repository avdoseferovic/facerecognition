import React, { Component } from 'react';

class SignIn extends Component  {
    constructor(props){
        super(props);
        this.state = {
            emailValue: '',
            passValue: ''
        }
    }

    onUserInput = (event) => {
        this.setState({emailValue: event.target.value})
    };

    onPassInput = (event) => {
        this.setState({passValue: event.target.value})
    };
    getUser (email){
        fetch('http://localhost:3000/profile/' + email)
            .then(response => response.json())
            .then(tempdata => {
                console.log(tempdata);
                this.props.setUser(tempdata)});
    }

    onLogIn = () => {
        fetch('https://limitless-inlet-95122.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.emailValue,
                password: this.state.passValue
            })
        }).then(response => response.json())
            .then(data => {
            console.log('test', data);
            if (data)
                this.getUser(data);
                this.props.onClickChange('home');
        })
    };

    render(){
        const { onClickChange } = this.props;
    return(
        <article className="br3 ba b--black-10 mt6-m w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 tc">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input
                            onChange={this.onUserInput}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email"
                            name="email-address"
                            id="email-address"
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input
                            onChange={this.onPassInput}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="password"
                        />
                    </div>
                </fieldset>
                <div className="">
                    <button onClick={this.onLogIn}
                           className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                           type="button">Sign in
                    </button>
                </div>
                <div className="lh-copy mt3">
                    <a onClick={() => onClickChange('register')} className="f6 link dim black db grow pointer">Sign up</a>
                </div>
            </form>
        </main>
        </article>
    );
    }
}

export default SignIn;
