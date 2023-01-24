

/*
export a landing page with React-Bootstrap component library that has a title and a form with the following fields:
-prompt type (dropdown)
-prompt (text)

*/

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import React from "react";
import axios from "axios";


export default function RequestForm() {
    const [response, setResponse] = useState("");
    const [formData, setFormData] = useState(
        {
            notesToSummarize: "",
            numberOfBullets: "",
            numberOfActionItems: ""
        }
    );


    const submitData = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log(`Submitted prompt: ${formData}`);
        axios.post("https://fayka0tfb4.execute-api.us-west-2.amazonaws.com/prod/openai/note_summarizer", {
            "notes_to_summarize": formData.notesToSummarize,
            "number_of_bullets": formData.numberOfBullets,
            "number_of_action_items": formData.numberOfActionItems
        })
            .then(function (response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                const summary_sentence: string = response.data["summary_sentence"];
                const bullet_points: string = response.data["bullet_points"];
                const action_items: string = response.data["action_items"];
                const summary: string = `Summary:\n${summary_sentence} \n\nBullet Points:\n${bullet_points} \n\nAction Items:\n${action_items}`
                setResponse(summary);
            })
    };

    return (
        <Form>
            <Form.Label>AI writer type.</Form.Label>    
            <Form.Select aria-label="Default select example">
                <option>None</option>
                <option value="note_summarizer">Note Summarizer</option>
                <option value="resignation_email">Resignation Email</option>
                <option value="cold_email">Cold Email</option>
                <option value="cover_letter">Cover Letter</option>
                <option value="negotiation_email">Negotiation Email</option>
                <option value="introduction">Introduction Writer</option>
                <option value="conclusion">Conclusion Writer</option>
            </Form.Select>
            <p></p>
            <Form.Group className="mb-3">
                <Form.Label>Notes to Summarize:</Form.Label>
                <Form.Control as="textarea" placeholder="Add data..." rows={5} onChange={e => setFormData({...formData, notesToSummarize: e.target.value})}/>
            </Form.Group>
            <Form.Select aria-label="Number of Bullet Points in Summary" onChange={e => setFormData({...formData, numberOfBullets: e.target.value})}>
                <option defaultValue="4">Select number of bullets...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </Form.Select>
            <p></p>
            <Form.Select aria-label="Number of Action Items in Summary" onChange={e => setFormData({...formData, numberOfActionItems: e.target.value})}>
                <option defaultValue="2">Select number of action items...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </Form.Select>
            <p></p>
            <Button variant="primary" type="submit" onClick={submitData}>
                Submit
            </Button>
            <div style={{whiteSpace: "pre-line"}}>{response}</div>
        </Form>
    );
}


