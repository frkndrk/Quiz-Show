const API_URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"

const question = document.getElementById("questions")
const answerA = document.getElementById("1")
const answerB = document.getElementById("2")
const answerC = document.getElementById("3")
const answerD = document.getElementById("4")
const answerBtn = document.querySelectorAll(".answer_btn")
const questionRange = document.getElementById("question")
const score = document.getElementById("score")
const container = document.querySelector(".container")

getQuestions()
async function getQuestions() {
    const { data } = await axios(API_URL)
    createQuestion(data)
}
let que;
let answer;
function createQuestion(soru) {
    que = soru.results
    console.log(que)
    const createRandomAnswer = Math.floor((Math.random() * 4) + 1);
    const num = [1, 2, 3, 4]
    for(let i = 0; i < que.length; i++) {
        answer = que[i].correct_answer
        document.getElementById(createRandomAnswer).innerHTML = answer
        const inccorrectAnswers = que[i].incorrect_answers 
        console.log(inccorrectAnswers)
        const index = num.indexOf(createRandomAnswer)
        if(index > -1) {
            num.splice(index, 1)
        }
        console.log(num)

        document.getElementById(num[0]).innerHTML = inccorrectAnswers[0]
        document.getElementById(num[1]).innerHTML = inccorrectAnswers[1]
        document.getElementById(num[2]).innerHTML = inccorrectAnswers[2]
        
        question.innerHTML = que[i].question
        que.shift()

        document.querySelectorAll(".answer_btn").forEach((btn) => btn.addEventListener("click", () => {
            console.log(btn.innerHTML)
            if(btn.innerHTML == answer) {
                console.log("Right answer")
                btn.classList.toggle("active")
                questionRange.value++
                score.innerHTML++
                createQuestion(soru)
                btn.classList.remove("active")
            } else {
                console.log("Wrong answer")
                btn.classList.toggle("active-wrong")
                questionRange.value++
                createQuestion(soru)
                btn.classList.remove("active-wrong")
            }
        }))

        return
    } 
    
}

