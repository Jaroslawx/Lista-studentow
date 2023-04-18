class Student {

    constructor(firstName, lastName, indexNumber, pointsEarned) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.indexNumber = indexNumber;
        this.pointsEarned = pointsEarned;
        this.grade = null;
    }

    //oferuje metodę zwracającą sformatowany string ze swoimi danymi
    getData() {
        return `Student: ${this.firstName} ${this.lastName}, Index: ${this.indexNumber}, Points: ${this.pointsEarned}`;
    }

    //pozwala na zmianę liczby punktów
    setPoints(points) {
        this.pointsEarned = points;
    }
}

class StudentList {

    constructor(students) {
        this.students = students;
        this.nextIndexNumber = students.length + 1; // następny numer indeksu
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
    
    //pozwala na hurtowe wystawienie ocen dla wszystkich studentów na podstawie wskazanego maksimum punktów do zdobycia (50% maksimum to dst, 60% to dst+, 70% db, 80% db+, 90% bdb)
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

    //oblicza statystykę ocen (ile osób zdobyło dany stopień)
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

    //pozwala na pobranie jednego studenta po numerze indeksu (zwraca obiekt)
    getStudentByIndex(index) {
        return this.students.find(student => student.indexNumber === index);
    }
    
    //wyszukuje po nazwisku, zwraca listę studentów których nazwisko zaczyna się od wskazanego ciągu znaków (rozmiar nie ma znaczenia)
    getStudentByLastName(lastName) {
        return this.students.filter(student => student.lastName.toLowerCase().startsWith(lastName.toLowerCase()));
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
        const lista = new StudentList([
            new Student("Adam", "Kowalski", 1, 75),
            new Student("Anna", "Nowak", 2, 82),
            new Student("Piotr", "Wisniewski", 3, 85),
            new Student("Krystian", "Polak", 4, 30),
        ]);

        for (let i = 0; i < lista.students.length; i++) {
            console.log(lista.students[i].getData());
        }

        lista.students.forEach(student => {
            if (student.indexNumber === 3) {
                student.setPoints(100);
            }
        });

        //console.log(lista.getStudentByIndex(1));
        //console.log(lista.getStudentByLastName("Nowak"));

        console.log(lista.getStudentList());

        lista.addStudent("Maria", "Szymanska", 60);
        lista.removeStudentByIndex(1);

        console.log(`Średnia punktów dla wszystkich studentów: ${lista.getAveragePoints()}`);

        console.log(lista.formatStudentsListByPoints(80));

        lista.gradeAllStudents(100);

        const gradeStats = lista.calculateGradeStats();

        console.log("Liczba studentów z daną oceną:");
        for (const grade in gradeStats) {
            console.log(`${grade}: ${gradeStats[grade]}`);
        }

        console.log(lista.getStudentList());
        console.log(lista.getSortedLastNames());

    }
}

Program.main();
