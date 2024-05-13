const inputUsername = document.getElementById('input-username')
const inputPassword = document.getElementById('input-password')

function onClickLogin() {
    const loginText = document.getElementById('text-post-login')
    while(loginText.firstChild)
        loginText.removeChild(loginText.firstChild)
    const h5Element = document.createElement('h5')
    if (inputPassword.value === 'boot') {
        h5Element.appendChild(document.createTextNode('Login successfull'))
    } else {
        h5Element.appendChild(document.createTextNode('Wrong credentials'))
    }
    document.getElementById('text-post-login').appendChild(h5Element)
}
