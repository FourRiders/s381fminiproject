const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const dbName ='Restaurant';
const assert = require("assert")

app.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://project:student@project.o5iiu.mongodb.net/Restaurant?retryWrites=true&w=majority"
app.set('view engine','ejs')
const url = 'mongodb+srv://project:student@project.o5iiu.mongodb.net/Restaurant?retryWrites=true&w=majority';

const client = new MongoClient(url);
const ObjectID = require("mongodb").ObjectID;
const { ObjectId } = require('mongodb');


app.get("/login", function(req, res) {
	res.render("login.ejs")
});

function validate(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  
  if ( username == "123456" && password == "123456"){
  alert ("Login successfully");

  return false;
  }
  else{
  
  attempt --;// Decrementing by one.
  
  alert("You have left "+attempt+" attempt;");
  
  // Disabling fields after 3 attempts.
  
  if( attempt == 0){
  document.getElementById("username").disabled = true;
  document.getElementById("password").disabled = true;
  document.getElementById("submit").disabled = true;
  return false;
  }
  }
  }

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('Restaurant')
    const RESTAURANTCollection = db.collection('RESTAURANT')
  
    app.post('/create', (req, res) => {
      RESTAURANTCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/BTH')
        })
        .catch(error => console.error(error))
    })


    app.post('/delete', (req, res) => {
      RESTAURANTCollection.deleteOne(req.body)
        .then(result => {
          res.redirect('/DS')
        })
        .catch(error => console.error(error))
    })

    app.post('/edit', (req, res) => {
      RESTAURANTCollection.findOneAndUpdate(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })



    app.get('/BTH', (req, res) => {
      console.log(req.body)
      res.render('BTH.ejs')
    })

    app.get('/DS', (req, res) => {
      console.log(req.body)
      res.render('DS.ejs')
    })

    app.listen(8099, function(){
      console.log('listening on 8099')
    })


    app.get('/create', (req, res) => {
      db.collection('RESTAURANT').find().toArray()
        .then(results => {
          res.render('create.ejs', {create: results})
        })
        .catch(/* ... */)
    })

    app.get('/delete', (req, res) => {
      db.collection('RESTAURANT').find().toArray()
        .then(results => {
          res.render('delete.ejs', {create: results})
        })
        .catch(/* ... */)
    })


    app.get('/edit', (req, res) => {
      db.collection('RESTAURANT').find('name').toArray()
        .then(results => {
          res.render('edit.ejs', {create: results})
        })
        .catch(/* ... */)
    })





    /*app.get('/', (req, res) => {
      const cursor = db.collection('RESTAURANT').find()
      console.log(cursor)
      // ...
    })*/

    app.get('/', (req, res) => {
      db.collection('RESTAURANT').find().toArray()
        .then(results => {
          console.log(results)
        })
        .catch(error => console.error(error))
      // ...
    })

    app.get('/find', (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('RESTAURANT');
      const query = req.query
      collection.find({}).toArray(function(err,doc){
        assert.equal(err,null)
    
        res.render("search",{'restaurant':doc,query})
       
        
    
      })
    
      }) 


      app.get("/testdisplay", (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('RESTAURANT');
    const x = {name: req.query.name}
  
    collection.find(x).toArray(function(err,r){
      assert.equal(err, null);
      try{
      if(x != undefined){
      res.render("test_display",{ 'restaurant':r})
    }else 
    { res.redirect('/display')}
    
  }catch(error){
    console.error(error);
  }


    })
  })





    /*app.post('/quotes', (req, res) => {
      console.log('Hellooooooooooooooooo!')

      app.get('/', (req, res) =>{
        res.sendFile('/home/developer/test1' + '/index.html')
      })
  

  })*/
})  
.catch(console.error)




