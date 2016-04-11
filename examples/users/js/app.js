import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

require('rx-dom-ajax');

import UserComponent from './components/UserComponent';

let users$ = Rx.DOM.ajax('/examples/users/public/users.json')
  .filter(response => response.status == 200)
  .map(response => JSON.parse(response.response))
  .startWith([]);

/**
 * cycles through the users every
 * second
 */
let userCycle$ = users$
  .skip(1) //drop initial empty list
  .take(1) //take first result
  .repeat()
  .zip(Rx.Observable.interval(1000))
  .map(function([users, idx]){
    return users[idx % users.length]
  })
  .startWith({name:'nobody'});


ReactDOM.render(<UserComponent currentUser$={userCycle$} users$={users$}/>, document.getElementById('content'));
