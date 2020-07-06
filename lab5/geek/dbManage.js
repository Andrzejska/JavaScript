var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var db = mongoose.connection;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("hello")
});

var lessonSchema = new Schema({
    id: ObjectId,
    name: String,
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
})

var teacherSchema = new Schema({
    id: ObjectId,
    firstName: String,
    lastName: String,
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }]
})

var studentSchema = new Schema({
    id: ObjectId,
    firstName: String,
    lastName: String,
    marks: [{
        type: Schema.Types.ObjectId,
        ref: 'Mark'
    }]
})

var markSchema = new Schema({
    id: ObjectId,
    teacher_id: Number,
    student_id: Number,
    lesson_id: Number,
    value: Number
})

const Mark = mongoose.model('Mark', markSchema);
const Student = mongoose.model('Student', studentSchema);
const Lesson = mongoose.model('Lesson', lessonSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
db.on('error', console.error.bind(console, 'connection error:'));