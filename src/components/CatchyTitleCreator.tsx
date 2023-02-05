/*
Module defines a CatchyTitleCreator component that is used to create a prompt for the OpeanAI wrapper API 
that generates a "click-baity" title for any given text. The form component uses material ui components to create a form that 
contains a text field for the user to enter the text that they would like to generate a title for, a text field for the 
user to enter the target audience for the catchy title, and a material ui drop down menu for the user to select the number of 
titles to generate. The form component also contains a submit button that sends the prompt to the backend and displays the response in the generated text panel using 
a callback function (setGeneratedText). The form component also contains a reset button that resets the form to its initial state. 
Form submissions to the backend are handled with a POST request using axios to the specified endpoint constant
"OPEN_AI_CATCHY_TITLE_API_PREFIX" in the constants.ts file. All components should use material ui components and
follow the same structure as the other form components.
*/

import { useState } from "react";
import { Button, TextField, Typography, FormControl, Grid, MenuItem, Select, InputLabel } from "@mui/material";
import axios from "axios";
import { constants } from "../util/constants";

export default function CatchyTitleCreator(props: {
    setGeneratedText: React.Dispatch<React.SetStateAction<string>>,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [text, setText] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [numTitles, setNumTitles] = useState("");

    const resetForm = () => {
        setText("");
        setTargetAudience("");
        setNumTitles("");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setGeneratedText("Generating Titles...");
        const request = {
            text: text,
            targetAudience: targetAudience,
            numTitles: numTitles
        }
        console.log(`Sending request: ${JSON.stringify(request)} to ${constants.API_URL + constants.OPEN_AI_CATCHY_TITLE_API_PREFIX}`)

        axios.post(constants.API_URL + constants.OPEN_AI_CATCHY_TITLE_API_PREFIX, request)
        .then(response => {
            console.log(response);
            let titles = "Catchy Title Generator Results: \n";
            for (const [i, title] of response.data.titles.entries()) {
                titles += `${title}\n\n`;
            }
            props.setGeneratedText(titles);
        })
        .catch(err => {
            console.log(err);
            props.setGeneratedText("Error generating titles. Please try again.");
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction={"column"} spacing={5}>
                <Grid item>
                    <Typography variant="h4">Catchy Title Generator</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Text"
                        multiline
                        rows={4}
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Target Audience"
                        multiline
                        rows={1}
                        value={targetAudience}
                        onChange={(event) => setTargetAudience(event.target.value)}
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Number of Titles</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={numTitles}
                            label="Number of Titles"
                            onChange={(event) => setNumTitles(event.target.value)}
                            required
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
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
                </Grid>
            </Grid>
        </form>
    )
}
