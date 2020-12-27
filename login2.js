const express = require("express")
const app = express()
//const port = 3000
var attempt = 3; // Variable to count number of attempts.

// Below function Executes on click of login button.
app.set("view engine", "ejs")
app.get("/", function(req, res) {
	res.render("login.ejs")
});

function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

if ( username == "123456" && password == "123456"){
alert ("Login successfully");


// Redirecting to other page.

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
app.listen(8099, function(){
      console.log('listening on 8099')
    })
