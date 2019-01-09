function greeter_back(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter_back(user);