export default function ( store ) {

    let $html = $(`
        <section class="login-view">
            <h1>Task Management App with Backendless</h1>
            <form id="login" action="" method="">
                <label for="username">username: </label>
                <input id="username" type="text" placeholder="@example.com" value="user@example.com">
                <label for="password">password: </label>
                <input id="password" type="password" value="password">
                <input type="submit" value="login">
            </form>
        </section>
  `);

  $html.find('#login').on('submit', (event) => {
      event.preventDefault();
      
      var username = event.target.elements.username.value;
      var password = event.target.elements.password.value;
      store.dispatch({ type: "LOGGING_IN", username: username, password: password });
    });

    return $html;
}
