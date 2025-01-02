class Person {
  private model: string;
  private age: number;
  private hobby: string;

  constructor(model, age, hobby) {
    this.model = model;
    this.age = age;
    this.hobby = hobby || 'relax';
  }

  greet() {
    console.log(`Hello ${this.model}`);
  }

  describe() {
    console.log(`${this.model} likes to ${this.hobby} on the weekends.`);
  }
}

let jake = new Person('jake', 24, '');
jake.greet();

jake.describe();

// =================================================================

console.log('');

// ES6 Class
class SmartPhone {
  year: number;
  model: string;
  memory: number;
  brand: string;

  constructor(year, model, brand, memory) {
    this.year = year;
    this.model = model;
    this.brand = brand;
    this.memory = memory;
  }
  printBrand() {
    console.log(this.brand);
  }
  calculateSinceRelease() {
    let currentYear = new Date().getFullYear();
    let diff = currentYear - this.year;
    console.log(`This phone has been on the market for ${diff} years.`);
  }
  printmodel() {
    // arrow function doesn't rebind this
    let n = () => {
      console.log(`Model: ${this.model}`);
    };
    return n();
  }
  printmodel2() {
    // will fail as this loses referrence
    let n = function () {
      console.log(`Model: ${this.name}`);
    };
    return n();
  }
}
let apple = new SmartPhone(2019, 'IPhone 12', 'Apple', 16);

apple.ring = function () {
  console.log('buzz buzz');
};

apple.printBrand();
apple.calculateSinceRelease();
apple.ring();
apple.printmodel();

// =================================================================

// Borrowing Methods

class Animal {
  species: string;
  noise: string;
  age: number;
  constructor(species, noise, age) {
    this.species = species;
    this.noise = noise;
    this.age = age;
  }
}

function makeNoise() {
  return `The ${this.species} ${this.noise}s`;
}

let duck = new Animal('bird', 'quack', 3);
console.log(makeNoise.call(duck));

// Add a method to the animal class
Animal.prototype.walk = function (amount: number) {
  return `the ${this.species} walks on ${amount} legs`;
};

let fox = new Animal('cat', 'yelp', 8);
console.log(fox.walk(4));

const dog = Object.create(new Animal('BUll', 'dd', 4));
dog.bark = () => {
  console.log('woof');
};
dog.bark();

// =================================================================

// Getters & Setters

class BankAccount {
  private _balance: number;

  constructor(balance: number) {
    this._balance = balance;
  }

  // Use getters for computed or read-only properties that conceptually feel like data (e.g., balance, area, isActive).
  get getBalance(): number {
    return this._balance;
  }

  // Setter
  set deposit(amount: number) {
    this._balance += amount;
  }
}

let shawn = new BankAccount(1200);

console.log(shawn.getBalance);

// In JavaScript and TypeScript, setters are accessed like properties, not called as methods.
shawn.deposit = 400;

console.log(shawn.getBalance);

import { StringHelper } from './stringHelper';

console.log(StringHelper.upperCase('isaiah'));
console.log(StringHelper.reverse('Dave'));


// =================================================================

// Object Method Overriding 

console.log('')

class Vehicle {
  make: string;
  move(){
    console.log("this vehilce moves");
  }
  getBrand(){
    console.log("car brand")
  }
}

class Car extends Vehicle{
  move(){
    super.move();
    console.log("the car drives");
  }
}

let honda = new Car()

honda.move()