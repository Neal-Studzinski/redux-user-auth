export default function Views(store) {


    this.showLoginForm = function() {
            $('#login-form').show();
    }

    this.hideLoginForm = function() {
            $('#login-form').hide();
    }

    this.showWelcomeBanner = function(action) {
            console.log("showing welcome banner")
            let element = `<p>Hello ${action.name}. Your token is ${action.userToken}`
            $('#welcome-banner').show();
            $('#welcome-banner').html(element);
    }

        this.renderTodo = function (item,index,array) {
            console.log("item ",item);
            let element = `<li>${item.name}</li>`
            $('#todo-list').append(element);
    }
}
