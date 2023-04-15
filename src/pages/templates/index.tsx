import React, { useState } from 'react'
import Layout from '@/components/layout/layout'
import { Grid, Text, Container } from '@nextui-org/react'
import Link from 'next/link'
import SubscribeModal from '@/components/modals/SubscribeModal'
import FancyHoverCard from '@/components/elements/FancyHoverCard'

const TEMPLATE_PAGE_HEADER: JSX.Element = (
  <>
    <span style={{ whiteSpace: 'nowrap' }}>AI Templates</span>
    <span style={{ wordBreak: 'break-word' }}>&nbsp;</span>
    <span style={{ whiteSpace: 'nowrap' }}>for U 🥳</span>
  </>
)

const MAILING_LIST_CALL_TO_ACTION: string = 'Subscribe for Updates!'

interface TemplateObj {
  title: string
  description: string
  href: string
  callToAction: string
}

const templates: TemplateObj[] = [
  {
    title: '📄 Note Summarizer',
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
    description: 'Land your dream job with our AI-powered Cover Letter Maker! Perfect for anyone looking to advance their career, our tool takes the stress out of crafting the perfect cover letter!',
    href: '/templates/cover-letter-writer',
    callToAction: 'Let\'s get Writing!'
  },
  {
    title: '🚀 More Coming Soon!',
    description: 'Stay ahead of the game with our upcoming AI-powered features! Subscribe to our mailing list to be the first to know when our latest features are released!',
    href: '',
    callToAction: MAILING_LIST_CALL_TO_ACTION
  }
]

const TemplateCard = ({ href, title, description, callToAction }: TemplateObj): JSX.Element => {
  const [open, setOpen] = useState(false)
  const actionPhrase = callToAction

  return <>
        <Link
            href={href}
            style={{ height: '100%', width: '100%' }}
            onClick={(e) => {
              if (callToAction === MAILING_LIST_CALL_TO_ACTION) {
                e.preventDefault()
                setOpen(true)
              }
            }}
        >
            <FancyHoverCard
                hover={actionPhrase}
                title={title}
                description={description}
            />
        </Link>
        <SubscribeModal open={open} setOpen={setOpen} />
    </>
}

const Index = (): JSX.Element => {
  return (
        <Layout>
            <Container>
                <Grid css={{ paddingLeft: '1em' }}>
                <Text
                    h1
                    css={{
                      color: '$colors$primary',
                      '@media screen and (max-width: 768px)': {
                        fontSize: '$3xl'
                      }
                    }}
                >
                    {TEMPLATE_PAGE_HEADER}
                </Text>
                </Grid>
                <Grid.Container gap={2} css={{ marginLeft: '-1em', marginRight: '-1em' }}>
                    {templates.map(template =>
                        <Grid xs={12} sm={6} md={4}>
                            <TemplateCard {...template}></TemplateCard>
                        </Grid>
                    )}
                </Grid.Container>
            </Container>
        </Layout>
  )
}

export default Index
