let Students = [];
var i;
var j;
var storage = window.localStorage;
var expect = chai.expect;

function addStudent() {
    if (document.forms['add-student'] != null) {
        var input = document.forms['add-student'];
        var newStudent = {
            name: input['name'].value,
            surname: input['surname'].value,
            phone: input['phone'].value,
            Subjects: []
        }
        if (input['storage'].checked) window.localStorage.setItem(newStudent.name, JSON.stringify(newStudent));
        Students.push(newStudent);
    }
}

function addSubject() {
    var myStudent;
    if (document.forms['add-subject'] != null) {
        var input = document.forms['add-subject'];
        if (!document.forms['add-student']['storage'].checked) {
            for (i = 0; i < Students.length; i++) {
                if (Students[i].name === input['studentName'].value) {
                    myStudent = Students[i];
                    break;
                }
            }
        } else myStudent = JSON.parse(storage.getItem(input['studentName'].value));

        myStudent.Subjects.push({
            name: input['name'].value,
            Grades: []
        })
    }
    if (document.forms['add-student']['storage'].checked) storage.setItem(myStudent.name, JSON.stringify(myStudent));
}

function addGrade() {
    var myStudent;
    var input = document.forms['add-grade'];

    if (!document.forms['add-student']['storage'].checked) {
        for (i = 0; i < Students.length; i++) {
            if (Students[i].name === input['studentName'].value) {
                myStudent = Students[i];
                break;
            }
        }
    } else myStudent = JSON.parse(storage.getItem(input['studentName'].value));

    var mySubject;
    for (i = 0; i < myStudent.Subjects.length; i++) {
        if (myStudent.Subjects[i].name === input['name'].value) {
            mySubject = myStudent.Subjects[i];
        }
    }
    mySubject.Grades.push(input['grade'].value);
    if (document.forms['add-student']['storage'].checked) storage.setItem(myStudent.name, JSON.stringify(myStudent));

}




function writeStudent() {
    var input = document.forms['write'];
    var myStudent;
    if (!document.forms['add-student']['storage'].checked) {
        for (i = 0; i < Students.length; i++) {
            if (Students[i].name === input['name'].value) {
                myStudent = Students[i];
                break;
            }
        }
    } else
        myStudent = JSON.parse(storage.getItem(input['name'].value));
    var Grades = "";
    var uni = "";
    var length = 0;
    i = 0;

    for (i = 0; i < myStudent.Subjects.length; i++) {
        for (j = 0; j < myStudent.Subjects[i].Grades.length; j++) {
            uni = myStudent.Subjects[i].Grades[j];
            Grades += myStudent.Subjects[i].name + " -> " +
                uni +
                "</br>";
        }
    }
    if (myStudent != null) document.getElementById('demo').innerHTML = "Student name -> " + myStudent.name +
        "</br>" + "Student surname -> " + myStudent.surname + "</br>" + "List of grades :" + "</br>" + Grades;
}

describe('Tests', function () {
    it('Adding the student', function () {
        addStudent();
        var newStudent = {
            name: 'Andrii',
            surname: 'Trishch',
            phone: '142423553',
            Subjects: []
        }
        expect(Students[0].name).to.equal(newStudent.name)

    });
    it('Adding the student', function () {
        addSubject();
        var newStudent = {
            name: 'Andrii',
            surname: 'Trishch',
            phone: '142423553',
            Subjects: [{
                name: 'Computer Science',
                Grades: []
            }]
        }
        expect(Students[0].Subjects[0].name).to.equal(newStudent.Subjects[0].name)

    });
    it('Adding the grade', function () {
        addGrade();
        var newStudent = {
            name: 'Andrii',
            surname: 'Trishch',
            phone: '142423553',
            Subjects: [{
                name: 'Computer Science',
                Grades: ['5']
            }]
        }
        expect(Students[0].Subjects[0].Grades[0]).to.equal(newStudent.Subjects[0].Grades[0])

    });
});