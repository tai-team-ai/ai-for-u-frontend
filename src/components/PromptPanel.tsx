/*
Module acts as a skeleton selector for the appropriate PromptForm. This skeleton is the entry point
in which PromptForm components are rendered and acts as the interface for the user to create
prompts that are sent to the backend (submission and response display is handled in the respective 
form component). The skeleton uses react-bootstrap components and contains
a dropdown select drop down containing supported PromptForm types. The form component is imported 
and dynamically generated based on the value in the select drop down.
*/

import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import NoteSummarizerForm from "./NoteSummarizerForm";
import AITextRevisorForm from "./AITextRevisorForm";
import ResignationEmailForm from "./ResignationEmailForm";

export default function PromptPanel() {
    const [promptFormType, setPromptFormType] = useState("none");
    const [generatedText, setGeneratedText] = useState("");
    const supportedPromptForms = {
        noteSummarizer: <NoteSummarizerForm setGeneratedText={setGeneratedText}/>,
        aiTextRevisor: <AITextRevisorForm setGeneratedText={setGeneratedText}/>,
        resignationEmail: <ResignationEmailForm setGeneratedText={setGeneratedText}/>
    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Prompt Type
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => setPromptFormType("noteSummarizer")}
                    >
                        Note Summarizer
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType("aiTextRevisor")}
                    >
                        AI Text Revisor
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType("resignationEmail")}
                    >
                        Resignation Email
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType("cold_email")}
                    >
                        Cold Email
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType("cover_letter")}
                    >
                        Cover Letter
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType("negotiation_email")}
                    >
                        Negotiation Email
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType("introduction")}
                    >
                        Introduction
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType("conclusion")}
                    >
                        Conclusion
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <br />
            <div>
                {supportedPromptForms[promptFormType as keyof typeof supportedPromptForms]}
                <div style={{whiteSpace: "pre-line"}}>{generatedText}</div>
            </div>
        </div>
    );
}