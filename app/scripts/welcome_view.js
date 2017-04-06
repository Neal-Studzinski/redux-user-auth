export default function welcomeView(store) {
    let $html = $(`
        <p>Hello ${action.name}. Your token is ${action.userToken}</p>
    `);

    showWelcomeBanner = function(action) {
        console.log("showing welcome banner")

        $('#welcome-banner').show();
        $('#welcome-banner').html(element);
    }
