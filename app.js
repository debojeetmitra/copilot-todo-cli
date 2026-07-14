#!/usr/bin/env node
const readline = require('readline');

// Show the available menu options to the user.
function showMenu() {
  console.log('\n=== Todo CLI ===');
  console.log('1. Add task');
  console.log('2. View tasks');
  console.log('3. Delete task');
  console.log('4. Exit');
}

// Ask the user a question and return the answer.
function askQuestion(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Add a new task to the task list.
async function addTask(tasks, rl) {
  const taskText = await askQuestion(rl, 'Enter a task: ');
  const trimmedTask = taskText.trim();

  if (!trimmedTask) {
    console.log('Task cannot be empty.');
    return;
  }

  tasks.push(trimmedTask);
  console.log(`Added: ${trimmedTask}`);
}

// Print all tasks currently saved in the list.
function viewTasks(tasks) {
  if (tasks.length === 0) {
    console.log('No tasks yet.');
    return;
  }

  console.log('\nYour tasks:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
}

// Remove a task from the list using its number.
async function deleteTask(tasks, rl) {
  if (tasks.length === 0) {
    console.log('No tasks to delete.');
    return;
  }

  viewTasks(tasks);
  const choice = await askQuestion(rl, 'Enter the task number to delete: ');
  const index = Number.parseInt(choice, 10) - 1;

  if (Number.isInteger(index) && index >= 0 && index < tasks.length) {
    const removedTask = tasks.splice(index, 1)[0];
    console.log(`Deleted: ${removedTask}`);
  } else {
    console.log('Invalid task number.');
  }
}

// Run the main loop of the program until the user exits.
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const tasks = [];
  let running = true;

  while (running) {
    showMenu();
    const choice = await askQuestion(rl, 'Choose an option: ');

    switch (choice.trim()) {
      case '1':
        await addTask(tasks, rl);
        break;
      case '2':
        viewTasks(tasks);
        break;
      case '3':
        await deleteTask(tasks, rl);
        break;
      case '4':
        console.log('Goodbye!');
        running = false;
        break;
      default:
        console.log('Please choose a valid option.');
    }
  }

  rl.close();
}

main().catch((error) => {
  console.error('Something went wrong:', error);
  process.exit(1);
});
