export default function Server(store) {

    const QUERY_URL = 'http://api.backendless.com/v1/data/todos';
    const AUTH_URL = 'https://api.backendless.com/v1/users/login';
    const APP_ID = 'C5A918C4-98E6-BC28-FF40-EC989F505900';
    const SECRET_KEY = '6A32A4FF-92E6-5071-FF2D-A6B98A969100';

    this.createTodo = function(action) {
        let settings = {
            type: 'POST',
            contentType: 'application/json',
            url: QUERY_URL,
            headers: {
                "application-id": APP_ID,
                "secret-key": SECRET_KEY,
                "user-token": action.userToken
            }
        }

        $.ajax(settings).then(function(data, status, xhr) {
            store.dispatch({
                type: "HANDLE_TODO_QUERY",
                data
            });
        });
    }

    this.getTodos = function(action) {
        let settings = {
            type: 'GET',
            contentType: 'application,json',
            url: QUERY_URL,
            headers: {
                "application-id": APP_ID,
                "secret-key": SECRET_KEY,
                "user-token": action.userToken
            }
        }

        $.ajax(settings).then(function(data, status, xhr) {
            store.dispatch({
                type: "HANDLE_TODO_QUERY",
                data
            });
        });
    }

    this.authenticateUser = function(username, password) {
        console.log("authenticating...")
        let settings = {
            type: 'POST',
            contentType: 'application/json',
            applicationType: 'REST',
            url: AUTH_URL,
            headers: {
                "application-id": APP_ID,
                "secret-key": SECRET_KEY,
            },
            data: JSON.stringify({
                "login": username,
                "password": password,
            }),
            processData: false,
            error: function(data, status, xhr) {
                alert("Invalid Username or Password")
            }
        };

        $.ajax(settings).then(function(data, status, xhr) {
            console.log("response ", data)
            let userToken = data["user-token"];
            let name = data["name"];
            store.dispatch({
                type: "HANDLE_LOGIN",
                userToken,
                name
            })
        });
    };
};
