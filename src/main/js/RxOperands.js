import Rx from 'rx';

Rx.Observable.prototype.scanWithEvent = function(event$, onEvent, onNext){
  return this.combineLatest(event$).scan(function({e:acc, prevClick}, [e, click]){
    if(acc === undefined){
      acc = e;
    }
    let next;
    if(click && click !== prevClick){
      click.persist();
      next = onEvent(acc);
    } else{
      next = onNext ? onNext(acc) : acc;
    }
    return {e:next, prevClick:click};
  }, {e:null, prevClick:null}).map(item => item.e);
};


function asSubscriber(){ // workaround for react changing this object
  let subject = this;
  return function(e){
    subject.onNext(e);
  };
}

/**
 * converts a Subject to a subscriber, or in other words getter for Subject.onNext. works around closures that
 * modify the 'this' object. You cannot apply this on Observables, only on Subjects, but in Rx all Subjects inherit from
 * Observable
 */
Rx.Observable.prototype.asSubscriber = asSubscriber
