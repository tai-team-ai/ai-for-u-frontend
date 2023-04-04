import Template, { ResultBox } from "@/components/layout/template";
import Layout from "@/components/layout/layout";
import  Input from "@/components/elements/Input"
import Textarea from "@/components/elements/Textarea"
import ToneDropdown, { ValidTones } from "@/components/elements/ToneDropdown"

import { Text } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { uFetch } from "@/utils/http";
import { useSession } from "next-auth/react";
import Markdown from 'markdown-to-jsx';
import { placeholderDefault } from "@/utils/transform";
import { ResponseProps } from "@/components/modals/FeedbackModal";


const CoverLetterWriter = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [responseProps, setResponseProps] = useState<ResponseProps>({
        aiToolEndpointName: "",
        userPromptFeedbackContext: {},
        aiResponseFeedbackContext: {},
    });
    const [coverLetter, setCoverLetter] = useState<string>("");
    const [selectedTone, setSelectedTone] = useState<ValidTones>("formal");

    const onSubmit = async (event: FormEvent) => {
        setLoading(true);
        setShowResult(true);
        event.preventDefault();
        const body = {
            // @ts-ignore
            resume: event.target.resume.value,
            // @ts-ignore
            jobPosting: event.target.jobPosting.value,
            // @ts-ignore
            companyName: event.target.companyName.value,
            // @ts-ignore
            skillsToHighlightFromResume: event.target.skillsToHighlightFromResume.value,
            // @ts-ignore
            tone: selectedTone,
            // @ts-ignore
            freeformCommand: event.target.freeformCommand.value,
        }

        uFetch("/api/ai-for-u/cover-letter-writer", { session, method: "POST", body: JSON.stringify(body) }).then(response => response.json())
            .then(data => {
                setCoverLetter(data.coverLetter);
                setResponseProps({
                    aiResponseFeedbackContext: data,
                    userPromptFeedbackContext: body,
                    aiToolEndpointName: "catchy-title-creator"
                });
                setLoading(false);
            })
    }
    const exampleUrl = `/api/ai-for-u/cover-letter-writer-examples`
    return (
        <>
            <Layout>
                <Template exampleUrl={exampleUrl} formLoading={loading} handleSubmit={onSubmit} setShowResult={setShowResult} resultBox={
                    <ResultBox showResult={showResult} loading={loading} responseProps={responseProps}>
                        <Text h3>Cover Letter</Text>
                        <Markdown>{coverLetter}</Markdown>
                    </ResultBox>
                }>
                    <Textarea required id="resume" name="resume" fullWidth label="Resume" form="task-form" />
                    <Textarea required id="jobPosting" name="jobPosting" fullWidth label="Job Posting" form="task-form" />
                    <Input id="companyName" name="companyName" type="text" fullWidth label="Company name" />
                    <Input id="skillsToHighlightFromResume" name="skillsToHighlightFromResume" type="text" fullWidth label="Skill to highlight from resume" />
                    <ToneDropdown selectedTone={selectedTone} setSelectedTone={setSelectedTone}/>
                    <Input id="freeformCommand" name="freeformCommand" type="text" fullWidth label="Freeform Command" />
                </Template>
            </Layout>
        </>
    )
}

export default CoverLetterWriter;