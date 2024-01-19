const inquirer = require('inquirer');
const fs = require('fs');
const { EOL } = require('os');

// this function take path to txt and create obj
function txtToObj(path) {
  const profession = fs.readFileSync(path, 'utf-8');
  const professionArr = profession.split('--').map((el) => {
    const arr = el.trim().split(EOL);
    const obj = {
      question: arr[0],
      answers: [...arr.slice(1)]
    };
    obj.answers = obj.answers.map((el) => ansObj = { name: el, value: +el.replace(/[\D]/g, '') });
    return obj;
  });
  return professionArr;
}

const profession = txtToObj('./topics/profession.txt');
const restaurant = txtToObj('./topics/questions_about_the_restaurant.txt');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Введите имя (кириллицей):',
      validate(input) {
        const done = this.async();
        if (input.match(/[а-яёА-ЯЁ]/gi)) {
          done(true);
        } else {
          done('Введите имя корректно');
        }
      }
    },
    {
      type: 'list',
      name: 'theme',
      message: 'Темы на выбор',
      choices: ['Программирование', 'Кулинария'],
    },
    {
      type: 'list', name: profession[0].question, choices: profession[0].answers, when: (answers) => choices(answers, 0)
    },
    {
      type: 'list', name: profession[1].question, choices: profession[1].answers, when: (answers) => choices(answers, 0)
    },
    {
      type: 'list', name: profession[2].question, choices: profession[2].answers, when: (answers) => choices(answers, 0)
    },
    {
      type: 'list', name: profession[3].question, choices: profession[3].answers, when: (answers) => choices(answers, 0)
    },
    {
      type: 'list', name: profession[4].question, choices: profession[4].answers, when: (answers) => choices(answers, 0)
    },

    {
      type: 'list', name: restaurant[0].question, choices: restaurant[0].answers, when: (answers) => choices(answers, 1)
    },
    {
      type: 'list', name: restaurant[1].question, choices: restaurant[1].answers, when: (answers) => choices(answers, 1)
    },
    {
      type: 'list', name: restaurant[2].question, choices: restaurant[2].answers, when: (answers) => choices(answers, 1)
    },
    {
      type: 'list', name: restaurant[3].question, choices: restaurant[3].answers, when: (answers) => choices(answers, 1)
    },
    {
      type: 'list', name: restaurant[4].question, choices: restaurant[4].answers, when: (answers) => choices(answers, 1)
    },
  ])
  .then((answers) => {
    console.log(`Спасибо за игру, ${answers.username}`);
    const result = resultValuesSum(answers);
    console.log(`Ваш счет: ${result}`);
  });

function choices(answers, num) {
  if (num === 0) {
    if (answers.theme === 'Программирование') {
      return true;
    }
  }
  if (num === 1) {
    if (answers.theme === 'Кулинария') {
      return true;
    }
  }
}

function resultValuesSum(obj) {
  const arr = Object.values(obj)
    .filter((el) => typeof el === 'number')
    .reduce((acc, el) => acc + el, 0);
  return arr;
}

