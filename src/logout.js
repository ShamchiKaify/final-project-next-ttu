import Router from 'next/router';

const LogOut = () => {
    localStorage.setItem('loggedIn', false);
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    Router.push({
        pathname: '/login'
    })
}

export {
    LogOut as default
}