const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const { response } = require('express')


//configure express
const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname,'../public')
const templatePath = path.join(__dirname,'../template')
app.use(express.static( publicDirPath ))
app.set('view engine','hbs')
app.set('views',templatePath+'/views')
hbs.registerPartials(templatePath+'/partials')

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        author: 'Samir'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    forecast(req.query.address, (error, response)=>{
        if(error) {
            res.send({
                error: error
            })
        }
        else {
            res.send({
                temperature: response.body.current.temperature,
                location: response.body.location.name,
                address: req.query.address 
            })
        }
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: ['hello','world']
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        author: 'Samir'
    })
})


app.get('', (req, res) => {
    res.render('index',{
        title:'Homepage',
        author: 'Samir'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 Error',
        errorMessage: 'Help topic not found! Try another.',
        author: 'Samir'
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        title: '404 Error',
        errorMessage: 'Page not found!',
        author: 'Samir'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})



