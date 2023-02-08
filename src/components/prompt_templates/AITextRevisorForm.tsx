/*
This module defines the AITextRevisorForm component. This component is a form that allows the user to 
submit text to the backend for revision. The form contains a text area for the user to input text, a selector 
for selecting the number of revisions to generate, a multi-select drop down for selecting the revision types,
a select for the tone of the revisions, a slider that controls the creativity of the response, a rest button,
and a submit button. The form is submitted to the backend via an axios
post request to the endpoint listed in constants.ts. The form is passed a handler for setting the response of the 
endpoint using handler setGeneratedText. All components should use material ui components and follow the same 
structure as the other form components.
*/

import axios from "axios";
import { useState } from "react";
import { constants } from "../../utils/constants";
import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider, TextField, Typography } from "@mui/material";




const revisionTypesOptions: string[] = [
    "Grammar",
    "Spelling",
    "Vocabulary",
    "Sentence Structure",
    "Word Choice",
    "Consistency",
    "Punctuation",
];

const toneOptions: string[] = [
    "Neutral",
    "Assertive",
    "Confident",
    "Informal",
    "Formal"
];


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function AITextRevisorForm(props: {
    setGeneratedText: React.Dispatch<React.SetStateAction<string>>,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [text, setText] = useState("");
    const [numRevisions, setNumRevisions] = useState(1);
    const [revisionTypes, setRevisionTypes] = useState<string[]>([]);
    const [tone, setTone] = useState("neutral");
    const [creativity, setCreativity] = useState(50);


    const handleRevisionTypeChange = (event: SelectChangeEvent<typeof revisionTypes>) => {
        const {
            target: { value },
        } = event;
        setRevisionTypes(
          // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const resetForm = () => {
        setText("");
        setNumRevisions(1);
        setRevisionTypes([]);
        setTone("neutral");
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.setGeneratedText("Generating revisions...");
        props.setLoadingState(true);

        const request_body = {
            textToRevise: text,
            revisionTypes: revisionTypes,
            numberOfRevisions: numRevisions,
            tone: tone,
            creativity: creativity
        }
        console.log(`Sending request ${JSON.stringify(text)} to ${constants.API_URL}${constants.OPEN_AI_TEXT_REVISOR_API_PREFIX}`)
        axios.post(`${constants.API_URL}${constants.OPEN_AI_TEXT_REVISOR_API_PREFIX}`, request_body)
        .then((response) => {
            console.log(response)
            let revisions = ""
            for (const [i, revision] of response.data['revisedTextList'].entries()) {
                revisions += `Revision ${i + 1}:\n${revision}\n\n`;
            }
            props.setGeneratedText(revisions);
        })
        .catch((error) => {
            console.log(error);
            props.setGeneratedText("Error revising text. Please try again.");
        })
        .finally(() => {
            props.setLoadingState(false);
        });
    };

    return (
        <div>
            <Typography variant="h5" component="h2" gutterBottom>
                Text Revisor
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container direction={"column"} spacing={5}>
                    <Grid item>
                        <FormControl fullWidth>
                            <TextField
                                id="text"
                                label="Text to Revise"
                                multiline
                                rows={5}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="revision-type">Number of Revisions</InputLabel>
                            <Select
                                label="Number of Revisions"
                                labelId="num-revisions-label"
                                id="num-revisions"
                                value={numRevisions}
                                onChange={(e) => setNumRevisions(e.target.value as number)}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                        <InputLabel id="revision-type">Revision Type</InputLabel>
                        <Select
                            labelId="revision-type-label"
                            id="revision-type"
                            multiple
                            value={revisionTypes}
                            onChange={handleRevisionTypeChange}
                            input={<OutlinedInput id="select-multiple-revision-types" label="Revision Types" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {revisionTypesOptions.map((revisionType) => (
                                <MenuItem
                                key={revisionType}
                                value={revisionType.toLowerCase()}
                                >
                                {revisionType}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="tone-label">Tone</InputLabel>
                            <Select
                                label="Tone"
                                id="tone"
                                aria-label="Tone"
                                value={tone}
                                onChange={(e) => setTone(e.target.value as string)}
                            >
                                {toneOptions.map((toneOption) => (
                                    <MenuItem key={toneOption} value={toneOption.toLowerCase()}>{toneOption}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <Typography variant="body1" component="p" gutterBottom>
                                Creativity Control (0 = least creative, 100 = most creative)
                            </Typography>
                            <Slider
                                defaultValue={0.5}
                                aria-label="Creativity Control"
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={100}
                                onChange={(e, value) => setCreativity(value as number)}
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