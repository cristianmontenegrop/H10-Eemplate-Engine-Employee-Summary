const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const writeFile = (filename, data) => {
  fs.writeFile(filename, data, (err) => {
    if (err) throw err;
    console.log('File saved!');
  });
};

inquirer
  .prompt([{
    type: 'input',
    name: 'name',
    message: 'Hello Mr. Manager, what is your name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Email?',
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: 'Office Number?',
  },
  ]).then((answers) => {
    const renderObject = [];
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    renderObject.push(manager);

    const userPrompt = () => {
      inquirer.prompt([{
        type: 'list',
        message: 'Which role would you like to add now?',
        name: 'role',
        choices: [
          'Intern',
          'Engineer',
          'I\'m done adding',
        ],
      }]).then((data) => {
        if (data.role === 'Intern') {
          inquirer.prompt([{
            type: 'input',
            message: `What is the ${data.role}'s name?`,
            name: 'name',
          },
          {
            type: 'input',
            name: 'id',
            message: 'ID?',
          },
          {
            type: 'input',
            name: 'email',
            message: 'Email?',
          },
          {
            type: 'input',
            name: 'school',
            message: 'What\'s the employee\'s school?',
          },
          ]).then((answersI) => {
            const intern = new Intern(answersI.name, answersI.id, answersI.email, answersI.school);
            renderObject.push(intern);
            userPrompt();
          });
        } else if (data.role === 'Engineer') {
          inquirer.prompt([{
            type: 'input',
            message: `What is the ${data.role}'s name?`,
            name: 'name',
          },
          {
            type: 'input',
            name: 'id',
            message: 'ID?',
          },
          {
            type: 'input',
            name: 'email',
            message: 'Email?',
          },
          {
            type: 'input',
            name: 'github',
            message: 'What\'s the engineer\'s Github account?',
          },
          ]).then((answersII) => {
            const engineer = new Engineer(
              answersII.name, answersII.id, answersII.email, answersII.github,
            );
            renderObject.push(engineer);
            userPrompt();
          });
        } else if (data.role === 'I\'m done adding') {
          writeFile(outputPath, render(renderObject));
        }
      });
    };
    userPrompt();
  });

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
