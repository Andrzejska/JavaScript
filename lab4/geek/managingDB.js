const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'C:/Paladin/Nauka/JS/lab4/geek/uni.db'
});

function checkSuccessfulConnection(sequelize) {
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


function createStudentTable() {
  Student.sync({
    force: true
  }).then(() => {
    return Student.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });
}

function createTeacherTable() {
  Teacher.sync({
    force: true
  }).then(() => {
    return Teacher.create({
      firstName: 'Andrii',
      lastName: 'Trishch'
    });
  });
}

function createLessonTable() {
  Teacher.hasMany(Lesson);
  Lesson.belongsTo(Teacher)
  Student.hasMany(Lesson)
  Lesson.hasMany(Student)
  Lesson.sync({
    force: true
  }).then(() => {
    return Lesson.create({
      name: 'Javascript',
      teacherId: 1
    });
  });
}

function createMarkTable() {
  Teacher.hasMany(Mark)
  Student.hasMany(Mark)
  Lesson.hasMany(Mark)
  Mark.belongsTo(Teacher)
  Mark.belongsTo(Student)
  Mark.belongsTo(Lesson)
  Mark.sync({
    force: true
  }).then(() => {
    return Mark.create({
      value: 5,
      teacherId: 1,
      lessonId: 1,
      studentId: 1
    });
  });
}

function createTables() {
  createTeacherTable()
  createLessonTable()
  createStudentTable()
  createMarkTable()
}


checkSuccessfulConnection(sequelize);

const Student = sequelize.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNULL: false
  }
})

const Teacher = sequelize.define('teacher', {
  firstName: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNULL: false
  }
})

const Lesson = sequelize.define('lesson', {
  name: {
    type: Sequelize.STRING,
    allowNULL: false,
  }
})

const Mark = sequelize.define('mark', {
  value: {
    type: Sequelize.INTEGER,
    allowNULL: false
  }
})




async function allTeachersLessons(firstName) {
  teacher = await Teacher.findOne({
    raw: true,
    where: {
      firstName: firstName
    }
  });

  lessons = await Lesson.findAll({
    raw: true,
    where: {
      teacherId: (teacher == null ? 0 : teacher.id)
    },
    attributes: ['name']
  });

  result = await "Teacher ".concat(firstName).concat(" lessons: \n");
  for (var i = 0; i < lessons.length; i++) {
    result = result.concat(i + 1).concat(". ").concat(lessons[i].name).concat("\n")
  }
  return result;
}

async function allLessonsStudents(name) {
  lesson = await Lesson.findOne({
    raw: true,
    where: {
      name: name
    }
  });

  student = await Student.findAll({
    raw: true,
    where: {
      lessonId: (lesson == null ? 0 : lesson.id)
    },
    attributes: ['firstName', 'lastName']
  });
  result = await "Student list for lesson ".concat(name).concat(": \n")
  for (var i = 0; i < student.length; i++) {
    result = result.concat(i + 1).concat(". ").concat(student[i].firstName).concat(" ").concat(student[i].lastName).concat("\n");
  }
  return result;
}


async function addStudent(firstName, lastName) {
  Student.create({
    firstName: firstName,
    lastName: lastName,
    lessonId: 3
  })
}
module.exports.addStudent = addStudent;
module.exports.allTeachersLessons = allTeachersLessons;
module.exports.allLessonsStudents = allLessonsStudents;