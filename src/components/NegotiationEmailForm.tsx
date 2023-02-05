/*
Module defines a NegotiationEmailForm component that allows the user to generate a negotiation email 
from a template. The component uses material ui components and hooks to manage state. The template provides 
fields including, text field to enter the email they are responding to, a text field to enter the amount of money 
they want to ask for, a text field for the name of the company they are negotiating with, and a text field for 
the name of the person they are negotiating with. The request is sent to the backend OpenAI Wrapper API. The request
is sent using the axios library. The response is then displayed useing th callback setGeneratedText.
*/

import React, { useState } from 'react';
import axios from 'axios';
import { constants } from '../util/constants';
import { Button, TextField, Typography, FormControl, Grid, Slider } from "@mui/material";

export {}


export default function NegotiationEmailForm(props: { setGeneratedText: React.Dispatch<React.SetStateAction<string>> }) {
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [personName, setPersonName] = useState("");

    const resetForm = () => {
        setEmail("");
        setAmount("");
        setCompanyName("");
        setPersonName("");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setGeneratedText("Generating Email...");
        const request = {
            email: email,
            amount: amount,
            companyName: companyName,
            personName: personName
        }
        console.log(`Sending request: ${JSON.stringify(request)} to ${constants.API_URL + constants.OPEN_AI_NEGOTIATION_EMAIL_API_PREFIX}`);

        axios.post(constants.API_URL + constants.OPEN_AI_NEGOTIATION_EMAIL_API_PREFIX, request)
        .then(response => {
            props.setGeneratedText(response.data);
        })
        .catch(error => {
            console.log(error);
            props.setGeneratedText("Error generating email");
        })
    }

    return (
        <div>
            <Typography variant="h6" component="h2" gutterBottom>
                Negotiation Email Generator
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="amount"
                            name="amount"
                            label="Amount"
                            fullWidth
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="companyName"
                            name="companyName"
                            label="Company Name"
                            fullWidth
                            value={companyName}
                            onChange={(event) => setCompanyName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="personName"
                            name="personName"
                            label="Person Name"
                            fullWidth
                            value={personName}
                            onChange={(event) => setPersonName(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <br />
                    <Grid container spacing={2} justifyContent={"flex-end"}>
                        <Grid item>
                            <Button variant="contained" type="submit">Generate Email</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
