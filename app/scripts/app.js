import { createStore} from 'redux';
import Server from './server.js';
import Views from './views.js';
import loginView from './login_view.js';
import taskView from './task_view';
import welcomeView from './welcome_view.js';
export default function app() {

    const initialState = {
        items: [],
        view: loginView
    };

    const log = (type) => console.log("action type: ", type);

    const reducer = function(state, action) {

        if (state === undefined) {
            return initialState;
        }

        switch (action.type) {
            case "LOAD_PAGE":
                log(action.type);
                views.showLoginForm();
                return state;

            case "TESTING":
                log(action.type);
                return state;

            case "AUTHENTICATE_USER":
                log(action.type);
                server.authenticateUser(action.username, action.password);
                return state;

            case "HANDLE_LOGIN":
                log(action.type);
                views.hideLoginForm();
                //views.welcomeView(action);
                server.getTodos(action);
                let tempState = Object.assign({}, state, {
                    userToken: action.userToken,
                    username: action.name,
                    view: taskView // Need to create task view
                });
                return tempState;

            case "GET_TODOS":
                log(action.type);
                return state;

            case "HANDLE_TODO_QUERY":
                log(action.type);
                let todos = action.d.data;
                todos.forEach(views.renderTodo)

                return Object.assign({}, state, {
                    userToken: action.userToken,
                    username: action.name
                });

            default:
                return state;

        }
    }

    const store  = createStore(reducer);
    const server = new Server(store);
    const views  = new Views(store);

    const render = function () {
        var state = store.getState();
        console.log(state);
        $("#app").html(state.view(store));
    }

    store.subscribe(render);
    store.dispatch({
        type: "LOAD_PAGE"
    });

}
