
const person1 = { name: 'Alice', age: 30, job: 'Engineer' };
const person2 = { name: 'Bob', age: 24, job: 'Designer' };
const person3 = { name: 'Carol', age: 28, job: 'Teacher' };


const people = [person1, person2, person3];
console.log('People', people);


const jobs = people.map(person => person.job);
console.log('Berufe:', jobs);


const newPerson = { name: 'Dave', age: 35, job: 'Chef' };
const updatedPeople = [...people, newPerson];


console.log('Aktualisiertes Array:', updatedPeople);
