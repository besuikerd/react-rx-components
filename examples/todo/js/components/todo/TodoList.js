import RxComponent from 'react-rx-components';
import React from 'react';


/**
 * @subscriber $update subscriber listening for update events
 */
export default RxComponent(class TodoList extends React.Component{
  onClickRemove = (id) => {
    this.props.$update({action:'remove', id:id});
  };

  render(){
    return <ul>
      {this.state.list.map(elem => <li key={elem.id}>
        <button onClick={e => this.onClickRemove(elem.id)}>x</button> {elem.text}
        </li>
      )}
    </ul>
  }
}, 'list$', 'list');