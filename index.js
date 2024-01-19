const inquirer = require('inquirer');
const fs = require('fs');
const EOL = require('os')

const profession = fs.readFileSync('./topics/profession.txt', 'utf-8');
const professionArr = profession.split('--').map((el)=>{
    const arr = el.trim().split('\n')
    const obj = {
        question: arr[0],
        answers: [...arr.slice(1)]
    }
    obj.answers = obj.answers.map((el)=>ansObj = {name: el})
    return obj
})

inquirer
  .prompt([
    { type: 'input', name: 'username', message: 'Введи имя:' },
    { type: 'list', name: 'theme', message: 'Темы на выбор', choices: [
        { name: 'Программирование', value: 0 }, 
        { name: 'Про выходные', value: 2 }, 
    ], },
    {type: 'list', name: professionArr[0].question, choices: professionArr[0].answers},
    {type: 'list', name: professionArr[1].question, choices: professionArr[1].answers},
    {type: 'list', name: professionArr[2].question, choices: professionArr[2].answers},
    {type: 'list', name: professionArr[3].question, choices: professionArr[3].answers},
    {type: 'list', name: professionArr[4].question, choices: professionArr[4].answers},
])
  .then((answers) => console.log(`Спасибо за игру, ${answers.username}`));