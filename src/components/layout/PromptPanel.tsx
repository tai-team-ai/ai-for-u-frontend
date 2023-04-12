/*
Module acts as a skeleton selector for the appropriate PromptForm. This skeleton is the entry point
in which PromptForm components are rendered and acts as the interface for the user to create
prompts that are sent to the backend (submission and response display is handled in the respective
form component). The skeleton uses react-bootstrap components and contains
a dropdown select drop down containing supported PromptForm types. The form component is imported
and dynamically generated based on the value in the select drop down.
*/

import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import SummarizerForm from '../forms/TextSummarizerForm'
import AITextRevisorForm from '../forms/AITextRevisorForm'
import ResignationEmailForm from '../forms/ResignationEmailForm'
import CatchyTitleCreator from '../forms/CatchyTitleCreatorForm'
import SalesInquiryEmailForm from '../forms/SalesInquiryEmailForm'
import DALLEPromptCoachForm from '../forms/DALLEPromptCoachForm'
import { CircularProgress } from '@mui/material'

export default function PromptPanel (): JSX.Element {
  const [promptFormType, setPromptForm] = useState('none')
  const [generatedText, setGeneratedText] = useState('')
  const [generatedImageUrls, setGeneratedImageUrls] = useState<string[]>([''])
  const [loadingState, setLoadingState] = useState(false)
  const supportedPromptForms = {
    dallePromptCoach: <DALLEPromptCoachForm setGeneratedText={setGeneratedText} setLoadingState={setLoadingState} setGeneratedImageUrls={setGeneratedImageUrls}/>,
    noteSummarizer: <SummarizerForm setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>,
    aiTextRevisor: <AITextRevisorForm setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>,
    resignationEmail: <ResignationEmailForm setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>,
    catchyTitleCreator: <CatchyTitleCreator setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>,
    salesInquiryEmailForm: <SalesInquiryEmailForm setGeneratedText={setGeneratedText} setLoadingState={setLoadingState}/>
  }

  const setPromptFormType = (promptType: string): (JSX.Element | null | undefined) => {
    setGeneratedText('')
    setLoadingState(false)
    if (promptType === 'none') {
      return <div></div>
    } else {
      setPromptForm(promptType)
    }
  }

  const images = (imageUrls: string[]): JSX.Element[] => imageUrls.map((imageUrl) => <img key={imageUrl} src={imageUrl} alt="generatedText"/>)

  return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Prompt Type
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => setPromptFormType('dallePromptCoach')}
                    >
                        Image Creator
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType('noteSummarizer')}
                    >
                        Note Summarizer
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType('aiTextRevisor')}
                    >
                        AI Text Revisor
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType('catchyTitleCreator')}
                    >
                        Catchy Title Creator
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType('resignationEmail')}
                    >
                        Resignation Email
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => setPromptFormType('salesInquiryEmailForm')}
                    >
                        Sales Inquiry Email
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <br />
            <div style={{ marginBottom: '100px' }}>
                {supportedPromptForms[promptFormType as keyof typeof supportedPromptForms]}
                {loadingState && <CircularProgress />}
                <b>{generatedText}</b>
                <div style={{ height: '20px' }}></div>
                {generatedImageUrls[0] !== '' ? images(generatedImageUrls) : <div></div>}
                <div style={{ height: '100px' }}></div>
            </div>
        </div>
  )
}
