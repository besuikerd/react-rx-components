import React from 'react';
import RxComponent from 'react-rx-components';

import UserList from './UserList';

export default RxComponent(class UserComponent extends React.Component{
  render(){
    return <div>
        <UserList users$={this.props.users$}/>

        <span>This second belongs to {(this.state.name && this.state.surname) && (this.state.name + ' ' + this.state.surname) || 'nobody'}!</span>
      </div>
  }
}, 'currentUser$', 'currentUser');