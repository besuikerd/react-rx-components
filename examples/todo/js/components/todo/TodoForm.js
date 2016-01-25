import React from 'react';

/**
 * @subscriber $enter event emitted whenever user presses the enter button
 */
export default class TodoForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {input:""}
  }

  onKeyUp = (event) => {
    if(event.key == 'Enter'){
      this.props.$enter(event.target.value);
      this.setState({input:""})
    }
  };

  onChange = (event) => {
    this.setState({input:event.target.value})
  };

  render(){
    return <div>
        <input type="text" value={this.state.input} onKeyUp={this.onKeyUp} onChange={this.onChange}/>
      </div>
  }
}