class Student {

    constructor(firstName, lastName, indexNumber, pointsEarned) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.indexNumber = indexNumber;
        this.pointsEarned = pointsEarned;   
    }

    getData() {
        return `Student: ${this.firstName} ${this.lastName}, Index: ${this.indexNumber}, Points: ${this.pointsEarned}`;
    }

    setPoints(points) {
        this.pointsEarned = points;
    }

}

const students = [
    new Student("Adam", "Kowalski", 123456, 75),
    new Student("Anna", "Nowak", 234567, 82),
    new Student("Piotr", "Wisniewski", 345678, 90),
    new Student("Maria", "Szymanska", 456789, 60),
];

// for (let i = 0; i < students.length; i++) {
//     console.log(students[i].getData());
//}

class listaStudentow {

    constructor(students) {
        this.students = students;
    }
  
    getStudentByIndex(index) {
        return this.students.find(student => student.indexNumber === index);
    }

    getStudentByLastName(lastName) {
        return this.students.filter(student => student.lastName.toLowerCase().startsWith(lastName.toLowerCase()));
    }
}
