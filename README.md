# react-rx-components

Making React reactive

Strongly inspired by [cycle.js](http://cycle.js.org/) and [Flux](https://facebook.github.io/flux/)-type architectures.
Encourages single direction dataflows within react components.

# Key principles

Components should not access global state. Instead, state is injected into components using Rx Observables and
subscriptions.

A component can be seen as a dataflow component with inputs and outputs:

**Component inputs are Observables**
**Component outputs are Subscriptions**

Both inputs and outputs are injected into components. Outside the components, the output of the component can be
connected to the input. This creates a unidirectional cycle: Output of the component emits events to the injected
subscription, to which the inputs listens to, which updates the component. A component can be visualized like this:

![Component dataflow](https://cloud.githubusercontent.com/assets/1638661/12578696/ed6c3ce6-c422-11e5-9bf5-b6102b616b0e.png)

Using Rx, these entities can be modelled as follows:

* `Subscription` is a `Rx.Subject`
* `Input` does a scan on `Subscription` to process events and update the state.
* `Output` is the onNext method of `Subscription`.

Or in code:

```js
let $subscription = new BehaviourSubject(initialState);

let input$ = subscription.scan((prevState, event){
  return calculateNewState(prevState, event);
});


let component = <Component input$={input$} $subscription={$subscription.onNext}/>;

```

A convention that helps me remembering what is what is annotate an Observable with a `$` behind it (in the sense that it 'produces') and annotate Subscriptions with a `$` in front (in the sense that it 'consumes').

The nice thing about this that all inputs and outputs are explicit. You can test indivual components easily by
attaching mock Observables and Subscriptions. This structure makes composition really easy. All you need to do is
wire the correct inputs and outputs together. This is illustrated in the [Todo example](examples/todo):

![Todo dataflow](https://cloud.githubusercontent.com/assets/1638661/12578023/a4eb1dec-c41e-11e5-84a3-143060c6161e.png)

# Installation

```
npm install rx-react-components
```

# Setup dev environment

```
npm install -g gulp
git clone git@github.com:besuikerd/react-rx-components.git
cd react-rx-components
npm install
gulp dev
```

Starts up a webpack dev server on port 3000. Examples can be accessed at [http://localhost:3000/webpack-dev-server/examples](http://localhost:3000/webpack-dev-server/examples)

# Usage

`RxComponent(cls, [propName])`

`RxComponent` is a higher order class that decorates a react component that accepts a Rx observable as an input.
The decorated component expects a prop called `state$` that contains the observable that defines the state of the component.
Do note that this state observable needs to be an object since react enforces the state of a component to be an object.
The current state of the observable can be accessed through the component state: `this.state`.

Optionally a property name that is used to bind the observable to can be passed as a second argument to the RxComponent function.

## Creating a Rx Component
```js
import RxComponent from 'react-rx-components';
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
