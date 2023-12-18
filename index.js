const express = require('express')
const session = require('express-session')

const app = express()

app.use(session({
    secret:'my-secret-key',//a secret string used to sign the session ID cookie
    resave:false,//don't save session if unmodified
    saveUninitialized:false,//don't create session until something stored
    cookie:{maxAge:5000}
}))


app.get('/', (req,res)=>{
    if(req.session.views){
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p> views: ' +req.session.views+ '</p>')
        res.write('<p>expires in: '+(req.session.cookie.maxAge/1000) + 's</p>')
        res.end()
    }else{
        req.session.views =1
        res.end('welcome to the session demo. refresh!')
    }
})

app.listen(3000, ()=>{
    console.log('Your server is running on PORT 3000')
})