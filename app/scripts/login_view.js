export default function loginView(store) {
    //First define the HTML
    let $html = $(`
        <div id="login-form">
            <input id="username-form" type="text" placeholder="username">
            <input id="password-form" type="password" placeholder="password">
            <button id="login-submit-btn">submit</submit>
        </div>
    `);

    //Then Add any click handler
    $($html).find('#login-submit-btn').on('click', function(e) {
        console.log("login clicked");
        store.dispatch({
            type: "AUTHENTICATE_USER",
            username: $('#username-form').val(),
            password: $('#password-form').val()
        });
    })
    
    //Finally return the html
    return $html;
};
