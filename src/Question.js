import { decode } from "html-entities";
import Option from "./Option";

export default function Question(props) {
    let selected = ""

    if (props.selectedOptions.find(s => s.questionsId === props.question.id) && props.selectedOptions.find(s => s.questionsId === props.question.id).selectedOption !== "") {
        selected = props.selectedOptions.find(s => s.questionsId === props.question.id);
    }

    let optionElements = props.question.options.map(
        option => <Option
            key={props.id + option}
            questionId={props.question.id}
            option={option}
            handleChange={props.handleChange}
            isChecked={props.isChecked}
            correct_answer={props.question.correct_answer}
            selectedOption={selected}
        />);

    return (
        <div>
            <h2 className="question">{decode(props.question.question)}</h2>
            <div className="options">
                {optionElements}
            </div>
            <hr />
        </div>
    )
}