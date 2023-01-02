

/*
export a landing page with React-Bootstrap component library that has a title and a form with the following fields:
-prompt type (dropdown)
-prompt (text)

*/

import { Button, Form } from "react-bootstrap";

export default function LandingPage() {
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
                <Form.Control as="textarea" placeholder="Add data..." rows={5}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
