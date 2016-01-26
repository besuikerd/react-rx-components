import Rx from 'rx';
import React from 'react';
import ReactDOM from 'react-dom';
import RxComponent from 'react-rx-components';

let click$ = new Rx.BehaviorSubject();

let timer$ = Rx.Observable.interval(1000)
  .scanWithEvent(click$,
    e => 0, //onEvent
    e => e + 1 //onNext from source observable
  )
  .startWith(0)

let Counter = RxComponent(class Counter extends React.Component{ //RxComponent is a Higher Order component, it decorates the input class
  render(){
    return <div>
      <div>Time elapsed: {this.state.time}</div>
      <button onClick={x => this.props.click$.onNext(x)}>Reset</button>
    </div>
  }
}, 'timer$', 'time');

ReactDOM.render(<Counter timer$={timer$} click$={click$}/>, document.getElementById('content'));