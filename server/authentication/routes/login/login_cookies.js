// Setting cookies
exports.setCookies = (response, session, credentials) => {
    response.cookie('TOKEN', session.token, {
        maxAge: 24 * 60 * 60 * 1000,
        withCredentials: true,
        httpOnly: true,
        //secure: true
    });
    response.cookie('SESSION_ID', session.id, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
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
    return response;
}