export const DEPLOYMENT_ENV = 'prod';

export const constants = {
    API_URL: 'https://efryejhdd0.execute-api.us-west-2.amazonaws.com/',
    OPEN_AI_NOTES_API_PREFIX: DEPLOYMENT_ENV + '/openai/note_summarizer',
    OPEN_AI_TEXT_REVISOR_API_PREFIX: DEPLOYMENT_ENV + '/openai/text_revisor',
    OPEN_AI_RESIGNATION_EMAIL_API_PREFIX: DEPLOYMENT_ENV + '/openai/resignation_email_generator',
    OPEN_AI_CATCHY_TITLE_API_PREFIX: DEPLOYMENT_ENV + '/openai/catchy-title-creator',
    OPEN_AI_SALES_INQUIRY_EMAIL_API_PREFIX: DEPLOYMENT_ENV + '/openai/sales-inquiry-email-generator',
    OPEN_AI_NEGOTIATION_EMAIL_API_PREFIX: DEPLOYMENT_ENV + '/openai/negotiation-email-generator',
    AUTH_API_PREFIX: DEPLOYMENT_ENV + '/openai/auth',
    LOCAL_TOKEN_KEY_NAME: 'token',
    SITE_NAME: 'AI for U (alpha preview)',
    OPEN_AI_DALLE_PROMPT_COACH_API_PREFIX: DEPLOYMENT_ENV + '/openai/dalle-prompt-coach',
};

export const routes = {
    LOGIN: '/auth/login',
    SANDBOX: '/app/sandbox',
    TEMPLATES: '/templates',
    APP: '/app',
    ROOT: '/',
}

export const errors = {
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally."
}
