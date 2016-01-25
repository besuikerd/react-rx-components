import ReactDOM from 'react-dom';
import Rx from 'rx';
import _ from 'lodash';

import Todo from './components/todo/Todo';

let eventSubject = new Rx.Subject();

let id = 0;

let list$ = eventSubject.scan(function(prevList, event) {
  switch (event.action) {
    case 'insert':
      return  prevList.concat({id: id++, text: event.text});
    case 'remove':
      return prevList.filter(item => item.id != event.id);
    default:
      return prevList;
  }
}, [])
  .startWith([]);

ReactDOM.render(<Todo $update={x => eventSubject.onNext(x)} list$={list$.map(list => ({list:list}))}/>, document.getElementById('content'));