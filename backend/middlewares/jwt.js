const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
    
    }).unless({
        path: [
           
            `${api}/client/login`,
            `${api}/client/register`,
            `${api}/category/`,
            `${api}/service/`,
            `${api}/vendor/`,
            `${api}/orders/`,
        ]
    })
}

/*async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}
*/


module.exports = authJwt;