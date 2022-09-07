// Variables
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions;
let currentQuestionIndex;

// Event Listeners
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('button');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.textContent = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            {text: '<script>', correct: true},
            {text: '<js>', correct: false},
            {text: '<javascript>', correct: false},
            {text: '<scripting>', correct: false},
        ]
    },
    {
        question: 'What is the correct JavaScript syntax to change the content of the HTML element below?',
        answers: [
            {text: 'document.getElementById("demo").innerHTML = "Hello World!";', correct: true},
            {text: 'document.getElementByName("p").innerHTML = "Hello World!";', correct: false},
            {text: '#demo.innerHTML = "Hello World!";', correct: false},
            {text: 'document.getElement("p").innerHTML = "Hello World!";', correct: false},
        ]
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: [
            {text: 'Both the <head> section and the <body> section are correct', correct: true},
            {text: 'The <body> section', correct: false},
            {text: 'The <head> section', correct: false},
            {text: 'After writing <html>', correct: false},
        ]
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers: [
            {text: '<script src="xxx.js">', correct: true},
            {text: '<script name="xxx.js">', correct: false},
            {text: '<script href="xxx.js">', correct: false},
            {text: '<script url="xxx.js>', correct: false},
        ]
    },
    {
        question: 'The external JavaScript file must contain the <script> tag.',
        answers: [
            {text: 'False', correct: true},
            {text: 'True', correct: false},
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            {text: 'alert("Hello World");', correct: true},
            {text: 'alertBox("Hello World");', correct: false},
            {text: 'msgBox("Hello World");', correct: false},
            {text: 'msg("Hello World");', correct: false},
        ]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [
            {text: 'function myFunction()', correct: true},
            {text: 'function = myFunction()', correct: false},
            {text: 'function:myFunction()', correct: false},
            {text: 'create myFunction()', correct: false},
        ]
    },
    {
        question: 'How do you call a function named "myFunction"?',
        answers: [
            {text: 'myFunction()', correct: true},
            {text: 'call myFunction()', correct: false},
            {text: 'call function myFunction()', correct: false},
            {text: 'hello myfunction()', correct: false},
        ]
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        answers: [
            {text: 'if (i == 5)', correct: true},
            {text: 'if i = 5', correct: false},
            {text: 'if i == 5 then', correct: false},
            {text: 'if i = 5 then', correct: false},
        ]
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        answers: [
            {text: 'if (i != 5)', correct: true},
            {text: 'if (i <> 5)', correct: false},
            {text: 'if i <> 5', correct: false},
            {text: 'if i =! 5 then', correct: false},
        ]
    },
]