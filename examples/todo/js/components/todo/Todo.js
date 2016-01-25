import RxComponent from '../../../../../src/main/js/index';
import React from 'react';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

/**
 * @subscriber $update listens for change actions on todo list
 * @observable list$ contains list items
 */
export default class Todo extends React.Component{
  constructor(props){
    super(props);
  }

  insertItem = (text) => {
    this.props.$update({action:'insert', text:text})
  };

  render(){
    return <div>
      <TodoForm $enter={this.insertItem}/>
      <TodoList list$={this.props.list$} $update={this.props.$update}/>
    </div>
  }
}