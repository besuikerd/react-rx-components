import Rx from 'rx';
import React from 'react';

export default (ComposedComponent) => class extends ComposedComponent{
  constructor(props){
    super(props);
    this.stateProp = 'state$';
    this.error$ = new Rx.Subject();
  }

  componentWillMount() {
    if(super.componentWillMount){
      super.componentWillMount();
    }
    let state$ = this.props[this.stateProp] || Rx.Observable.empty();
    this.__stateSubscription = state$.subscribe(
      e => this.setState(e),
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