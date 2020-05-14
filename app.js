const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

inquirer
    .prompt([{
            type: "input",
            name: "name",
            message: "Hello Mr. Manager, what is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "ID?"
        },
        {
            type: "input",
            name: "email",
            message: "Email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Office Number?"
        }
    ]).then(function (data) {
        const {
            name,
            id,
            email,
            officeNumber
        } = data;
        const role = "Manager"
        const manager = {
            name,
            role,
            email,
            id,
            officeNumber
        };

        var renderObject = [manager];
        console.log(renderObject);
        userPrompt = () => {
            inquirer.prompt([{
                type: "list",
                message: "Which role would you like to add now?",
                name: "role",
                choices: [
                    "Intern",
                    "Engineer",
                    "I'm done adding"
                ]
            }]).then(function (data) {

                if (data.role === "Intern") {
                    inquirer.prompt([{
                            type: "input",
                            message: `What is the ${data.role}'s name?`,
                            name: "name"
                        },
                        {
                            type: "input",
                            name: "id",
                            message: "ID?"
                        },
                        {
                            type: "input",
                            name: "email",
                            message: "Email?"
                        },
                        {
                            type: "input",
                            name: "school",
                            message: "What's the employee's school?"
                        }
                    ]).then(function (intern) {
                        const {
                            name,
                            id,
                            email,
                            school
                        } = intern;
                        const role = data.role;
                        intern = {
                            name,
                            role,
                            email,
                            id,
                            school
                        };
                        renderObject.push(intern);
                        userPrompt();
                    });
                } else if (data.role === "Engineer") {
                    inquirer.prompt([{
                            type: "input",
                            message: `What is the ${data.role}'s name?`,
                            name: "name"
                        },
                        {
                            type: "input",
                            name: "id",
                            message: "ID?"
                        },
                        {
                            type: "input",
                            name: "email",
                            message: "Email?"
                        },
                        {
                            type: "input",
                            name: "github",
                            message: "What's the engineer's Github account?"
                        }
                    ]).then(function (engineer) {
                        const {
                            name,
                            id,
                            email,
                            github
                        } = engineer;
                        const role = data.role;
                        engineer = {
                            name,
                            role,
                            email,
                            id,
                            github
                        };
                        renderObject.push(engineer);
                        userPrompt();
                    });

                } else if (data.role === "I'm done adding") {
                    console.log(renderObject);
                    render(renderObject).then(
                        fs.appendFile(outputPath, render.template, function (err) {
                            if (err) throw err;
                            console.log("File saved!");
                        })
                    );

                }
            })
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