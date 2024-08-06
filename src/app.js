const express = require('express')
let app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')
require('./dbConnection')
const UserCollection = require('../models/schema')
const bcrypt = require('bcryptjs')

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/register', (req, res) =>{
    res.render('registerClient')
})

app.get('/login', (req, res) => {
    res.render('login'); 
});


app.post('/register', async (req, res) =>{
    
      const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        if (password === confirmPassword) {
            try {
        
                const user1 = new UserCollection({
                   firstName: req.body.firstname,
                   lastName: req.body.lastname,
                   email: req.body.email,
                   gender: req.body.gender,
                   mobileNo: req.body.mobile,
                   dob: req.body.dob,
                   password: req.body.password,
                   confirmPassword: req.body.confirmPassword
                })
                
               const userData = await user1.save()
               console.log(userData);
               // console.log(req.body);
               
               res.redirect('/login');
            } catch (error) {
               console.log(error);   
               res.send('unsuccessful')
           }
        } else{
            res.send('<script>alert("password and confirm password should be same"); window.location.href="/register";</script>')
        }
}   )


app.post('/login', async (req, res) =>{
    try {
        const user = await UserCollection.findOne({email: req.body.email})

        if (!user) {
            console.log('invalid credentials');
        }
        const matchPassword = await bcrypt.compare(req.body.password, user.password)

            if (matchPassword) {
                res.redirect('/')
            } else{
                console.log('data did not match');
                res.send('<script>alert("data did not match"); window.location.href="/login";</script>')
            }
    } catch (error) {
        console.log(error);
        res.status(500).send('<script>alert("invalid details"); window.location.href="/login";</script>')
        
    }
})

app.listen(PORT, () =>{
    console.log(`app is running on ${PORT}`);
})