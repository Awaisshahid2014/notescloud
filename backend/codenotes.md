=> to use req.body() ==> we must use a middleware first to handle undefined.
app.user(express.json())
================================================JWT Authentication====================== v.49 (5:33)
jwt.sign({
data: 'foobar'
}, 'secret', { expiresIn: '1h' });

jwt.verify(token, secretOrPublicKey, [options, callback]) // it is to verify the generated token is correct and unchanged by attacker
