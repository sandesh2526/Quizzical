import { decode } from "html-entities";
import { nanoid } from "nanoid";
import React from "react";
export default function Option(props) {
    const [optionId, setOptionId] = React.useState(nanoid());
    let styleForSelected = {
        backgroundColor: "#ccddff"
    }
    let isSelected = decode(props.selectedOption) === decode(props.option)

    if (props.isChecked) {
        if (isSelected) {
            if (decode(props.correct_answer) === decode(props.option)) {
                styleForSelected = {
                    backgroundColor: "#59E391",
                    color: 'black',
                    opacity: 0.8
                }
            }
            else {
                styleForSelected = {
                    backgroundColor: "#e35959",
                    color: 'black',
                    opacity: 0.5
                }
            }
        }
        else if(decode(props.correct_answer) === decode(props.option)) {
            styleForSelected = {
                backgroundColor: "#59E391",
                color: 'black',
                opacity: 0.8
            }
        }
        else {
            styleForSelected = {
                opacity: 0.5
            }
        }
    }
    function areEqual(s1,s2) {
        return (s1+"").replace(/['"]+/g, '') === (s2+'').replace(/['"]+/g, '');
    }

    return (
        <div>
            <label
                className="option"
                style={(isSelected || props.isChecked) ? styleForSelected : {}}
                htmlFor={optionId} >
                {decode(props.option)} 
            </label>
            <input
                type="radio" 
                onChange={(e) => props.handleChange(e, props.questionId)}
                disabled={props.isChecked ? 'disabled' : ''}
                checked={areEqual(decode(props.option),decode(props.answers))}
                id={optionId}
                name="option"
                value={decode(props.option)}
            />
        </div>
    )
}