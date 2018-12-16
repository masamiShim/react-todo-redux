import {connect} from 'react-redux'
import {toggleDone, deleteTask, updateTask} from '../actions'
import TodoList from '../components/TodoList'

const filterTodos = function (elm) {
    const regexp = new RegExp('^' + this.searchText, 'i');
    return (elm.text.match(regexp));
}

const mapStateToProps = state => {
    return {
        todos: (state.task.searchText) ? state.task.todos.filter(filterTodos, state.task) : state.task.todos
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClickToggleDone: id => {
            console.log('container id => ' + id);
            dispatch(toggleDone(id));
        },
        onClickRemove: id => {
            dispatch(deleteTask(id));
        },
        onEnterUpdateTask: (id, text) => {
            dispatch(updateTask(id, text));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
