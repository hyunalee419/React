interface Person {
    firstName: string;
    lastName: string;
}

function greeter_back3(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter_back3(user);
