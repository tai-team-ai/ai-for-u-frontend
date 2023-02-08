import axios from "axios";
import { useState } from "react";
import { constants } from "../../utils/constants";
import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";


export default function SummarizerForm(props: {
    setGeneratedText: React.Dispatch<React.SetStateAction<string>>,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [summarizer, setSummarizer] = useState({
        textToSummarize: "",
        numberOfBullets: "",
        numberOfActionItems: ""
    });
    const [includeSummarySentence, setIncludeSummarySentence] = useState(false);
    
    const resetForm = () => {
        setSummarizer({
            textToSummarize: "",
            numberOfBullets: "",
            numberOfActionItems: "",
        });
        setIncludeSummarySentence(false);
    }

    const handlesummarizerChange = (event: any) => {
        setSummarizer({ ...summarizer, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.setGeneratedText("Generating summary...");
        props.setLoadingState(true);
        console.log(`Sending request ${JSON.stringify(summarizer)} to ${constants.API_URL}${constants.OPEN_AI_NOTES_API_PREFIX}`)
        axios.post(`${constants.API_URL}${constants.OPEN_AI_NOTES_API_PREFIX}`, {
            notesToSummarize: summarizer.textToSummarize,
            numberOfBullets: summarizer.numberOfBullets,
            numberOfActionItems: summarizer.numberOfActionItems,
            includeSummarySentence: includeSummarySentence
        })
        .then((response) => {
            console.log(response)
            const summary_sentence: string = response.data["summarySentence"];
            const bullet_points: string = response.data["bulletPoints"];
            const action_items: string = response.data["actionItems"];
            const summary: string = `Summary:\n${summary_sentence} \n\nBullet Points:\n${bullet_points} \n\nAction Items:\n${action_items}`
            props.setGeneratedText(summary);
        })
        .catch((error) => {
            console.log(error);
            props.setGeneratedText("Error generating summary. Please try again.");
        })
        .finally(() => {
            props.setLoadingState(false);
        });
    };


    return (
        <div>
            <Typography variant="h5" component="h2" gutterBottom>
               Text Summarizer
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container direction={"column"} spacing={5}>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                id="textToSummarize"
                                multiline
                                label="Text to Summarize"
                                variant="outlined"
                                rows={5}
                                value={summarizer.textToSummarize}
                                onChange={handlesummarizerChange}
                                name="textToSummarize"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <FormControlLabel control= {
                                <Checkbox
                                    checked={includeSummarySentence}
                                    onChange={(event) => setIncludeSummarySentence(event.target.checked)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label="Include Summary Sentence"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="revision-type">Number of Bullets</InputLabel>
                            <Select 
                                id="numberOfBullets"
                                label="Number of Bullets"
                                variant="outlined"
                                value={summarizer.numberOfBullets}
                                onChange={handlesummarizerChange}
                                name="numberOfBullets"
                                required
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="revision-type">Number of Action Items</InputLabel>
                            <Select
                                id="numberOfActionItems"
                                label="Number of Action Items"
                                variant="outlined"
                                value={summarizer.numberOfActionItems}
                                onChange={handlesummarizerChange}
                                name="numberOfActionItems"
                                required
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
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