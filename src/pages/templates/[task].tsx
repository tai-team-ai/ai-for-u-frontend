import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'

import TemplateForm, { type Reset } from '@/components/elements/TemplateForm'
import SwaggerParser from '@apidevtools/swagger-parser'
import { useSession } from 'next-auth/react'
import { uFetch } from '@/utils/http'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const TemplateTask = (): JSX.Element => {
  const { data: session } = useSession()

  const fetcher = async (url: string): Promise<any> => await uFetch(url, { session }).then(async res => await SwaggerParser.dereference(await res.json()))
  const { data, error, isLoading } = useSWR('/api/ai-for-u/openapi.json', fetcher)

  if (error != null) return <Layout><h1>{JSON.stringify(error)}</h1></Layout>
  if (isLoading) return <Layout><h1>Loading...</h1></Layout>
  const router = useRouter()
  const { task } = router.query
  const path = data.paths[`/ai-for-u/${task as string}`]
  const schema = path.post.requestBody.content['application/json'].schema
  const properties = schema.properties
  const requiredList = schema.required
  const resets: Record<string, Reset> = {}

  return (
        <Layout>
          <Template exampleUrl={`/api/ai-for-u/${task as string}-examples`} resets={resets}>
            <TemplateForm task={task as string} properties={properties} requiredList={requiredList} resets={resets}/>
          </Template>
        </Layout>
  )
}

export default TemplateTask
