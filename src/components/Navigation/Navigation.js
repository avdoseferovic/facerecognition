import React from 'react'

const Navigation = ({onClickChange, signedIn, stateRoute}) => {
    if (signedIn === true && (stateRoute === 'home' || stateRoute === 'register')){
        return (
        <nav>
            <p onClick={() => onClickChange('signout')}
               className='f3 link dim black underline pa3 pointer grow'
               style={{width: 'width: 200px'}}>Sign Out</p>
        </nav>
        );
    }
    else if(stateRoute=== 'register') {
        return (
            <nav>
            <p onClick={() => onClickChange('signout')}
               className='f3 link dim black underline pa3 pointer grow'
               style={{width: 'width: 200px'}}>Sign In</p>
            </nav>
        );
    }
    else{
        return(
            <div></div>
        )
    }

};
export default Navigation;