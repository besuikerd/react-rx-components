# react-rx-components

Making React reactive

# Installation

```
npm install rx-react-components
```

# Usage

`RxComponent(cls, [propName])`

`RxComponent` is a higher order class that decorates a react component that accepts a Rx observable as an input.
The decorated component expects a prop called `state$` that contains the observable that defines the state of the component.
Do note that this state observable needs to be an object since react enforces the state of a component to be an object.
The current state of the observable can be accessed through the component state: `this.state`.

Optionally a property name that is used to bind the observable to can be passed as a second argument to the RxComponent function.

## Creating a Rx Component
```js
import RxComponent from 'react-rx-component';
import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

let obs$ = Rx.Observable.interval(1000)
  .startWith(0)
  .map((x => ({value: x})));


let Component = RxComponent(class Component extends React.Component{
  render(){
    return <div>{this.state.value}</div>
  }
});

ReactDOM.render(<Component state$={obs$}/>, document.getElementById('content'));
```

## Using a different prop for state observable
```js
let Component = RxComponent(class Component extends React.Component{
  ...
}, 'otherPropName');

let jsx = <Component otherPropName={obs$}>

```

More examples can be found in [examples](examples)