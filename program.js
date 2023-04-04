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

class ListaStudentow {

    constructor(students) {
        this.students = students;
        this.nextIndexNumber = students.length + 1; // następny numer indeksu
    }
  
    getStudentByIndex(index) {
        return this.students.find(student => student.indexNumber === index);
    }

    getStudentByLastName(lastName) {
        return this.students.filter(student => student.lastName.toLowerCase().startsWith(lastName.toLowerCase()));
    }

    addStudent(firstName, lastName, pointsEarned) {
        const student = new Student(firstName, lastName, this.nextIndexNumber, pointsEarned);
        this.students.push(student);
        this.nextIndexNumber++; // zwiększenie wartości dla następnego numeru indeksu
        return student;
    }

    removeStudentByIndex(index) {
        const indexToRemove = this.students.findIndex(student => student.indexNumber === index);
        if (indexToRemove === -1) {
            return false; // jeśli nie znaleziono studenta z takim numerem indeksu, to zwraca false
        }
        this.students.splice(indexToRemove, 1); // usuwa studenta z listy
        return true; // zwraca true, jeśli udało się usunąć studenta
    }
}

// Testowanie
const lista = new ListaStudentow([
    new Student("Adam", "Kowalski", 1, 75),
    new Student("Anna", "Nowak", 2, 82),
    new Student("Piotr", "Wisniewski", 3, 90),
]);
  
lista.addStudent("Maria", "Szymanska", 60);
lista.removeStudentByIndex(2);

for (let i = 0; i < lista.students.length; i++) {
    console.log(lista.students[i].getData());
}