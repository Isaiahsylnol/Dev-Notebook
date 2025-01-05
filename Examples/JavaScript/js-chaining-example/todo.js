class TodoList {
  arr = [];

  addTodo(obj) {
    let data = { name: obj.name, completed: obj.status ?? false };
    this.arr.push(data);
    return this;
  }
  removeTodo(text) {
    // findIndex() stops searching as soon as it finds the task, which is more efficient than methods like filter() that iterate through the entire array.
    const index = this.arr.findIndex((item) => item.name === text);

    if (index === -1) {
      console.log(`Task "${text}" not found!`);
    } else {
      // splice() modifies the array in-place, avoiding the creation of a new array (unlike filter()).
      this.arr.splice(index, 1); // Remove the task directly
      console.log(`Task "${text}" has been removed.`);
    }
    return this; // Allow method chaining
  }
  markComplete(task) {
    const taskToMark = this.arr.find((t) => t.name === task);

    if (!taskToMark) {
      console.log(`Task "${task}" not found!`);
      return this; //  Chaining still works even if the task is missing.
    } else if (taskToMark.completed) {
      console.log(`Task "${task}" is already completed!`);
      return this;
    }
    taskToMark.completed = true;
    console.log(`Task "${task}" marked as complete!`);
    return this; // Return `this` for chaining.
  }
  printList() {
    console.log('\n******** TODO LIST ********');
    this.arr.forEach((t) => {
      console.log(
        `Task: ${t.name} - ${t.completed ? 'Completed' : 'Not Completed'}`
      );
    });
    console.log('***************************');
  }
}

let daily = new TodoList();

daily
  .addTodo({ name: 'python', status: false })
  .addTodo({ name: 'Java', status: true })
  .removeTodo('Java')
  .addTodo({ name: 'C#', status: false })
  .markComplete('python')
  .markComplete('python') // Task already completed
  .removeTodo('React')
  .markComplete('Djnago') // Task not found
  .printList();
