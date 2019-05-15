// Setting cookies
exports.setCookies = (response, session, credentials) => {
    response.cookie('TOKEN', session.token, {
        maxAge: 24 * 60 * 60 * 1000,
        withCredentials: true,
        httpOnly: true,
        secure: true
    });
    response.cookie('SESSION_ID', session.id, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    });
    response.cookie('USER', credentials.name, {
        maxAge: 24 * 60 * 60 * 1000
    });
    response.cookie('ROLE', credentials.role, {
        maxAge: 24 * 60 * 60 * 1000
    });
    response.cookie('LANGUAGE', credentials.language, {
        maxAge: 24 * 60 * 60 * 1000
    });
    response.cookie('CURRENCY', credentials.currency, {
        maxAge: 24 * 60 * 60 * 1000
    })
    return response;
}

exports.refreshCookies = (response, cookies) => {
    response.cookie('TOKEN', cookies.TOKEN, {
        maxAge: 24 * 60 * 60 * 1000,
        withCredentials: true,
        httpOnly: true,
        secure: true
    });
    response.cookie('SESSION_ID', cookies.SESSION_ID, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    });
    response.cookie('USER', cookies.USER, {
        maxAge: 24 * 60 * 60 * 1000
    });
    response.cookie('ROLE', cookies.ROLE, {
        maxAge: 24 * 60 * 60 * 1000
    });
    response.cookie('LANGUAGE', cookies.LANGUAGE, {
        maxAge: 24 * 60 * 60 * 1000
    });
    response.cookie('CURRENCY', cookies.CURRENCY, {
        maxAge: 24 * 60 * 60 * 1000
    })
    return response;
}

exports.clearCookies = (response) => {
        response.clearCookie('TOKEN');
        response.clearCookie('ROLE');
        response.clearCookie('SESSION_ID');
        response.clearCookie('LANGUAGE');
        response.clearCookie('USER');
        response.clearCookie('CURRENCY');
        return response;
};
