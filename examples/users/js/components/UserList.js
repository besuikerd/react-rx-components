import React from 'react';
import RxComponent from 'react-rx-components';

export default RxComponent(class UserList extends React.Component{
  render(){
    return <ul>
        {this.state.users.map(user => <li key={user.name+user.surname}>
          {user.name} {user.surname}
        </li>)}
      </ul>
  }
}, 'users$', 'users');