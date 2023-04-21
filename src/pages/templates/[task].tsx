import Layout from '@/components/layout/layout'
import Template, { type ExampleObject } from '@/components/layout/template'
import { type GetStaticPaths, type GetStaticProps } from 'next'
import TemplateForm, { type Reset } from '@/components/elements/TemplateForm'
import SwaggerParser from '@apidevtools/swagger-parser'
import { useRouter } from 'next/router'
import { templateObjects } from '@/utils/constants'

declare interface TemplateTaskProps {
  openapi: any
  examples: any
}

const TemplateTask = ({ openapi, examples }: TemplateTaskProps): JSX.Element => {
  const router = useRouter()
  const { task } = router.query
  const path = openapi.paths[`/ai-for-u/${task as string}`]
  const schema = path.post.requestBody.content['application/json'].schema
  const properties = schema.properties
  const requiredList = schema.required
  const resets: Record<string, Reset> = {}

  return (
        <Layout>
          <Template examples={examples} resets={resets}>
            <TemplateForm task={task as string} properties={properties} requiredList={requiredList} resets={resets}/>
          </Template>
        </Layout>
  )
}

declare interface StaticProps {
  props: TemplateTaskProps
}

export const getStaticProps: GetStaticProps<TemplateTaskProps> = async ({ params }): Promise<StaticProps> => {
  const examples: ExampleObject[] = []
  if (typeof params !== 'undefined') {
    const task = params.task
    const rawExamples = await (await (await fetch(`${process.env.API_URL as string}/ai-for-u/${task as string}-examples`)).json())
    console.log(rawExamples)
    for (let i = 0; i < rawExamples.exampleNames.length; i++) {
      examples.push({
        name: rawExamples.exampleNames[i],
        example: rawExamples.examples[i]
      })
    }
  }
  const raw = await (await fetch(`${process.env.API_URL as string}/ai-for-u/openapi.json`)).json()
  const openapi = await SwaggerParser.dereference(raw)
  return {
    props: {
      openapi,
      examples
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: templateObjects.filter(value => value.href.length > 0).map(value => value.href),
    fallback: false
  }
}

export default TemplateTask
