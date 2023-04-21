import React, { useState } from 'react'
import Layout from '@/components/layout/layout'
import { Grid, Text, Container } from '@nextui-org/react'
import Link from 'next/link'
import SubscribeModal from '@/components/modals/SubscribeModal'
import FancyHoverCard from '@/components/elements/FancyHoverCard'
import { constants, templateObjects, type TemplateObj } from '@/utils/constants'

const TEMPLATE_PAGE_HEADER: JSX.Element = (
  <>
    <span style={{ whiteSpace: 'nowrap' }}>AI Templates</span>
    <span style={{ wordBreak: 'break-word' }}>&nbsp;</span>
    <span style={{ whiteSpace: 'nowrap' }}>for U 🥳</span>
  </>
)

const TemplateCard = ({ href, title, description, callToAction }: TemplateObj): JSX.Element => {
  const [open, setOpen] = useState(false)
  const actionPhrase = callToAction

  return <>
        <Link
            href={href}
            style={{ height: '100%', width: '100%' }}
            onClick={(e) => {
              if (callToAction === constants.MAILING_LIST_CALL_TO_ACTION) {
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
            <Container css={{ padding: '0', margin: '0 -24px', maxWidth: 'calc(100% + 48px)', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid css={{ paddingLeft: '1rem' }}>
                <Text
                    h1
                    css={{
                      '@media screen and (max-width: 768px)': {
                        fontSize: '$3xl'
                      }
                    }}
                >
                    {TEMPLATE_PAGE_HEADER}
                </Text>
                </Grid>
                <Grid.Container gap={2}>
                    {templateObjects.map(template =>
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
