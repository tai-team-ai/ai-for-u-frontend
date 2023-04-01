import React, {useState} from "react";
import { Modal, Button, Input, Loading, Text } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { uFetch } from "@/utils/http";
import styles from "@/styles/FeedbackModal.module.css"

export interface ResponseProps {
    aiResponseFeedbackContext: any
    aiToolEndpointName: string
    userPromptFeedbackContext: any
}

export function RateResponse({aiResponseFeedbackContext, aiToolEndpointName, userPromptFeedbackContext}: ResponseProps) {
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    return (
    <>
        <div>
            <span
                className={styles["rate-btn"]}
                onClick={() => setShowFeedbackModal(true)}
            >
                Rate this response?
            </span>
        </div>
        <FeedbackModal
            open={showFeedbackModal}
            setOpen={setShowFeedbackModal}
            aiResponseFeedbackContext={aiResponseFeedbackContext}
            aiToolEndpointName={aiToolEndpointName}
            userPromptFeedbackContext={userPromptFeedbackContext}
        />
    </>)
}

interface FeedbackModalProps {
    open: boolean
    setOpen: (o: boolean) => void
    aiResponseFeedbackContext: any
    aiToolEndpointName: string
    userPromptFeedbackContext: any
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

const FeedbackModal = ({open, setOpen, aiResponseFeedbackContext, aiToolEndpointName, userPromptFeedbackContext}: FeedbackModalProps) => {
    const {data: session} = useSession()
    const [rating, setRating] = useState(5);
    const [writtenFeedback, setWrittenFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const submitFeedback = async () => {
        setLoading(true);
        const response = await uFetch("/api/ai-for-u/feedback", {
            session: session,
            method: "POST",
            body: JSON.stringify({rating: String(rating), writtenFeedback, aiResponseFeedbackContext, aiToolEndpointName, userPromptFeedbackContext})
        });
        const data = await response.json();
        console.log(data);
        setOpen(false);
        setLoading(false);
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
                            <Input
                            type="text"
                            label={rating < 5 ? "Tell us how the AI could improve" : "Amazing!🎉 What was great about it?"}
                            onChange={(event: any) => {setWrittenFeedback(event.target.value)}}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            auto
                            flat
                            type="submit"
                            color="primary"
                            disabled={loading}
                            onPress={() => submitFeedback()}
                        >
                            {loading ? <Loading type="points"/>  : "Submit"}
                        </Button>
                    </Modal.Footer>
        </Modal>
    );
}
export default FeedbackModal;