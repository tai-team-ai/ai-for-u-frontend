export const DEPLOYMENT_ENV = 'prod'

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
  MAILING_LIST_CALL_TO_ACTION: 'Subscribe for Updates!'
}

export const routes = {
  LOGIN: '/auth/login',
  SANDBOX: '/app/sandbox',
  TEMPLATES: '/templates',
  APP: '/app',
  ROOT: '/'
}

export const errors: Record<string, string> = {
  OAuthAccountNotLinked: 'Email already exists. Please login with email instead of Google.'
}

export interface TemplateObj {
  title: string
  description: string
  href: string
  callToAction: string
}

export const templateObjects: TemplateObj[] = [
  {
    title: '📄 Text Summarizer',
    description: 'Struggling to keep up with note-taking during meetings or lectures? Say goodbye to the stress of sifting through endless notes and hello to more efficient work and study habits!',
    href: '/templates/text-summarizer',
    callToAction: 'Let\'s get Summarizing!'
  },
  {
    title: '📝 Text Revisor',
    description: 'Improve your writing quality with our AI-powered text revisor! Whether you\'re a student or a professional, our AI text revisor can help you achieve your writing goals!',
    href: '/templates/text-revisor',
    callToAction: 'Let\'s get Revising!'
  },
  {
    title: '✨ Catchy Title Creator',
    description: 'Struggling to come up with a catchy title for your content? Our AI-powered catchy title creator can help you come up with the perfect title for your next blog post, article, or video!',
    href: '/templates/catchy-title-creator',
    callToAction: 'Let\'s get Creating!'
  },
  {
    title: '📈 Cover Letter Writer',
    description: 'Land your dream job with our AI-powered Cover Letter Writer! Perfect for anyone looking to advance their career, our tool takes the stress out of crafting the perfect cover letter!',
    href: '/templates/cover-letter-writer',
    callToAction: 'Let\'s get Writing!'
  },
  {
    title: '🚀 More Coming Soon!',
    description: 'Stay ahead of the game with our upcoming AI-powered features! Subscribe to our mailing list to be the first to know when our latest features are released!',
    href: '',
    callToAction: constants.MAILING_LIST_CALL_TO_ACTION
  }
]
