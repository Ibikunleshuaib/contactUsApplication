const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nodekb', {useNewUrlParser: true});
let db = mongoose.connection
const app = express();
const PORT = process.env.PORT || 5001;

//Check connection
db.once('open', () => {
    console.log('connected to MongoDB');
});

//check for DB errors
db.on('error', (err) => {
    console.log(err);  
});

let Message = require('./models/message')
let Subscribe = require('./models/subscribe')
 
 // Parse application json
 app.use(bodyParser.json());
 app.use(express.json());
 app.use(bodyParser.urlencoded({ extended: false}));


 //Set public folder

app.use(express.static(path.join(__dirname, 'public')));


//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

  

app.get('/', (req, res) => {
   res.render('contact.ejs')
});

app.get('/testing', (req, res) => {
    Message.find({}, (err, message) => {
		if (err){
			console.log(err);
		}else {
			res.render('testing', {
				//We are passing a 'message' from the function or query to the view
				message: message

			});
    }
    });
});


app.post('/testing', (req, res) => {
    let newContent = new Message();
    newContent.name = req.body.name;
    newContent.email = req.body.email;
    newContent.phoneNumber = req.body.phoneNumber;
    newContent.businessType = req.body.businessType;
    newContent.content = req.body.content;
	newContent.save((err) =>{
		if(err){
			console.log(err);
			return;
		} else{
            console.log(newContent)
			res.redirect('/')
		}
	})
});


app.get('/subscribe', (req, res) => {
    Subscribe.find({}, (err, subscribe) => {
		if (err){
			console.log(err);
		}else {
			res.render('subscribe', {
				//We are passing a 'subscribe' from the function or query to the view
				subscribe: subscribe
			});
    }
    });
});

app.post('/subscribe', (req, res) => {
    let newSubscribe = new Subscribe();
    newSubscribe.email = req.body.email;
    newSubscribe.save((err) =>{
		if(err){
			console.log(err);
			return;
		} else{
            console.log(newSubscribe)
			res.redirect('/')
		}
	})
	
	
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT ` + PORT + " bitch! ")
});