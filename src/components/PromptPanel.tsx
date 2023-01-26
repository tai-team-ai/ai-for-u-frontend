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
import React from "react";
import PromptForm from "./PromptForm";

export default function PromptPanel() {
    const [promptType, setPromptType] = useState("none");

    const promptForm = () => {
        switch (promptType) {
            case "note_summarizer":
                return <PromptForm promptType={promptType} />;
            case "resignation_email":
                return <PromptForm promptType={promptType} />;
            case "cold_email":
                return <PromptForm promptType={promptType} />;
            case "cover_letter":
                return <PromptForm promptType={promptType} />;
            case "negotiation_email":
                return <PromptForm promptType={promptType} />;
            case "introduction":
                return <PromptForm promptType={promptType} />;
            case "conclusion":
                return <PromptForm promptType={promptType} />;
            default:
                return <div></div>;
        }
    };

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Prompt Type
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => setPromptType("note_summarizer")}
                    >
                        Note Summarizer
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptType("resignation_email")}
                    >
                        Resignation Email
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptType("cold_email")}
                    >
                        Cold Email
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptType("cover_letter")}
                    >
                        Cover Letter
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptType("negotiation_email")}
                    >
                        Negotiation Email
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptType("introduction")}
                    >
                        Introduction
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptType("conclusion")}
                    >
                        Conclusion
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {promptForm()}
        </div>
    );
}