

/*
export a landing page with React-Bootstrap component library that has a title and a form with the following fields:
-prompt type (dropdown)
-prompt (text)

*/

import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { makeRequest } from "../requests/requests";
import React from "react";
import axios from "axios";


export default function LandingPage() {
    const [response, setResponse] = useState("");
    const [formData, setFormData] = useState("");


    const submitData = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log(`Submitted prompt: ${formData}`);
        axios.post("https://fayka0tfb4.execute-api.us-west-2.amazonaws.com/prod/openai/completion", {
            text_to_complete: formData
        })
            .then(function (response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                setResponse(response.data["text_to_complete"]);
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Information that you would like to be used as reference material.</Form.Label>
                <Form.Control as="textarea" placeholder="Add data..." rows={5} onChange={e => setFormData(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitData}>
                Submit
            </Button>
            <div style={{whiteSpace: "pre-line"}}>{response}</div>
        </Form>
    );
}


