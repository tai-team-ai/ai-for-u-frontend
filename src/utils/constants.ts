export const constants = {
  MAILING_LIST_CALL_TO_ACTION: 'Subscribe for Updates!'
}

export const routes = {
  SANDBOX: '/sandbox',
  TEMPLATES: '/templates',
  ROOT: '/',
  SITE_MAP: '/sitemap.xml'
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

export const TEMPLATE_CARD_OBJECTS: TemplateObj[] = [
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

export const TRUST_BUILDER_OBJECTS = [
  {
    title: 'AI Assistant (ChatGPT)',
    description: 'Identical to ChatGPT, without the wait! From generating content ideas, to writing emails, to generating code, our AI assistant is here to help!',
    hover: 'Let\'s Chat! 😊',
    link: routes.SANDBOX,
    subscribeModal: false
  },
  {
    title: 'Paper Writing Template',
    description: 'We\'ve heard you, and we\'re working on it! Our AI will help you write your next paper! We\'re really excited to bring this to you in the near future!',
    hover: 'Almost there! 🎊',
    link: null,
    subscribeModal: true
  },
  {
    title: 'Chrome Gmail Extension',
    description: 'Tired of writing emails? Let AI do it for you! Our Chrome extension fully automates the process of writing emails! We\'re really excited to bring this to you!',
    hover: 'Coming Soon! 🙌',
    link: null,
    subscribeModal: true
  },
  {
    title: 'Mobile AI Tools Application',
    description: 'We\'re working on bringing our AI tools to your mobile devices! We will be offering powerful multi-modal AI tools for your mobile devices!',
    hover: 'Heck yeah! 🤩',
    link: null,
    subscribeModal: true
  }
]
