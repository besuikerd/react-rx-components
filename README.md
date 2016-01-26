# react-rx-components

Making React reactive

Strongly inspired by [cycle.js](http://cycle.js.org/) and [Flux](https://facebook.github.io/flux/)-type architectures.
Encourages single direction dataflows within react components.

# Key principles

Components should not access global state. Instead, state is injected into components using Rx Observables and
subscribers.
A component can be seen as a dataflow component with inputs and outputs:

**Component inputs are Observables**

**Component outputs are Subscribers**

Both inputs and outputs are injected into components. Outside the components, the output of the component can be
connected to the input. This creates a unidirectional cycle: Output of the component emits events to the injected
subscriber, to which the inputs listens to, which updates the component. A component can be visualized like this:

<img src="https://cloud.githubusercontent.com/assets/1638661/12580423/e0bb1532-c42f-11e5-9279-a33063e68ba7.png" width=500px alt="Component Dataflow"/>

Using Rx, these entities can be modelled as follows:

* `Subscriber` is a `Rx.Subject`
* `Input` does a scan on `Subscriber` to process events and update the state.
* `Output` is the onNext method of `Subscriber`.

Or in code:

```js
let $subscriber = new BehaviourSubject(initialState);

let input$ = $subscriber.scan((prevState, event) => {
  return calculateNewState(prevState, event);
});


let component = <Component input$={input$} $subscriber={$subscriber.asSubscriber()}/>;

```

A convention that helps me remembering what is what is to annotate an Observable with a `$` behind it (in the sense that it 'produces') and annotate Subscribers with a `$` in front (in the sense that it 'consumes').

Do note that you cannot actually pass `$subscriber.onNext`! React modifies the this object to the component if you pass it a function. This can be worked around by calling `$subscriber.asSubscriber()`.

The nice thing about this that all inputs and outputs are explicit. You can test indivual components easily by
attaching mock observables and subscribers. This structure makes composition really easy. All you need to do is
wire the correct inputs and outputs together. This is illustrated in the [Todo example](examples/todo):

<img src="https://cloud.githubusercontent.com/assets/1638661/12578023/a4eb1dec-c41e-11e5-84a3-143060c6161e.png" width=500px alt="Todo dataflow"/>

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

`RxComponent(cls, [propName], [valueName])`

`RxComponent` is a higher order class that decorates a react component that accepts a Rx observable as an input.
The decorated component expects a prop called `state$` that contains the observable that defines the state of the component.
The current state of the observable can be accessed through the component state: `this.state`. If the observable emits objects, their keys will be bound in `this.state` if the observable emits other types, these will by default be bound to `this.state.value`

Optionally a property name that is used to bind the observable to can be passed as a second argument to the RxComponent function.

Furthermore a second optional value name can be given to which the component will bind a value to whenever you have an Observable that emits single items instead of objects.

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
