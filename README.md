# Quizzical

## Intro

Quizzical is fun quiz web app used to create a random trivia quiz from the questions fetched from a public API. 

The demo for the app can be seen below: 

https://github.com/sandesh2526/Quizzical/assets/56215314/8dcb7e22-c85a-479b-91b7-81ffe1343dc4

When we click on the play again or start quizz on starting page the app fetches the API and then copies that data to the apps internal state

Each time the state of the application changes we re-render the components.

## Technicals

We use different types of react hooks in this application such as useEffect to fetch the data from the API and then store this data in the state of the application using a state variable.

Once player finishes selecting the answers and click on the 'Check Answers' the event handler checks the selected answers against the correct answers and then style them accordingly.

All the questions are fetched from the public API: https://opentdb.com/api.php

The fetched api contains the data in quiet a different format, so we have to change this data so that we can use it correctly.
