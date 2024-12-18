const person1 = {
    name: "d",
    alter: "1",
    beruf: "ddd"
}


const person2 = {
    name: "d",
    alter: "2",
    beruf: "ddd"
}


const person3 = {
    name: "d",
    alter: "3",
    beruf: "ddd"
}


let PersonArray = [person1, person2, person3]


const berufeListe = PersonArray.map(person => person.beruf);


console.log(`die liste ist: ${berufeListe}`)