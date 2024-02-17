import {useReducer} from 'react';
import UserContext from './user-context';

const defaultUserState = {
  currentUser: {},
  isLoggedIn: false,
};


const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('booop');
      sessionStorage.setItem('currentUser', JSON.stringify(action.data.results[0]));
      return {
        currentUser: {...action.data.results[0]},
        isLoggedIn: true
      }
    case 'LOGOUT':
      sessionStorage.setItem('isLoggedIn', false);
      sessionStorage.removeItem('userInfo');
      return defaultLoginState;
    default:
      return state;
  }
};

const UserProvider = (props)=>{
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );

  const loginHandler = (uname, pass)=>{

    fetch('http://192.168.0.121:5001/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        uname: uname,
        pass: pass
      })
    })
    .then(res =>{
      return res.json();
    })
    .then(data => {
      dispatchUserAction({ type: 'LOGIN', data });
    })
    .catch(err => {
      console.log(err + '\nFetch had an error');
    })
  }

  const userContext = {
    currentUser: userState.currentUser,
    loginHandler: loginHandler
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
