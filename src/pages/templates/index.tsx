import Layout from "@/components/layout/layout";
import { uFetch } from "@/utils/http";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, Grid, Text, useTheme, styled, Theme, NextUITheme, Container } from "@nextui-org/react"
import Link from "next/link";
import styles from "@/styles/Templates.module.css"
import SubscribeModal from "@/components/modals/SubscribeModal"
import FancyHoverCard from "@/components/elements/FancyHoverCard";

interface TemplateObj {
    title: string
    description: string
    href: string
    comingSoon: boolean
}

const templates: TemplateObj[] = [
    {
        title: "Text Summarizer",
        description: "Is it difficult to summarize all that notes you've taken for your meetings or classes?  Try this text summarizer to quickly condense all the important points of any note you've taken.",
        href: "/templates/text-summarizer",
        comingSoon: false,
    },
    {
        title: "Text Revisor",
        description: "Grammar and spelling used to be very difficult but with the power of AI, you can check your content for mistakes.  Check out this AI tool for revising text!",
        href: "/templates/text-revisor",
        comingSoon: false,
    },
    {
        title: "Catchy Title Creator",
        description: "One of the most difficult parts of creating art is coming up with a good title that will resonate with people.  Use this catchy title creator to always peek viewers' interest in your finest work.",
        href: "/templates/catchy-title-creator",
        comingSoon: false,
    },
    {
        title: "Cover Letter",
        description: "Need to land that dream job but they require a cover letter?  Have no fear, AI is here.  Use this wonderful tool to help you craft the perfect cover letter so you can progress in your career.",
        href: "/templates/catchy-title-creator",
        comingSoon: true,
    },
    {
        title: "Many More Coming Soon",
        description: "We are constantly coming up with new amazing features to help you with your AI needs.  Subscribe to our mailing list to get notified of new features.",
        href: "",
        comingSoon: true
    }
]


const TemplateCard = ({ href, title, description, comingSoon }: TemplateObj) => {
    const [open, setOpen] = useState(false);
    let actionPhrase = comingSoon ? "Coming soon..." : "Try it out, today!"

    return <>
        <Link
            href={href}
            style={{ height: "100%", width: "100%" }}
            onClick={(e) => {
                if (comingSoon) {
                    e.preventDefault();
                    setOpen(true);
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


const Index = () => {
    return (
        <Layout>
            <Container>
                <Grid xs={12} sm={6} md={6} css={{ paddingLeft: "1em" }}>
                    <Text
                        h1
                        css={{
                            color: "$colors$primary"
                        }}>Check out our new and upcoming AI templates,<br /> just for you!</Text>
                </Grid>
                <Grid.Container gap={3}>
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

export default Index;