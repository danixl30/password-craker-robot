const inputUsername = document.getElementById('input-username')
const inputPassword = document.getElementById('input-password')

async function onClickLogin(e) {
    e.preventDefault()
    const loginText = document.getElementById('text-post-login')
    while(loginText.firstChild)
        loginText.removeChild(loginText.firstChild)
    const h5Element = document.createElement('h5')
    const resp = await fetch('/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: inputUsername.value,
            password: inputPassword.value
        })
    })
    if (resp.status !== 400) {
        h5Element.appendChild(document.createTextNode('Login successfull'))
    }else {
        h5Element.appendChild(document.createTextNode('Wrong credentials'))
    }
    document.getElementById('text-post-login').appendChild(h5Element)
}

const form = document.getElementById("form");

// attach event listener
form.addEventListener("submit", onClickLogin, true);