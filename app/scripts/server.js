export default function Server(store) {

  const QUERY_URL = 'http://api.backendless.com/v1/data/Users';
  const AUTH_URL = 'https://api.backendless.com/v1/users/login';
  const APP_ID = '463BBA56-92E8-5638-FF55-DAD64662AC00';
  const SECRET_KEY = 'F5FC3FC2-8EAB-C177-FF31-3784553E4E00';

  this.queryServer = function() {

    let settings = {
      type: 'GET',
      contentType: 'application/json',
      url: QUERY_URL,
      headers: {
        "application-id": APP_ID,
        "secret-key": SECRET_KEY,
      }
    }

    $.ajax(settings).then(function(data,status,xhr){
      console.log(data)
    })

  }

  this.authenticateUser = function(username,password) {
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
      error: function(data,status,xhr) {
        alert("Invalid Username or Password")
      }
    }

    $.ajax(settings).then(function(data,status,xhr) {
      console.log("response ",data)
      let userToken = data["user-token"];
      let name = data["name"];
      store.dispatch({type:"HANDLE_LOGIN",userToken,name})
    })

  }
  }
