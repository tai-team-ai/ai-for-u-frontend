/*
Module defines a ResignationEmailForm component that is used to create a prompt for the OpeanAI wrapper API
that generates a resignation email. The form component uses material ui components to create a form that
contains a text field for the user to enter the reason for resignation, a date input field for the user to specify 
their resignation date, a text field for the user to enter the company name, a text field for the user to enter their 
manager's name, a slider to control "bluntness", and a text field for any other notes that the user would like to include 
in the email. The form component also contains a submit button that sends the prompt to the backend and displays the response in the generated text panel using 
a callback function (setGeneratedText). The form component also contains a reset button that resets the form to its initial state.
Form submissions to the backend are handled with a POST request using axios to the specified endpoint constant 
"OPEN_AI_RESIGNATION_EMAIL_API_PREFIX" in the constants.ts file. All components should use material ui components and 
follow the same structure as the other form components.
*/

import { useState } from "react";
import { Button, TextField, Typography, FormControl, Grid, Slider } from "@mui/material";
import axios from "axios";
import { constants } from "../util/constants";
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



export default function ResignationEmailForm(props: { setGeneratedText: React.Dispatch<React.SetStateAction<string>>}) {
    const [reason, setReason] = useState("");
    const [resignationDate, setResignationDate] = useState<Date | null>(null);
    const [companyName, setCompanyName] = useState("");
    const [managerName, setManagerName] = useState("");
    const [notes, setNotes] = useState("");
    const [bluntness, setBluntness] = useState(0);

    const resetForm = () => {
        setReason("");
        setResignationDate(null);
        setCompanyName("");
        setManagerName("");
        setNotes("");
        setBluntness(0);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setGeneratedText("Generating Email...");
        const request = {
            reason: reason,
            resignationDate: resignationDate,
            companyName: companyName,
            managerName: managerName,
            notes: notes,
            bluntness: bluntness
        }
        
        if (resignationDate === null) {
            request.resignationDate = new Date();
            request.resignationDate.setDate(request.resignationDate.getDate() + 14);
        }
        console.log(`Sending request: ${JSON.stringify(request)} to ${constants.API_URL + constants.OPEN_AI_RESIGNATION_EMAIL_API_PREFIX}`);

        axios.post(constants.API_URL + constants.OPEN_AI_RESIGNATION_EMAIL_API_PREFIX, request)
        .then(response => {
            console.log(response);
            let titles = "Generated Catchy Titles:\n";
            for (const [i, title] of response.data['titles'].entries()) {
                titles += `Title ${i + 1}:\n${title}\n\n`;
            }
            props.setGeneratedText(titles);
        })
        .catch((error) => {
            console.log(error);
            props.setGeneratedText("Error generating email. Please try again.");
        });
    }

    return (
        <div>
            <Typography variant="h5" component="h2" gutterBottom>
                Resignation Email Generator
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container direction={"column"} spacing={5}>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                id="reason"
                                multiline
                                label="Reason for Resignation"
                                variant="outlined"
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Resignation Date (Defaults to two weeks from today)"
                                value={resignationDate}
                                onChange={(newValue) => {
                                    setResignationDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                id="companyName"
                                label="Company Name"
                                variant="outlined"
                                value={companyName}
                                onChange={(event) => setCompanyName(event.target.value)}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                id="managerName"
                                label="Manager Name"
                                variant="outlined"
                                value={managerName}
                                onChange={(event) => setManagerName(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                id="notes"
                                multiline
                                label="Additional Notes to Include in Email"
                                variant="outlined"
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <Typography id="input-slider" gutterBottom>
                                Bluntness (0 = most polite, 100 = most blunt)
                            </Typography>
                            <Slider
                                aria-label="Temperature"
                                defaultValue={30}
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={100}
                                onChange={(event, newValue) => {setBluntness(newValue as number)}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <Grid container spacing={2} justifyContent="flex-end">
                                <Grid item>
                                    <Button type="reset" variant="contained" color="secondary" onClick={resetForm}>
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

