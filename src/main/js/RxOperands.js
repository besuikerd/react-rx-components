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