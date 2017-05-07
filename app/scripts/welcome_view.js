export default function welcomeView(store) {
    let $html = $(`
        <p>Hello ${action.name}. Your token is ${action.userToken}</p>
    `);
    showWelcomeBanner = function(action) {
        console.log("showing welcome banner")

        $('#welcome_view').show();
        $('#welcome_banner').html(element);

    return $html;

}
}
