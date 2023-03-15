import React, {useEffect, useRef, useState} from "react";
import { Modal, Button, Input, Loading, Image, Text, Card } from "@nextui-org/react";
import EmailIcon from '@mui/icons-material/Email';
import { signIn } from "next-auth/react";
import { validateSignUp } from "@/utils/validation";
import { uFetch } from "@/utils/http";
import styles from "@/styles/FeedbackModal.module.css"


interface FeedbackModalProps {
    open: boolean
    setOpen: (o: boolean) => void
    message: string
    template: string
}

interface StarRatingProps {
    rating: number
    setRating: (o: number) => void
}

const StarRating = ({rating, setRating}: StarRatingProps) => {
    const [hover, setHover] = useState(0);
    return (
        <div className={styles['star-rating']}>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={`${styles[index <= (rating || hover) ? "on" : "off"]} ${styles["star-btn"]}`}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        >
                        <span className={styles["star"]}>&#9733;</span>
                    </button>
                )
            })}
        </div>
    )
}

const FeedbackModal = ({open, setOpen, message, template}: FeedbackModalProps) => {
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState("");

    const submitFeedback = async () => {

        const response = await uFetch("/api/ai-for-u/feedback", {
            method: "POST",
            body: JSON.stringify({rating, feedback, message, template})
        });
        const data = await response.json();
        console.log(data);

        setOpen(false);
    }

    return (
        <Modal
            open={open}
            closeButton
            onClose={() => setOpen(false)}
        >
                <Modal.Header>
                    <Text h3>
                        How did the AI do?
                    </Text>
                </Modal.Header>
                    <Modal.Body>
                        <StarRating
                            rating={rating}
                            setRating={setRating}
                        />
                        {
                            rating < 5 ? <Input
                            type="text"
                            label="Tell us how the AI could improve"
                            onChange={(event) => {setFeedback(event.target.value)}}
                        /> : null
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            auto
                            flat
                            type="submit"
                            color="primary"
                            onPress={() => submitFeedback()}
                        >
                            Submit
                        </Button>
                        <Button
                            auto
                            light
                            color="error"
                            onPress={() => {setOpen(false)}}
                        >
                            Close
                        </Button>

                    </Modal.Footer>
        </Modal>
    );
}
export default FeedbackModal;