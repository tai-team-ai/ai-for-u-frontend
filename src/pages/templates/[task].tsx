import { type GetServerSideProps } from 'next'
import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'

import TemplateForm, { type Reset } from '@/components/elements/TemplateForm'
import SwaggerParser from 'swagger-parser'

declare interface TemplateTaskProps {
  task: string
  properties: any
  requiredList: string[]
  resets: Record<string, Reset>
}

const TemplateTask = ({ task, properties, requiredList, resets }: TemplateTaskProps): JSX.Element => {
  return (
        <Layout>
            <Template exampleUrl={`/api/ai-for-u/${task}-examples`} resets={resets}>
                <TemplateForm task={task} properties={properties} requiredList={requiredList} resets={resets}/>
            </Template>
        </Layout>
  )
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const { task } = context.query
  // @ts-expect-error The SwaggerParser was written for vanilla js so it's types are weird.
  const openapi = await new SwaggerParser().dereference('./openapi.json')
  const path = openapi.paths[`/ai-for-u/${task as string}`]
  const schema = path.post.requestBody.content['application/json'].schema
  const properties = schema.properties
  const requiredList = schema.required
  const resets: Record<string, Reset> = {}
  return {
    props: {
      task,
      properties,
      requiredList,
      resets
    }
  }
}

export default TemplateTask
export { getServerSideProps }
