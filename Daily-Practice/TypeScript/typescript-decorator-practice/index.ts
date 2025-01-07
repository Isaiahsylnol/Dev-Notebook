import { User } from './user';

const user = new User('Isaiah');
console.log(user);

console.log('\n');
console.log('*********************************');
console.log('\n');

function Log(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Method ${propertyName} called with arguments:`, args);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(2, 3));

console.log('\n');
console.log('************ Decorator 1 ************');

function ReadOnly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
  });
}

class Car {
  @ReadOnly
  // false rule is applied on the prototype, all instances of the Car class will enforce this rule.
  brand = 'Tesla';
}

const car = new Car();
car.brand = 'Ford'; // Error: Cannot assign to read-only property

console.log('\n');
console.log('************ Decorator 2 ************');

function SealClass(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  Object.defineProperty(target, propertyName, {
    writable: false,
  });
}

@SealClass
class BankAccount {
  balance: number = 1000;

  deposit(amount: number) {
    this.balance += amount;
  }
}

// Attempt to add a new property or method
(BankAccount.prototype as any).withdraw = function (amount: number) {
  this.balance -= amount;
};

const account = new BankAccount();
console.log(account.balance); // Should be 1000
account.deposit(500);
console.log(account.balance); // Should be 1500
account.withdraw(200); // Should throw an error or be undefined
console.log(account.balance); // Should be 1500

console.log('\n');
console.log('************ Decorator 3 ************');

function LogMethod(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  let original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Method "${propertyName}" is logging: ${args}`);
  };
}

class Printer {
  @LogMethod
  printArray(args: number[]) {
    args.forEach((item) => console.log(item));
  }
}

let print = new Printer();
print.printArray([1, 2, 3, 5, 6]);
