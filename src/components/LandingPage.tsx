/*
File contains the landing page component.
This component is the first page that the user sees when they visit the website.
The landing page contains the following:
-header component
-request form component
-response component
*/

import Header from "./Header";
import PromptPanel from "./PromptPanel";

export default function LandingPage() {
    return (
        <div>
            <Header />
            <PromptPanel />
        </div>
    )
}