import Router from "next/router"

const LoginChecker = () => {
    console.log('Checking..')
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('loggedIn') === 'false') {
        Router.push({
            pathname: '/login'
        })
    } else {
        return true;
    }
}

export {
    LoginChecker as default
}