function Logger(constructor: Function) {
  console.log(`Class ${constructor.name} was created.`);
}

@Logger
export class User {
  constructor(public name: string) {}
}
