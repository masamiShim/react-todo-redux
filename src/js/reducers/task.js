import _ from 'lodash'

const initializeState = {
    todos: [{
        id: '1',
        text: 'sample todo1',
        done: false
    }],
    searchText: ''
};

export default function task(state = initializeState, action) {
    switch (action.type) {
        case 'ADD':
            return {
                todos: [
                    ...state.todos,
                    {
                        id: action.id,
                        text: action.text,
                        done: false
                    }
                ]
            };
        case 'DELETE':
            return Object.assign({}, state, {
                todos: _.reject(state.todos, {'id': action.id})
            });

        case 'UPDATE' :
            console.log('update reducer')
            return Object.assign({}, state, {
                todos: state.todos.map((todo) => {
                    console.log('todo.id => ' + todo.id + ': action.id => ' + action.id);
                    if (todo.id === action.id) {
                        return Object.assign({}, todo, {
                            text: action.text
                        })
                    }
                    return todo
                })
            });

        case 'TOGGLE_DONE':
            console.log('toggle done reducer')
            return Object.assign({}, state, {
                todos: state.todos.map((todo) => {
                    console.log('todo.id => ' + todo.id + ': action.id => ' + action.id);
                    if (todo.id === action.id) {
                        return Object.assign({}, todo, {
                            done: !todo.done
                        })
                    }
                    return todo
                })
            });

        case 'SEARCH':
            return Object.assign({}, state, {'searchText': action.searchText});
        default:
            return state;
    }
}