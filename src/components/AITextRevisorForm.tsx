/*
This module defines the AITextRevisorForm component. This component is a form that allows the user to 
submit text to the backend for revision. The form contains a text area for the user to input text, a selector 
for selecting the number of revisions to generate, a multi-select drop down for selecting the revision types,
a select for the tone of the revisions, and a submit button. The form is submitted to the backend via an axios
post request to the endpoint listed in constants.ts. The form is passed a handler for setting the response of the 
endpoint using handler setGeneratedText. The select forms should use the react-select repo
*/

import axios from "axios";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { constants } from "../constants";


type ToneOptionsType = {
    value: string;
    label: string;
};

const revisionTypesOptions: ToneOptionsType[] = [
    { value: "grammar", label: "Grammar" },
    { value: "spelling", label: "Spelling" },
    { value: "vocabulary", label: "Vocabulary" },
    { value: "sentence structure", label: "Sentence Structure" },
    { value: "word choice", label: "Word Choice" },
    { value: "tone", label: "Tone" },
    { value: "terminology", label: "Terminology" },
    { value: "consistency", label: "Consistency" },
    { value: "punctuation", label: "Punctuation" },
    { value: "style", label: "Style" }
];

const toneOptions: ToneOptionsType[] = [
    { value: "neutral", label: "Neutral" },
    { value: "positive", label: "Positive" },
    { value: "negative", label: "Negative" },
];

type numberOfRevisionOptionsType = {
    value: number;
    label: string;
};

const numberOfRevisionOptions: numberOfRevisionOptionsType[] = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" }
];



export default function AITextRevisorForm(props: { setGeneratedText: React.Dispatch<React.SetStateAction<string>>}) {
    const [text, setText] = useState("");
    const [numRevisions, setNumRevisions] = useState(1);
    const [revisionTypes, setRevisionTypes] = useState({});
    const [tone, setTone] = useState("neutral");
    const [menuIsOpen, setMenuIsOpen] = useState(false);


    const handleNumRevisionChange = (option: numberOfRevisionOptionsType | null) => {
        if (option) {
            setNumRevisions(option.value);
        }
    };

    const handledRevisionTypesChange = (selectedOptions: readonly ToneOptionsType[]) => {
        let revisionTypes: string[] = [];
        for (const option of selectedOptions) {
            revisionTypes.push(option.value);
        }
        setRevisionTypes(revisionTypes);
    };

    const handleToneChange = (option: ToneOptionsType | null) => {
        if (option) {
            setTone(option.value);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios.post(`${constants.API_URL}${constants.OPEN_TEXT_REVISOR_API_PREFIX}`, {
            textToRevise: text,
            revisionTypes: revisionTypes,
            numRevisions: numRevisions,
            tone: tone
        })
        .then((response) => {
            console.log(response)
            let revisions = ""
            for (const [i, revision] of response.data['revisedTextList'].entries()) {
                revisions += `Revision ${i + 1}:\n${revision}\n\n`;
            }
            props.setGeneratedText(revisions);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextText">
                <Form.Label column sm="2">
                    Text
                </Form.Label>
                <Col sm="10">
                    <Form.Control as="textarea" rows={5} onChange={(e) => setText(e.target.value)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextNumRevisions">
                <Form.Label column sm="2">
                    Num Revisions
                </Form.Label>
                <Col sm="10">
                    <Select
                        name="numRevisions"
                        options={numberOfRevisionOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(option) => handleNumRevisionChange(option)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextRevisionTypes">
                <Form.Label column sm="2">
                    Revise For
                </Form.Label>
                <Col sm="10">
                    <Select
                        isMulti
                        menuIsOpen={menuIsOpen}
                        onFocus={(e) => setMenuIsOpen(true)}
                        onBlur={(e) => setMenuIsOpen(false)}
                        name="revisionTypes"
                        options={revisionTypesOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(option) => handledRevisionTypesChange(option)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextTone">
                <Form.Label column sm="2">
                    Tone
                </Form.Label>
                <Col sm="10">
                    <Select
                        name="tone"
                        options={toneOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={option => handleToneChange(option)}
                    />
                </Col>
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}
