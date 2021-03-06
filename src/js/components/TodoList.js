import React from 'react'
import Task from './Task'
import PropsTypes from 'prop-types'

class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {todos, onClickToggleDone, onClickRemove, onEnterUpdateTask} = this.props;
        let tasks = [];
        for (let i in todos) {
            tasks.push(<Task key={todos[i].id} {...todos[i]}
                             onClickToggleDone={() => onClickToggleDone(todos[i].id)}
                             onClickRemove={() => onClickRemove(todos[i].id)}
                             onEnterUpdateTask={(text) => onEnterUpdateTask(todos[i].id, text)}/>)
        }
        return (
            <ul className="list js-todo_list">
                {tasks}
            </ul>
        );
    }

}

TodoList.propsTypes = {
    todos: PropsTypes.arrayOf(
        PropsTypes.shape({
            id: PropsTypes.string.isRequired,
            done: PropsTypes.bool.isRequired,
            text: PropsTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onClickToggleDone: PropsTypes.func.isRequired,
    onClickRemove: PropsTypes.func.isRequired,
    onEnterUpdateTask: PropsTypes.func.isRequired
};

export default TodoList;