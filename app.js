const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Student = require('./models/student');

const app = express();

// mongoose.connect('mongodb+srv://sadiq:KszorR10J4yXQWoa@cluster0-m613z.mongodb.net/test?retryWrites=true&w=majority')
// 	.then(() => console.log('connected to Mongodb Atlas!'))
// 	.catch((err) => console.error(err))

mongoose.connect('mongodb+srv://bolaji:uJ3852pe5p8RdGst@cluster0-zydpm.mongodb.net/test?retryWrites=true&w=majority')
	.then(() => console.log('connected to the cluster successfully'))
	.catch((error) => console.log('connection failed', error))

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// get post delete put patch

app.post('/api/admin', (req, res, next) => {
	const studentReg = new Student({
			regNo: req.body.regNo
		})
		studentReg.save().then(
			() => console.log('reg number saved')
		).catch((err) => {
			console.log('saved unsuccesful')
		})
});

app.get('/api/admin', (req, res, next) => {
	Student.find().then(
		(students) => {
			res.status(200).json(students)
		}).catch(
		(err) => {
			res.status(404).json({error: err})
		})
});

app.get('/api/admin/:id', (req, res, next) => {
	Student.findOne({_id: req.params.id}).then(
		(student) => res.status(200).json(student)).catch(
		(err) => res.status(404).json(err))
});

app.put('/api/admin/:id', (req, res, next) => {
	const studentReg = new Student({
			_id: req.params.id,
			regNo: req.body.regNo,
		})
	Student.updateOne({_id: req.params.id}, studentReg).then(
		() => res.status(201).json({message: 'student reg updated'})).catch(
		(err) => res.status(400).json({error: err}))
});

app.delete('/api/admin/:id', (req, res, next) => {
	Student.deleteOne({ _id: req.params.id }).then(
		() => res.status(200).json({ message: 'Deleted'})).catch(
		(err) => res.status(404).json({error: err}))
});

module.exports = app;
