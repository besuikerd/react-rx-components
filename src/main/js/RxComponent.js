import Rx from 'rx';
import React from 'react';

export default (propName, valueName) => (ComposedComponent) => class extends ComposedComponent{
  constructor(props){
    super(props);
    this.__stateProp = propName || 'state$';
    this.__valueProp = valueName || 'value';
    this.error$ = new Rx.Subject();
  }

  componentWillMount() {
    if(super.componentWillMount){
      super.componentWillMount();
    }
    if(!this.props[this.__stateProp]){
      let name = this.__proto__.__proto__.constructor.name
      if(name === '_class'){//anonymous class
        name = 'unnamed';
      }
      throw new Error('[RxComponent] - no state prop attached to ' + name + ' component. Component should have an observable prop called ' + this.__stateProp);
    }

    let state$ = this.props[this.__stateProp];
    this.__stateSubscription = state$.subscribe(
      e => {
        if(typeof(e) === 'object' && e.constructor !== Array){
          this.setState(e)
        } else{
          let stateObj = {};
          stateObj[this.__valueProp] = e;
          this.setState(stateObj);
        }
      },
      err => error$.onNext(err)
    )
  }

  componentWillUnmount(){
    if(super.componentWillUnmount){
      super.componentWillUnmount();
    }
    this.__stateSubscription.unsubscribe();
  }
};