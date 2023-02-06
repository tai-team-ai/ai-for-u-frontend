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
import CatchyTitleCreator from "./CatchyTitleCreator";
import SalesInquiryEmailForm from "./SalesInquiryEmailForm";
import { CircularProgress } from "@mui/material";

export default function PromptPanel() {
    const [promptFormType, setPromptForm] = useState("none");
    const [generatedText, setGeneratedText] = useState("");
    const [loadingState, setLoadingState] = useState(false);
    const supportedPromptForms = {
        noteSummarizer: <NoteSummarizerForm setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>,
        aiTextRevisor: <AITextRevisorForm setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>,
        resignationEmail: <ResignationEmailForm setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>,
        catchyTitleCreator: <CatchyTitleCreator setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>,
        salesInquiryEmailForm: <SalesInquiryEmailForm setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>
    }

    const setPromptFormType = (promptType: string) => {
        setGeneratedText("");
        setLoadingState(false);
        if (promptType === "none") {
            return <div></div>;
        } else {
            setPromptForm(promptType);
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
                        onClick={() => setPromptFormType("catchyTitleCreator")}
                    >
                        Catchy Title Creator
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType("salesInquiryEmailForm")}
                    >
                        Sales Inquiry Email
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <br />
            <div style={{marginBottom:"100px"}}>
                {supportedPromptForms[promptFormType as keyof typeof supportedPromptForms]}
                <div style={{whiteSpace: "pre-line"}}>{generatedText}</div>
                {loadingState && <CircularProgress />}
            </div>
        </div>
    );
}