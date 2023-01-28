import axios from "axios";
import { useState } from "react";
import { constants } from "../constants";
import { Button, Form } from "react-bootstrap";


export default function NoteSummarizerForm(props: { setGeneratedText: React.Dispatch<React.SetStateAction<string>>}) {
    const [noteSummarizer, setNoteSummarizer] = useState({
        notesToSummarize: "",
        numberOfBullets: "",
        numberOfActionItems: ""
    });

    const handleNoteSummarizerChange = (event: any) => {
        setNoteSummarizer({ ...noteSummarizer, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios.post(`${constants.API_URL}${constants.OPEN_AI_NOTES_API_PREFIX}`, {
            notesToSummarize: noteSummarizer.notesToSummarize,
            numberOfBullets: noteSummarizer.numberOfBullets,
            numberOfActionItems: noteSummarizer.numberOfActionItems
        })
        .then((response) => {
            console.log(response)
            const summary_sentence: string = response.data["summarySentence"];
            const bullet_points: string = response.data["bulletPoints"];
            const action_items: string = response.data["actionItems"];
            const summary: string = `Summary:\n${summary_sentence} \n\nBullet Points:\n${bullet_points} \n\nAction Items:\n${action_items}`
            props.setGeneratedText(summary);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="notesToSummarize">
                <Form.Label>Notes to Summarize</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name="notesToSummarize"
                    value={noteSummarizer.notesToSummarize}
                    onChange={handleNoteSummarizerChange}
                />
            </Form.Group>
            <Form.Group controlId="numberOfBullets">
                <Form.Label>Number of Bullets</Form.Label>
                <Form.Control
                    type="number"
                    name="numberOfBullets"
                    value={noteSummarizer.numberOfBullets}
                    onChange={handleNoteSummarizerChange}
                />
            </Form.Group>
            <Form.Group controlId="numberOfActionItems">
                <Form.Label>Number of Action Items</Form.Label>
                <Form.Control
                    type="number"
                    name="numberOfActionItems"
                    value={noteSummarizer.numberOfActionItems}
                    onChange={handleNoteSummarizerChange}
                />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}