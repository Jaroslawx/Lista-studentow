# Lista-studentow

Zaimplementuj i przetestuj poniższe typy obiektów:

Student:

- ma imię, nazwisko, numer indeksu i liczbę zdobytych punktów
- oferuje metodę zwracającą sformatowany string ze swoimi danymi
- pozwala na zmianę liczby punktów

Lista:

- lista studentów - zawiera kolekcję obiektów typu Student
- pozwala na pobranie jednego studenta po numerze indeksu (zwraca obiekt)
- wyszukuje po nazwisku, zwraca listę studentów których nazwisko zaczyna się od wskazanego ciągu znaków (rozmiar nie ma znaczenia)
- zwraca sformatowaną listę informacji o wszystkich studentach (jako string)
- pozwala na dodanie studenta (generując unikalny numer indeksu)
- pozwala na usunięcie studenta (po numerze indeksu)
- oblicza średnią punktów dla wszystkich studentów
- zwraca sformatowaną listę studentów o liczbie punktów równej bądź większej niż wskazana wartość (jako jeden string)
- zwraca sformatowaną listę N studentów (gdzie N jest parametrem metody) o najwyższej liczbie punktów (uwaga: jeśli poprosimy o 3 osoby, ale np. osoba czwarta ma tyle samo co trzecia, również należy ją dołączyć do listy)
- pozwala na hurtowe wystawienie ocen dla wszystkich studentów na podstawie wskazanego maksimum punktów do zdobycia (50% maksimum to dst, 60% to dst+, 70% db, 80% db+, 90% bdb)
- zwróci posortowaną alfabetycznie i sformatowaną listę nazwisk (jako string)
- oblicza statystykę ocen (ile osób zdobyło dany stopień)

Wszystkie operacje należy przetestować. Testy można wykonać korzystając z przygotowanego zaczątku interfejsu:

https://jsbin.com/loqijesifo/edit?js,output
