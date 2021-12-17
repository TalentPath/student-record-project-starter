"use strict";
/* Create a function to add student data to an array as an array of
objects and render objects to the page

Be sure your function parameters are given strict types

*/
var _a;
var Sort;
(function (Sort) {
    Sort[Sort["NAME_ASC"] = 0] = "NAME_ASC";
    Sort[Sort["NAME_DESC"] = 1] = "NAME_DESC";
    Sort[Sort["GRADE_ASC"] = 2] = "GRADE_ASC";
    Sort[Sort["GRADE_DESC"] = 3] = "GRADE_DESC";
})(Sort || (Sort = {}));
class StudentRecord {
    constructor() {
        this.students = [];
    }
    addStudent() {
        //First we get the values from the form that was submitted
        let name = document.querySelector('#student-name').value;
        let course = document.querySelector('#student-course').value;
        let grade = document.querySelector('#student-grade').value;
        //Then we create a new object to place into localStorage
        let passing = (parseInt(grade) >= 70 ? true : false);
        let newStudent = {
            name: name,
            course: course,
            grade: grade,
            passing: passing,
            id: this.students.length,
        };
        //console.log(newStudent)
        //Finally, we add the item into local storage, with an ID of however many objects are currently in this.students (starts at 0)
        //After that, we call displayStudent()
        localStorage.setItem(`student${this.students.length}`, JSON.stringify(newStudent));
        this.displayStudent(false);
    }
    displayStudent(sorted, sortedStudents) {
        //First, we fill this.students with all of the information from local storage
        let keys = Object.keys(localStorage);
        //console.log(keys);
        let keyNum = keys.length;
        let index = 0;
        this.students = [];
        keys.sort().forEach((key) => {
            this.students.push(JSON.parse(localStorage.getItem(key) || '{}'));
        });
        console.log(keys);
        console.log(this.students);
        console.log(sortedStudents);
        //Then, we fill the student display with new elements containing all the information you need
        const studentDisplay = document.querySelector('.student-display');
        studentDisplay.innerHTML = '';
        for (let student of (sorted ? sortedStudents : this.students)) {
            index = this.students.findIndex(item => item.id === student.id);
            console.log(index);
            let newStudent = document.createElement('div');
            newStudent.classList.add('student');
            newStudent.classList.add(`${keys[index]}`);
            newStudent.innerHTML = `
            <div class="name">${student.name}</div>
            <div class="course">${student.course}</div>
            <div class="grade">${student.grade}
            <input type="number" value="${student.grade}" class="edit-field" style="display:none">
            <input type="button" value="Edit" class ="grade-edit">
            <input type="button" value="OK" class="update-grade" style="display:none"></div>
            <div class="passing"><i class="fas ${student.passing ? 'fa-check' : 'fa-times'}"></i></div>
            <input type="button" value="Remove" class="remove-student">
            `;
            studentDisplay.appendChild(newStudent);
            index++;
        }
        //For each of the new divs we created, we need to add event listeners to the remove and edit buttons
        let delButtons = document.getElementsByClassName('remove-student');
        for (let button of delButtons) {
            button.addEventListener('click', () => {
                this.removeStudent(button);
            });
        }
        //Edit buttons are a littlle more complicated cuz we need to move some other stuff out of the way, and then replace with the new edit form;
        let editButtons = document.getElementsByClassName('grade-edit');
        for (let button of editButtons) {
            button.addEventListener('click', () => {
                let editField = button.previousElementSibling;
                let okButton = button.nextElementSibling;
                let gradeDiv = button.parentElement;
                editField.style.display = "inline";
                okButton.style.display = "inline";
                gradeDiv.textContent = "";
                gradeDiv === null || gradeDiv === void 0 ? void 0 : gradeDiv.appendChild(editField);
                gradeDiv === null || gradeDiv === void 0 ? void 0 : gradeDiv.appendChild(okButton);
            });
        }
        let updateButtons = document.getElementsByClassName('update-grade');
        for (let button of updateButtons) {
            button.addEventListener('click', () => {
                this.updateGrade(button);
            });
        }
    }
    removeStudent(delButton) {
        //console.log(delButton);
        let studentIndex = delButton.parentElement;
        let storageIndex = studentIndex.classList[1];
        let index = parseInt(storageIndex[storageIndex.length - 1]);
        //console.log(studentIndex)
        console.log(index);
        //localStorage.removeItem(storageIndex)
        this.students.splice(index, 1);
        console.log(this.students);
        localStorage.clear();
        let counter = 0;
        for (let student of this.students) {
            localStorage.setItem(`student${counter}`, JSON.stringify(student));
            counter++;
        }
        this.displayStudent(false);
    }
    updateGrade(editButton) {
        //First, we get the index of the button that was pressed, so that we can change the value in this.students
        let studentIndex = editButton.parentElement.parentElement;
        let storageIndex = studentIndex.classList[1];
        let index = parseInt(storageIndex[storageIndex.length - 1]);
        //Then we take the new grade from the input field, and turn it into an integer to place in this.students at the index we found earlier
        let gradeField = editButton.previousElementSibling;
        let newGrade = parseInt(gradeField.value);
        this.students[index].grade = newGrade;
        console.log(this.students[index]);
        //Finally, we put it into localStorage in the same spot as storageIndex;
        localStorage.setItem(storageIndex, JSON.stringify(this.students[index]));
        //And then, we rebuild the list;
        this.displayStudent(false);
    }
    sortStudents(sortEnum) {
        //console.log(sortEnum)
        //This one's fairly simple. Depending on the sort-style, we create a new list of student objects, sort them accordingly, and display students with that sorted list
        let sortedStudents = [];
        if (sortEnum == 'NAME-ASC') {
            sortedStudents = this.students.sort(function (a, b) { if (a.name === b.name) {
                return a.course > b.course ? 1 : -1;
            } return a.name > b.name ? 1 : -1; });
            this.displayStudent(true, sortedStudents);
        }
        else if (sortEnum == 'NAME-DESC') {
            sortedStudents = this.students.sort(function (a, b) { if (a.name === b.name) {
                return a.course > b.course ? 1 : -1;
            } return a.name < b.name ? 1 : -1; });
            this.displayStudent(true, sortedStudents);
        }
        else if (sortEnum == 'GRADE-ASC') {
            sortedStudents = this.students.sort((a, b) => (a.grade > b.grade) ? 1 : -1);
            this.displayStudent(true, sortedStudents);
        }
        else if (sortEnum == 'GRADE-DESC') {
            sortedStudents = this.students.sort((a, b) => (a.grade < b.grade) ? 1 : -1);
            this.displayStudent(true, sortedStudents);
        }
        else if (sortEnum == 'NORMAL-SORT') {
            this.displayStudent(false);
        }
    }
}
let record = new StudentRecord();
record.displayStudent(false);
//This handles if a form submission is made
let studentForm = document.querySelector('#add-student');
let submitStudent = document.querySelector('#add-student .submit-button');
submitStudent.addEventListener('click', () => {
    record.addStudent();
    studentForm.reset();
});
//This handles if someone wants to sort. Lots of querySelectors
let nameAsc = document.querySelector('i.name-asc');
let nameDesc = document.querySelector('i.name-desc');
let gradeAsc = document.querySelector('i.grade-asc');
let gradeDesc = document.querySelector('i.grade-desc');
let normalSort = document.querySelector('i.normal-sort');
let sorts = [nameAsc, nameDesc, gradeAsc, gradeDesc, normalSort];
for (let sorter of sorts) {
    let sortType = (_a = (sorter === null || sorter === void 0 ? void 0 : sorter.classList[2])) === null || _a === void 0 ? void 0 : _a.toUpperCase();
    sorter === null || sorter === void 0 ? void 0 : sorter.addEventListener('click', () => {
        record.sortStudents(sortType);
    });
}
