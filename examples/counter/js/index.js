import Rx from 'rx';
import React from 'react';
import ReactDOM from 'react-dom';
import RxComponent from '../../../src/main/js/index';

let click$ = new Rx.BehaviorSubject();

let timer$ = Rx.Observable.interval(1000)
  .scanWithEvent(click$,
    e => 0, //onEvent
    e => e + 1 //onNext from source observable
  )
  .startWith(0)
  .map(e => ({time:e}));

let Counter = RxComponent(class extends React.Component{ //RxComponent is a Higher Order component, it decorates the input class
  render(){
    return <div>
      <div>Time elapsed: {this.state.time}</div>
      <button onClick={x => this.props.click$.onNext(x)}>Reset</button>
    </div>
  }
});

ReactDOM.render(<Counter state$={timer$} click$={click$}/>, document.getElementById('content'));