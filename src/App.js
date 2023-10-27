import react, { useEffect } from 'react';
import './App.css';
import Question from './Question';
import { nanoid } from 'nanoid';
import Waiting from './Waiting';

// https://www.figma.com/file/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0%3A1

function App() {
  const [isStarted, setIsStarted] = react.useState(false);
  const [selectedOptions, setSelectedOptions] = react.useState([]);
  const [questions, setQuestion] = react.useState([]);
  const [isChecked, setIsChecked] = react.useState(false);
  const [isRestarted, setIsRestarted] = react.useState(false);
  const [score, setScore] = react.useState(0);
  const [isLoaded, setIsLoaded] = react.useState(false);
  let questionElements = [];

  // Fetch the API and set the information to the state variable aka questions
  useEffect(
    () => {
      fetch("https://opentdb.com/api.php?amount=5")
        .then(jsonData => jsonData.json())
        .then(data => {
          if (data.results) {
            setIsLoaded(true)
          }
          return data.results
        })
        .then(rawQuestions => {
          if (rawQuestions.length > 0) {
            let questionMappedAtStart = rawQuestions.map(rawQuestion => {
              return {
                question: rawQuestion.question,
                options: randomizeArray([rawQuestion.correct_answer, ...rawQuestion.incorrect_answers]),
                correct_answer: rawQuestion.correct_answer,
                id: nanoid()
              }
            })
            setQuestion(questionMappedAtStart);
          }
        })
        .catch(someFun => {
          return "This is bad!";
        })
    }, [isRestarted, setIsLoaded, setQuestion]);

  // Each time the data is loaded in the state update the selected option
  useEffect(() => {
    if (isLoaded) {
      setSelectedOptions(questions.map(question => {
        return {
          questionsId: question.id,
          selectedOption: ""
        }
      }));
    }
  }, [questions, setSelectedOptions, isLoaded])

  // Check whether selected options are correct or not. Called after submiting the answers
  function checkAnswers(e) {
    e.preventDefault();
    let arrayOfCorrectness = selectedOptions.map(so => so.selectedOption === (questions.find(q => q.id === so.questionsId)).correct_answer)
    for (let id = 0; id < arrayOfCorrectness.length; id++) {
      if (arrayOfCorrectness[id]) {
        setScore(prevscore => prevscore + 1)
      };
    }
    setIsChecked(true)
  }

  /*
    Takes the event and question id as parameter.
    It is called each time the option is selected and then sets the selected option to the modified value.
  */
  function handleChange(e, id) {
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

  function randomizeArray(array) {
    return [...array].sort();
  }

  // Reset the state of the game by resetting the states
  function restartTheGame() {
    setIsRestarted(prevState => !prevState);
    setQuestion([]);
    setIsLoaded(false);
    setScore(0);
    setIsChecked(false);
  }

  // Set the question elements to render them
  if (isLoaded) {
    questionElements = questions.map(question => {
      return <Question
        isLoaded={isLoaded}
        key={question.id}
        question={question}
        isChecked={isChecked}
        handleChange={handleChange}
        selectedOptions={selectedOptions}
      />
    })
  }

  return (
    <div className='app'>
      {
        isStarted
          ?
          isLoaded ?
            questions
            &&
            <>
              <nav>
                <h2 className='stylish-heading'>Quizzical</h2>
              </nav>
              <div className='question-container'>
                {questionElements}
                {!isChecked && <button onClick={checkAnswers} className='start-button check-answers'>Check Answers</button>}
                {
                  isChecked
                  &&
                  <span className='advise'>
                    <span className='score-text'>
                      Your scored {score}/5 correct answers
                    </span>
                    <button onClick={restartTheGame} className='start-button check-answers play-again'>Play again</button>
                  </span>
                }
              </div>
            </>
            :// If the questions are loading from API call show waitint animation untill it loads 
            <div>
              <Waiting />
            </div>
          : // If the quiz is not started show start button
          <div className='not-started'>
            <h1 className='quiz-title stylish-heading'>Quizzical</h1>
            <p className='quiz-description'>The random trivia quiz!</p>
            <button onClick={() => setIsStarted(true)} className='start-button'>Start Quiz</button>
          </div>
      }
    </div>
  );
}

export default App;