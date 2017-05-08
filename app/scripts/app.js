import { createStore } from 'redux'
import loginView from './login_view.js';
import taskView from './task.js';
export default function app() {

    console.log(createStore(function (state = [], action) {
        return state;
    }));

    const initialState = {
        username: null,
        view: loginView,
        tasks: [],
        usertoken: null
  }

    const reducer = function ( currentState, action ) {

        if ( currentState === undefined ) {
            currentState = initialState;
        }

    switch( action.type ) {

            case "LOGIN_VIEW":

            return initialState;

            case "LOGGING_IN":
                $.ajax({
                    type: 'POST',
                    url: 'https://api.backendless.com/v1/data/login',
                    headers: {
                        "application-id": "C5A918C4-98E6-BC28-FF40-EC989F505900",
                        "secret-key": "6A32A4FF-92E6-5071-FF2D-A6B98A969100",
                        "application-type": "REST",
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        "login": action.username,
                        "password": action.password
                    }),
                    success: function(data, status, xhr) {
                        console.log(data);
                        var userTOKEN = data['user-token'];
                        var name = data['name'];
                        var userid = data['objectId'];
                        store.dispatch({ type: "LOGGED_IN", usertoken: userTOKEN, name: name, userid: userid });
                        store.dispatch( { type: "RELOAD_TASK_VIEW" } );
                    },
                    error: function(data, status, xhr) {
                        console.log(data);
                    }
                });
                return currentState;

                case "LOGGED_IN":
                    var newState = {
                        usertoken: action.usertoken,
                        name: action.name,
                        userid: action.userid
                    };
                    return Object.assign({}, currentState, newState);

                case "TASK_VIEW":
                var newState = Object.assign({}, currentState, {view: taskView});

                return newState;

                case "NEW_TASK":
                $.ajax({
                    type: 'POST',
                    url: 'https://api.backendless.com/v1/data/tasks',
                    headers: {
                        "application-id": "C5A918C4-98E6-BC28-FF40-EC989F505900",
                        "secret-key": "6A32A4FF-92E6-5071-FF2D-A6B98A969100",
                        "user-token": store.getState().usertoken,
                        "application-type": "REST",
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        "name": action.name,
                        "description": action.description,
                        "state": action.state,
                        "important": action.important,
                        "due_date": action.due_date
                    }),
                    success: function(data, status, xhr) {
                        console.log(data);
                        store.dispatch({ type: "RELOAD_TASK_VIEW" });
                    },
                    error: function(data, status, xhr) {
                        console.log(data);
                    }
                });
                return currentState;

                case "RELOAD_TASK_VIEW":
                var userid = store.getState().userid;
                var whereClause = "ownerId='" + currentState.userid + "'";

                $.ajax({
                    type: 'GET',
                    url: 'https://api.backendless.com/v1/data/tasks',
                    headers: {
                        "application-id": "C5A918C4-98E6-BC28-FF40-EC989F505900",
                        "secret-key": "6A32A4FF-92E6-5071-FF2D-A6B98A969100",
                        "application-type": "REST",
                        "user-token": currentState.usertoken
                    },
                    success: function(data, status, xhr) {
                        console.log('Here is the data', data);
                        var tasks = data.data;
                        store.dispatch({ type: "SAVED_TASKS", newTasks: tasks });
                    },
                    error: function(data, status, xhr) {
                        console.log(data);
                    }
                });
                console.log('RELOAD_TASK_VIEW');
                return currentState;

                case "SAVED_TASKS":
                    var newState = {
                    tasks: action.newTasks,
                    view: taskView
                };
                console.log('Saved tasks works!');
                return Object.assign({}, currentState, newState);

                default:

                return currentState;
            }
        }

  const store = createStore( reducer );

  const render = function () {
      let state = store.getState();
      $('#app').html(state.view(store));
    }

  store.subscribe( render );
  store.dispatch( { type: "LOGIN_VIEW" } );

}
