import { Session } from "next-auth";
import { uFetch } from "./http";


interface JoinMailingListProps {
    session: Session | null
    email: string;
    setIsSubmitting: (v: boolean) => void;
    setIsSubscribed: (v: boolean) => void;
}

const joinMailingList = async ({ session, email, setIsSubmitting, setIsSubscribed }: JoinMailingListProps) => {
    setIsSubmitting(true)
    const response = await uFetch("/api/ai-for-u/subscription", {
        session: session,
        method: "POST",
        body: JSON.stringify({ email })
    });
    if (response.status === 200) {
        setIsSubmitting(false);
        setIsSubscribed(true);
    }
    else {
        setIsSubmitting(false);
    }
}

export { joinMailingList };