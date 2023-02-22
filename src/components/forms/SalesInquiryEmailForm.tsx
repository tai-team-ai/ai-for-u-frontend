/*
Module defines a SalesInquiryEmailForm component that is used to create a prompt for the OpeanAI wrapper API 
that generates a sales inquiry email. The form component uses material ui components to create a form that 
contains a text field for the user to enter the company name, the point of conact at the company, a text field 
for the user to enter their name, the reason for the inquiry, a text field for the user to enter the product 
name, a text field for the user to enter the product description, and a text field for the user to enter the 
problem that the product solves. The form component also contains a submit button that sends the prompt to the 
backend and displays the response in the generated text panel using a callback function (setGeneratedText).
The form component also contains a reset button that resets the form to its initial state. 
Form submissions to the backend are handled with a POST request using axios to the specified endpoint constant 
"OPEN_AI_SALES_INQUIRY_EMAIL_API_PREFIX" in the constants.ts file. All components should use material ui components 
and follow the same structure as the other form components.
*/

import { useState } from "react";
import { Button, TextField, Typography, FormControl, Grid } from "@mui/material";
import axios from "axios";
import { constants } from "../../utils/constants";

export default function SalesInquiryEmailForm(props: {
    setGeneratedText: React.Dispatch<React.SetStateAction<string>>,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [companyName, setCompanyName] = useState("");
    const [pointOfContact, setPointOfContact] = useState("");
    const [name, setName] = useState("");
    const [reason, setReason] = useState("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [problem, setProblem] = useState("");

    const resetForm = () => {
        setCompanyName("");
        setPointOfContact("");
        setName("");
        setReason("");
        setProductName("");
        setProductDescription("");
        setProblem("");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setGeneratedText("Generating Email...");
        props.setLoadingState(true);
        const request = {
            companyName: companyName,
            pointOfContact: pointOfContact,
            name: name,
            reason: reason,
            productName: productName,
            productDescription: productDescription,
            problem: problem
        }
        console.log(`Sending request: ${JSON.stringify(request)} to ${constants.API_URL + constants.OPEN_AI_SALES_INQUIRY_EMAIL_API_PREFIX}`);

        axios.post(constants.API_URL + constants.OPEN_AI_SALES_INQUIRY_EMAIL_API_PREFIX, request)
        .then(response => {
            console.log(response);
            props.setGeneratedText(response.data["salesInquiryEmail"]);
        })
        .catch(error => {
            console.log(error);
            props.setGeneratedText("Error generating email. Please try again later.");
        })
        .finally(() => {
            props.setLoadingState(false);
        });
    }

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Sales Inquiry Email Generator
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container direction={"column"} spacing={5}>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                id="companyName"
                                label="Company Name of the Company You Would Like to Sell Your Product to"
                                value={companyName}
                                onChange={(event) => setCompanyName(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                id="pointOfContact"
                                label="Point of Contact at Company You Would Like to Sell Your Product to"
                                value={pointOfContact}
                                onChange={(event) => setPointOfContact(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                id="name"
                                label="Your Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                multiline
                                id="reason"
                                label="Reason for Your Sales Inquiry (why are you contacting this company?)"
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                id="productName"
                                label="Name of Product You Would Like to Sell to the Company"
                                value={productName}
                                onChange={(event) => setProductName(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                multiline
                                id="productDescription"
                                label="Your Product's Description"
                                value={productDescription}
                                onChange={(event) => setProductDescription(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                required
                                multiline
                                id="problem"
                                label="Problem that Your Product Solves"
                                value={problem}
                                onChange={(event) => setProblem(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <Grid container spacing={2} justifyContent="flex-end">
                                <Grid item>
                                    <Button variant="contained" onClick={resetForm}>
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" type="submit">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}


