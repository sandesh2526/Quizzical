import react, { useEffect } from 'react';
import './App.css';
import Question from './Question';
import { nanoid } from 'nanoid';

// https://www.figma.com/file/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0%3A1

function App() {
  const [isStarted, setIsStarted] = react.useState(false);
  const [questions, setQuestions] = react.useState([])
  const [selectedOptions, setSelectedOptions] = react.useState([]);
  const [questionsMapped, setQuestionsMapped] = react.useState([])
  const [isChecked, setIsChecked] = react.useState(false);
  const [isRestarted, setIsRestarted] = react.useState(false);
  const [score, setScore] = react.useState(0);

  function randomizeArray(array) {
    return [...array].sort();
  }

  useEffect(
    () => {
      fetch("https://opentdb.com/api.php?amount=5")
        .then(jsonData => jsonData.json())
        .then(data => setQuestions(data.results))
    }, [isRestarted]);

  useEffect(() => {
    if (questions.length > 0) {
      let questionMappedAtStart = questions.map(question => {
        return {
          question: question.question,
          options: randomizeArray([question.correct_answer, ...question.incorrect_answers]),
          correct_answer: question.correct_answer,
          id: nanoid()
        }
      })
      setQuestionsMapped(questionMappedAtStart);
    }
  }, [questions])

  useEffect(() => {
    setSelectedOptions(questionsMapped.map(question => {
      return {
        questionsId: question.id,
        selectedOption: ""
      }
    }));
  }, [questionsMapped])

  function checkAnswers(e) {
    e.preventDefault();
    let arrayOfCorrectness = selectedOptions.map(so => so.selectedOption === (questionsMapped.find(q => q.id === so.questionsId)).correct_answer)
    for (let id = 0; id < arrayOfCorrectness.length; id++) {
      if(arrayOfCorrectness[id]) {
        setScore(prevscore => prevscore+1)
        console.log("SEtting Score"+score);
      };
    }
    setIsChecked(true)
   /*  arrayOfCorrectness.map(answer => {
      if (answer) {
        score++;
        return answer
      }
    }
    ) */
  }

  function handleChange(e, id) {
    console.log(e.target.value, "ID of question: ", id);
    setSelectedOptions(prevSelectedOptions => prevSelectedOptions.map(option => {
      if (option.questionsId === id) {
        return {
          ...option,
          selectedOption: e.target.value
        }
      } else {
        return option;
      }
    }))
  }

  function restartTheGame() {
    setIsRestarted(prevState => !prevState);
    setIsChecked(false);
  }

  const questionElements = questionsMapped.map(question => {
    return <Question key={question.id} question={question} isChecked={isChecked} handleChange={handleChange} selectedOptions={selectedOptions} />
  })

  return (
    <div className='app'>
      {
        isStarted
          ?
          <div className='question-container'>
            {questionElements}
            {!isChecked && <button onClick={checkAnswers} className='start-button check-answers'>Check Answers</button>}
            {isChecked && <span className='advise'><span className='score-text'>Your scored {score}/5 correct answers</span><button onClick={restartTheGame} className='start-button check-answers play-again'>Play again</button></span>}
          </div>
          :
          <div className='not-started'>
            <h1 className='quiz-title'>Quizzical</h1>
            <p className='quiz-description'>The random trivia quiz!</p>
            <button onClick={() => setIsStarted(true)} className='start-button'>Start Quiz</button>
          </div>
      }
    </div>
  );
}

export default App;
