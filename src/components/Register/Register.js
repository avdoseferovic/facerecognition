import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nameValue: '',
            emailValue: '',
            passValue: ''
        }
    }
    onNameInput = (event) => {
        this.setState({nameValue: event.target.value});
    };
    onEmailInput = (event) => {
        this.setState({emailValue: event.target.value});
    };
     onPassInput = (event) => {
        this.setState({passValue: event.target.value});
    };
     onClick = () => {
         fetch('https://limitless-inlet-95122.herokuapp.com/register', {
             method: 'post',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
                 name: this.state.nameValue,
                 email: this.state.emailValue,
                 password: this.state.passValue
             })
         })
             .then(response => response.json())
             .then(data => {
                 if(data === 'success creating')
                     this.props.onClickChange('signin')
             })
    };

    render() {
        return (
            <article className="br3 ba b--black-10 mt6-m w-100 w-50-m w-25-l shadow-5 mw6 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 tc">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input
                                    onChange={this.onNameInput}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailInput}
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
                            <button onClick={this.onClick}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                                    type="button">Register
                            </button>
                        </div>

                    </form>
                </main>
            </article>
        );
    }
}
export default Register;
