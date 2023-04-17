class Student {

    constructor(firstName, lastName, indexNumber, pointsEarned) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.indexNumber = indexNumber;
        this.pointsEarned = pointsEarned;
        this.grade = null;
    }

    getData() {
        return `Student: ${this.firstName} ${this.lastName}, Index: ${this.indexNumber}, Points: ${this.pointsEarned}`;
    }

    setPoints(points) {
        this.pointsEarned = points;
    }

}

//lista studentów - zawiera kolekcję obiektów typu Student
class ListaStudentow {

    constructor(students) {
        this.students = students;
        this.nextIndexNumber = students.length + 1; // następny numer indeksu
    }
  
    //pozwala na pobranie jednego studenta po numerze indeksu (zwraca obiekt)
    getStudentByIndex(index) {
        return this.students.find(student => student.indexNumber === index);
    }

    //wyszukuje po nazwisku, zwraca listę studentów których nazwisko zaczyna się od wskazanego ciągu znaków (rozmiar nie ma znaczenia)
    getStudentByLastName(lastName) {
        return this.students.filter(student => student.lastName.toLowerCase().startsWith(lastName.toLowerCase()));
    }

    //pozwala na dodanie studenta (generując unikalny numer indeksu)
    addStudent(firstName, lastName, pointsEarned) {
        const student = new Student(firstName, lastName, this.nextIndexNumber, pointsEarned);
        this.students.push(student);
        this.nextIndexNumber++; // zwiększenie wartości dla następnego numeru indeksu
        return student;
    }

    //pozwala na usunięcie studenta (po numerze indeksu)
    removeStudentByIndex(index) {
        const indexToRemove = this.students.findIndex(student => student.indexNumber === index);
        if (indexToRemove === -1) {
            return false; // jeśli nie znaleziono studenta z takim numerem indeksu, to zwraca false
        }
        this.students.splice(indexToRemove, 1); // usuwa studenta z listy
        return true; // zwraca true, jeśli udało się usunąć studenta
    }

    //oblicza średnią punktów dla wszystkich studentów
    getAveragePoints() {
        if (this.students.length === 0) {
          return 0;
        }
        const totalPoints = this.students.reduce((acc, student) => acc + student.pointsEarned, 0);
        const averagePoints = totalPoints / this.students.length;
        return averagePoints;
    }

    gradeAllStudents(maxPoints) {
        const scoreThresholds = [0.5, 0.6, 0.7, 0.8, 0.9];
        const gradeThresholds = ["DST", "DST+", "DB", "DB+", "BDB"];
        this.students.forEach((student) => {
            const scorePercent = student.pointsEarned / maxPoints;
            let grade = "NDST"; // not graded yet
            for (let i = 0; i < scoreThresholds.length; i++) {
                if (scorePercent >= scoreThresholds[i]) {
                    grade = gradeThresholds[i];
                } 
                else {
                    break;
                }
            }
        student.grade = grade;
        });  
    }

    calculateGradeStats() {
        const gradeStats = {
            "NDST": 0, // not graded yet
            "DST": 0,
            "DST+": 0,
            "DB": 0,
            "DB+": 0,
            "BDB": 0 
        };
        this.students.forEach((student) => {
            gradeStats[student.grade] += 1;
        });
        return gradeStats;
    }

    //zwraca sformatowaną listę informacji o wszystkich studentach (jako string)
    getStudentList() {
        let studentList = "";
        this.students.forEach((student) => {
            const formattedStudent = `${student.firstName} ${student.lastName}, Indeks: ${student.indexNumber}, Punkty: ${student.pointsEarned}, Ocena: ${student.grade}\n`;
            studentList += formattedStudent;
        });
        return studentList;
    }

    //zwraca sformatowaną listę studentów o liczbie punktów równej bądź większej niż wskazana wartość (jako jeden string)
    formatStudentsListByPoints(minPoints) {
        let studentList = "";
        this.students.forEach((student) => {
            if (student.pointsEarned >= minPoints) {
                const formattedStudent = `${student.firstName} ${student.lastName}, Indeks: ${student.indexNumber}, Punkty: ${student.pointsEarned}, Ocena: ${student.grade}\n`;
                studentList += formattedStudent;
            }
            }); 
        return studentList;
    }

    //zwraca sformatowaną listę N studentów (gdzie N jest parametrem metody) o najwyższej liczbie punktów (uwaga: jeśli poprosimy o 3 osoby, ale np. osoba czwarta ma tyle samo co trzecia, również należy ją dołączyć do listy)
    getTopStudents(numStudents) {
        // sortujemy studentów malejąco po liczbie punktów
        const sortedStudents = this.students.sort((a, b) => b.pointsEarned - a.pointsEarned);
      
        // tworzymy nową listę studentów
        const topStudents = [];
        let i = 0;
        while (i < numStudents && i < sortedStudents.length) {
            // jeśli mamy jeszcze miejsce na studentów i są jeszcze nierozpatrzeni studenci
            topStudents.push(sortedStudents[i]);
            i++;
      
            // sprawdzamy, czy kolejny student ma tyle samo punktów, co ostatni na liście
            while (i < sortedStudents.length && sortedStudents[i].pointsEarned === topStudents[topStudents.length - 1].pointsEarned) {
                topStudents.push(sortedStudents[i]);
                i++;
            }  
        }
      
        // formatujemy listę studentów i zwracamy jako string
        let studentList = "";
        topStudents.forEach(student => {
            const formattedStudent = `${student.firstName} ${student.lastName}, Indeks: ${student.indexNumber}, Punkty: ${student.pointsEarned}, Ocena: ${student.grade}\n`;
            studentList += formattedStudent;
        });
        return studentList;
    }
    
    //zwróci posortowaną alfabetycznie i sformatowaną listę nazwisk (jako string)
    getSortedLastNames() {
        const sortedStudents = this.students.sort((a, b) => {
            if (a.lastName < b.lastName) return -1;
            if (a.lastName > b.lastName) return 1;
            return 0;
        });

        const lastNames = sortedStudents.map(student => student.lastName);
        return lastNames.join(", ");
    }

}
class Program {
    static main() {
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

        console.log(lista.getStudentList());

    }
}

Program.main();
