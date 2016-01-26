# Todo

Every frontend application abstraction needs a todo, so here it is!

## Components

### Todo

Top level component that contains child components.

#### Inputs

__$update: Subscriber[UpdateEvent]__
subscriber that captures all update events happening within the Todo components

__list$: Observable[Array[TodoItem]]__
observable that contains the list of todo items

### TodoList

takes the __list$__ observable and renders a list of todo items. each item has a delete button that emits a delete action on __$update__ subscriber.

#### Inputs

__list$: Observable[Array[TodoItem]]__
observable that contains the list of todo items

__$update: Subscriber[UpdateEvent]__
subscriber that captures delete events happening within the TodoList component


### TodoForm

contains the input field where todo items can be added. when the user enters a todo entry and presses enter, a insert action is emitted on the __$enter__ subscriber.

#### Inputs

__$enter: Subscriber[UpdateEvent]__
subscriber that captures insert events happening within the TodoForm component



![Todo dataflow](https://cloud.githubusercontent.com/assets/1638661/12578023/a4eb1dec-c41e-11e5-84a3-143060c6161e.png)
