import { decode } from "html-entities";
import Option from "./Option";

export default function Question(props) {
    let optionElements = props.question.options.map(
        option => <Option
            key={props.id+option}
            questionId={props.question.id}
            option={option}
            handleChange={props.handleChange}
            isChecked={props.isChecked}
            correct_answer={props.question.correct_answer}
            selectedOption={props.selectedOptions.find(s => s.questionsId === props.question.id).selectedOption }
        />);

return (
        <div>
            <h2>{decode(props.question.question)}</h2>
            <div className="options">
                {optionElements}
            </div>
            <hr />
        </div>
    )
}
    /*    const options = [props.question.correct_answer, ...props.question.incorrect_answers];
console.log();
const style = {

}

const someOps = options.map(option => {
return (
<div key={Math.random()}>
<label className="option" htmlFor={option}>{decode(option)}</label>
<input onClick={(e) => {
    console.log(decode(e.target.value))
}} type="radio" name="option" value={option} id={option} />
</div>
)
});

console.log(someOps);
console.log("Question is: " + decode(props.question.question));

return (
<div className="question-container">
<h3>{decode(props.question.question)}</h3>
<div className="options">
{someOps}
</div>
{/*         
<input type="radio" name="option" value={options[0]} id="firstChoice" />
<input type="radio" name="option" value={options[1]} id="secondChoice" />
<input type="radio" name="option" value={options[2]} id="thirdChoice" />
<input type="radio" name="option" value={options[3]} id="fourthChoice" />
<label className="option" htmlFor="firstChoice" >{options[0]}</label>
<label className="option" htmlFor="secondChoice">{options[1]}</label>
<label className="option" htmlFor="thirdChoice" >{options[2]}</label>
<label className="option" htmlFor="fourthChoice">{options[3]}</label>
}
</div>
)
} */

/*                <Option option={props.questions[0].options[0]} handleChange={props.handleChange} answers={props.answers}  />
                <label className="option" htmlFor="2">{decode(question.incorrect_answers[0])}</label>
                <input type="radio" onChange={props.handleChange} name="option" value={decode(question.incorrect_answers[0])} id="2" />
                <label className="option" htmlFor="3">{decode(question.incorrect_answers[1])}</label>
                <input type="radio" onChange={props.handleChange} name="option" value={decode(question.incorrect_answers[1])} id="3" />
                <label className="option" htmlFor="4">{decode(question.incorrect_answers[2])}</label>
                <input type="radio" onChange={props.handleChange} name="option" value={decode(question.incorrect_answers[2])} id="4" />
 */