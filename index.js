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
            updateEmploy();
            break;
  
          case 'VIEW_ROLES':
            allRoles();
            break;
          case 'Add Role':
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
  const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.id, role.title, role.salary FROM employee INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.name = role.department_name) ORDER BY employee.id;';
  
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("VIEW_EMPLOYEES");
    console.table(res);  
    start();
  } )};

  const allEmployDep = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.id, role.title, role.salary FROM employee INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;';
    
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log("VIEW_EMPLOYEES");
      console.table(res);  
      start();
    } )};