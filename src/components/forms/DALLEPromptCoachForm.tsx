/*
Module defines a prompt coach form for the DALLE model. The form component uses material ui components to create a form that
allows the user to enter a prompt for the DALLE model. This form "feels" like a chat bot. The user can enter their text at the bottom
and press a button with a send icon. The user's sent text will appear in the chat box and the model's response will appear below the user's text.
The form component also contains a reset button that resets the form to its initial state. Every time the user sends a message, the new message is added to the prompt.
to the prior messages. The form component also contains a reset button that resets the form to its initial state. Form submissions to the backend are handled with a POST request using axios to the specified endpoint constant
"OPEN_AI_DALLE_PROMPT_COACH_API_PREFIX" in the constants.ts file. All components should use material ui components and 
follow the same structure as the other form components. Axios is used to send the request to the backend.
*/

import { useState } from "react";
import { Button, TextField, Typography, FormControl, Grid, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";
import { constants } from "../../utils/constants";
import SendIcon from '@mui/icons-material/Send';
import { Box } from "@mui/system";


export default function DALLEPromptCoachForm(props: {
    setGeneratedText: React.Dispatch<React.SetStateAction<string>>,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [prompt, setPrompt] = useState("");
    const [message, setMessage] = useState("");
    const [returnCoachingTips, setReturnCoachingTips] = useState(false);

    const resetForm = () => {
        setPrompt("");
        setMessage("");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setGeneratedText("Generating Response...");
        props.setLoadingState(true);
        const request = {
            prompt: prompt + message
        }
        console.log(`Sending request: ${JSON.stringify(request)} to ${constants.API_URL + constants.OPEN_AI_DALLE_PROMPT_COACH_API_PREFIX}`);
        axios.post(constants.API_URL + constants.OPEN_AI_DALLE_PROMPT_COACH_API_PREFIX, request)
            .then((response) => {
                console.log(`Received response: ${JSON.stringify(response.data)}`);
                props.setGeneratedText(response.data.response);
                setPrompt(prompt + message);
                setPrompt(prompt + response.data.response);
                setMessage("");
            })
            .catch((error) => {
                console.log(`Received error: ${error}`);
                props.setGeneratedText("Error: " + error);
            })
            .finally(() => {
                props.setLoadingState(false);
            }
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="div" gutterBottom>
                            Image Creator
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>
                            Enter a prompt for the image creator. The creator will coach you to create a prompt that will generate a good image.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                id="prompt"
                                label="Prompt"
                                multiline
                                rows={4}
                                value={prompt}
                                onChange={(event) => setPrompt(event.target.value)}
                                variant="outlined"
                                disabled
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                id="message"
                                label="What kind of image would you like to create?"
                                multiline
                                rows={4}
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                variant="outlined"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item>
                                <FormControl fullWidth>
                                    <FormControlLabel control= {
                                        <Checkbox
                                            checked={returnCoachingTips}
                                            onChange={(event) => setReturnCoachingTips(event.target.checked)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Include Image Creation Tips"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={resetForm}>
                                    Reset
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}                            >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}
