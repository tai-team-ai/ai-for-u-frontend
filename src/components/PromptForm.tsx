/*
Module defines a PromptForm, acting as the interface between the user and the backend. The form
renders the appropriate form based on the promptType prop passed in from the PromptPanel component.
The forms that are currently supported are:
- Note Summarizer
- Resignation Email
- Cold Email
- Cover Letter
- Negotiation Email
- Introduction
- Conclusion

The forms handle packaging the user's input into a JSON object and sending it to the backend using axios. The
backend then returns a JSON object containing the generated text. The respective form component
handles displaying the generated text to the user in an appropriate manner based on the form type.
*/

import { useState } from "react";

import { Button, Form } from "react-bootstrap";
import axios from "axios";
import NoteSummarizerForm from "./NoteSummarizerForm";


export default function PromptForm(props: { promptType: string }) {
    const [generatedText, setGeneratedText] = useState("");

    const [resignationEmail, setResignationEmail] = useState({
        name: "",
        company: "",
        position: "",
        reason: "",
    });

    const [coldEmail, setColdEmail] = useState({
        name: "",
        company: "",
        position: "",
        reason: "",
    });

    const [coverLetter, setCoverLetter] = useState({
        name: "",
        company: "",
        position: "",
        reason: "",
    });

    const [negotiationEmail, setNegotiationEmail] = useState({
        name: "",
        company: "",
        position: "",
        reason: "",
    });

    const [introduction, setIntroduction] = useState({
        name: "",
        company: "",
        position: "",
        reason: "",
    });

    const [conclusion, setConclusion] = useState({
        name: "",
        company: "",
        position: "",
        reason: "",
    });

    const handleResignationEmailChange = (event: any) => {
        setResignationEmail({ ...resignationEmail, [event.target.name]: event.target.value });
    };

    const handleColdEmailChange = (event: any) => {
        setColdEmail({ ...coldEmail, [event.target.name]: event.target.value });
    };

    const handleCoverLetterChange = (event: any) => {
        setCoverLetter({ ...coverLetter, [event.target.name]: event.target.value });
    };

    const handleNegotiationEmailChange = (event: any) => {
        setNegotiationEmail({ ...negotiationEmail, [event.target.name]: event.target.value });
    };

    const handleIntroductionChange = (event: any) => {
        setIntroduction({ ...introduction, [event.target.name]: event.target.value });
    };

    const handleConclusionChange = (event: any) => {
        setConclusion({ ...conclusion, [event.target.name]: event.target.value });
    };

    const handle = (event: any) => {
        event.preventDefault();
        switch (props.promptType) {
            case "resignation_email":
                axios
                    .post("http://localhost:5000/prompt/resignation_email", {
                        name: resignationEmail.name,
                        company: resignationEmail.company,
                        position: resignationEmail.position,
                        reason: resignationEmail.reason,
                    })
                    .then((response) => {
                        setGeneratedText(response.data.text);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            case "cold_email":
                axios
                    .post("http://localhost:5000/prompt/cold_email", {
                        name: coldEmail.name,
                        company: coldEmail.company,
                        position: coldEmail.position,
                        reason: coldEmail.reason,
                    })
                    .then((response) => {
                        setGeneratedText(response.data.text);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            case "cover_letter":
                axios
                    .post("http://localhost:5000/prompt/cover_letter", {
                        name: coverLetter.name,
                        company: coverLetter.company,
                        position: coverLetter.position,
                        reason: coverLetter.reason,
                    })
                    .then((response) => {
                        setGeneratedText(response.data.text);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            case "negotiation_email":
                axios
                    .post("http://localhost:5000/prompt/negotiation_email", {
                        name: negotiationEmail.name,
                        company: negotiationEmail.company,
                        position: negotiationEmail.position,
                        reason: negotiationEmail.reason,
                    })
                    .then((response) => {
                        setGeneratedText(response.data.text);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            case "introduction":
                axios
                    .post("http://localhost:5000/prompt/introduction", {
                        name: introduction.name,
                        company: introduction.company,
                        position: introduction.position,
                        reason: introduction.reason,
                    })
                    .then((response) => {
                        setGeneratedText(response.data.text);
                    })
                    .catch((error) => {
                        console.log(error);
                    }
                );
                break;
            case "conclusion":
                axios
                    .post("http://localhost:5000/prompt/conclusion", {
                        name: conclusion.name,
                        company: conclusion.company,
                        position: conclusion.position,
                        reason: conclusion.reason,
                    })
                    .then((response) => {
                        setGeneratedText(response.data.text);
                    }
                );
                break;
            default:
                break;
        }
    };

    const formComponents: { [key: string]: JSX.Element } = {
        note_summarizer: <NoteSummarizerForm setGeneratedText={setGeneratedText}/>
    };
    // resignation_email: resignationEmailForm,
    // cold_email: coldEmailForm,
    // cover_letter: coverLetterForm,
    // negotiation_email: negotiationEmailForm,
    // introduction: introductionForm,
    // conclusion: conclusionForm,

    return (
        <div>
            {formComponents[props.promptType]}
            <div style={{whiteSpace: "pre-line"}}>{generatedText}</div>
        </div>
    );
}
