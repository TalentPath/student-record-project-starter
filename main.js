/* Create a function to add student data to an array as an array of
objects and render objects to the page

Be sure your function parameters are given strict types

*/
/* Define your data structure using a custom Type.
https://www.digitalocean.com/community/tutorials/how-to-create-custom-types-in-typescript

Student
    First name (string)
    Last name (string)
    Course  (string)
    Grade (number or string)
    isPassing (boolean value if grade is greater than a D)

    If student is passing, render a green symbol/icon next to their entry in the table
    If student is not passing, render a red symbol/icon next to their entry in the table

    It is up to you to calculate based on grade (numerical or letter) if student is passing or not


    Data should be rendered in the form of a table, i.e.,

    |First Name|Last Name|Course|Grade (as Letter)|Passing?|
    | Leon     |Kennedy  |RE-101|  B              |   :)   |


    Add a button that sorts the data based on Grade (ascending order)
    Add a button that sorts teh data based on Course (ascending order)
*/
// =====================================================================================================
// Global Variables
var submit = document.getElementById('submit');
var first = document.getElementById('first');
var last = document.getElementById('Last');
var course = document.getElementById('Course');
var semester = document.getElementById('Semester');
var grade = document.getElementById('Grade');
var modify = document.getElementById('Modify');
var table_chart = document.getElementById('table');
var newArray = [];
// Student class & constructor 
var Student = /** @class */ (function () {
    function Student(first_name, last_name, course, semester, grade) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.course = course;
        this.grade = grade;
        this.semester = semester;
    }
    ;
    ;
    return Student;
}());
function newRow(student) {
    // // output variables 
    var row = document.createElement("tr");
    var first_td = document.createElement('td');
    var last_td = document.createElement('td');
    var courseName = document.createElement('td');
    var grade = document.createElement('td');
    var sem = document.createElement('td');
    var pass = document.createElement('td');
    var letter = document.createElement('td');
    var modify = document.createElement('td');
    // ----------------------Button ---------------------
    var deleteBtn = document.createElement('button');
    var editBtn = document.createElement('button');
    editBtn.innerHTML = '<class ="edit" onclick="" >Edit';
    deleteBtn.innerHTML = "<class =\"delete\">Delete";
    modify.appendChild(deleteBtn);
    modify.appendChild(editBtn);
    // for(let i = 0; i< newArray.length; i++){
    //    delete_row(newArray[i])
    // }
    var table_len = (table_chart.rows.length);
    // console.log(table_len)
    deleteBtn.addEventListener('click', function (event) {
        var deleted = document.getElementsByClassName('delete' + table_len);
        var x = document.getElementsByTagName("tr");
        var txt = "";
        var i;
        for (i = 0; i < x.length; i++) {
            txt = txt + "The index of Row " + (i + 1) + " is: " + x[i].rowIndex + "<br>";
            console.log;
        }
    });
    // -----------------input to output table --------------------
    first_td.innerHTML = student.first_name;
    last_td.innerHTML = student.last_name;
    courseName.innerHTML = student.course;
    grade.innerHTML = student.grade.toString();
    sem.innerHTML = student.semester;
    // Letter grade
    if (student.grade >= 90 && student.grade < 100) {
        letter.innerHTML = 'A';
    }
    else if (student.grade >= 80 && student.grade < 90) {
        letter.innerHTML = 'B';
    }
    else if (student.grade >= 70 && student.grade < 80) {
        letter.innerHTML = 'C';
    }
    else if (student.grade >= 60 && student.grade < 70) {
        letter.innerHTML = 'D';
    }
    else {
        letter.innerHTML = 'F';
    }
    //passing 
    if (student.grade > 70) {
        pass.innerHTML = '&#9745;';
    }
    else {
        pass.innerHTML = '&#9746;';
    }
    // ---------------- append to table ----------------
    row.appendChild(first_td);
    row.appendChild(last_td);
    row.appendChild(courseName);
    row.appendChild(sem);
    row.appendChild(grade);
    row.appendChild(letter);
    row.appendChild(pass);
    row.appendChild(modify);
    table_chart.appendChild(row);
    // console.log(newArray)
}
//
//Event Lisenters 
submit.addEventListener('click', function (event) {
    event.preventDefault();
    // console.log('I been clicked');
    var student = new Student(first.value, last.value, course.value, semester.value, parseInt(grade.value));
    newArray.push(student);
    newRow(student);
});
var x = document.getElementsByTagName("tr");
var txt = "";
var i;
for (i = 0; i < x.length; i++) {
    txt = txt + "The index of Row " + (i + 1) + " is: " + x[i].rowIndex + "<br>";
}
