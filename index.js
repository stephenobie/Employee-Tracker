const mysql = require("mysql");
const inquirer = require('inquirer');
const conTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db',
  });

  connection.connect((err) => {
    if (err) throw err;
    start();  
  });

  const start = () => {
      inquirer.prompt({
          name: "initial",
          type: "list",
          message: "What would you like to do?",
          choices: [
            {
              name: "View All Employees",
              value: "VIEW_EMPLOYEES"
            },
            {
              name: "View All Employees By Department",
              value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
            },
            {
              name: "Add Employee",
              value: "ADD_EMPLOYEE"
            },
            {
              name: "Update Employee Role",
              value: "UPDATE_EMPLOYEE_ROLE"
            },
            {
              name: "View All Roles",
              value: "VIEW_ROLES"
            },
            {
              name: "Add Role",
              value: "ADD_ROLE"
            },
            {
              name: "View All Departments",
              value: "VIEW_DEPARTMENTS"
            },
            {
              name: "Add Department",
              value: "ADD_DEPARTMENT"
            },
            {
              name: "Quit",
              value: "QUIT"
            },
        ],
      })
        
      .then((answer) => {
        switch (answer.initial) {
          case 'VIEW_EMPLOYEES':
            allEmploy();
            break;
  
          case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
            allEmployDep();
            break;
  
          case 'ADD_EMPLOYEE':
            addEmploy();
            break;
  
          case 'UPDATE_EMPLOYEE_ROLE':
            updateRole();
            break;
  
          case 'VIEW_ROLES':
            allRoles();
            break;
          case 'ADD_EMPLOYEE_ROLE':
            addRole();
            break;

          case 'VIEW_DEPARTMENTS':
            allDep();
            break;

          case 'ADD_DEPARTMENT':
              addDep();
              break;
  
          default:
            console.log(`Invalid action: ${answer.initial}`);
            break;
        }
      });
  };
        
const allEmploy = () => {
  const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.id, role.title, role.salary FROM employee INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;';
  
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("VIEW_EMPLOYEES");
    console.table(res);  
    start();
  } )};

  const allEmployDep = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.id AS role_id, role.title, department.name AS department, department.id AS department_id FROM employee INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY department.id;';
    
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log("VIEW_EMPLOYEES_BY_DEPARTMENT");
      console.table(res);  
      start();
    } )};

    const allRoles = () => {
      const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.id AS role_id, role.title, department.name AS department, department.id AS department_id FROM employee INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY role.id;';
      
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("VIEW_ROLES");
        console.table(res);  
        start();
      } )};
      
      const addEmploy = () => {
        inquirer.prompt([
          {
            name: 'firstName',
            type: 'input',
            message: 'What is their first name?',
          },
          {
            name: 'lastName',
            type: 'input',
            message: 'What is their last name?',
          },
          {
            name: 'role',
            type: 'list',
            message: 'What number is their role ID?',
            choices: ['1','2','3','4'],
            },
            {
              name: 'managerId',
              type: 'list',
              message: 'What number is their manager ID?',
              choices: ['1','2','3','4','5','6','7'],
              },
        ])
        .then(function (answer) {
          connection.query('INSERT INTO employee SET ?',
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: answer.role || 0,
              manager_id: answer.managerId,
            },
            (err) => {
              if (err) throw err;
              console.log('The new employee was added successfully!');
              start();
            }
          );
        });
    };

        const allDep = () => {
          const query = 'SELECT department.name AS department, department.id AS department_id FROM department ORDER BY department.id;'
          
          connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("VIEW_DEPARTMENTS");
            console.table(res);  
            start();
          } )};

          const addDep = () => {
            inquirer.prompt([
              {
                name: "department",
                type: "input",
                message: "What is the name of the new department?",
            },
          ])
              .then(function (answer) {
                connection.query('INSERT INTO department SET ?',
                {
                  name: answer.department,
                },
                (err) => {
                  if (err) throw err;
                  console.log('The new department was added successfully!');
                  start();
                }
                )
              });
          };
      

