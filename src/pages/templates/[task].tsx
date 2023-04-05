import { GetServerSideProps } from "next";
import Layout from "@/components/layout/layout";
import Template from "@/components/layout/template";

import TemplateForm, {State, Reset} from "@/components/elements/TemplateForm"
import { getProps } from "@/utils/props";
import SwaggerParser from "swagger-parser";


declare type TemplateTaskProps = {
    task: string
    properties: any
    requiredList: string[];
    resets: {[key: string]: Reset};
}


const TemplateTask = ({task, properties, requiredList, resets}: TemplateTaskProps) => {
    return (
        <Layout>
            <Template exampleUrl={`/api/ai-for-u/${task}-examples`} resets={resets}>
                <TemplateForm task={task} properties={properties} requiredList={requiredList} resets={resets}/>
            </Template>
        </Layout>
    )
}


const getServerSideProps: GetServerSideProps = async (context) => {
    const {task} = context.query
    // @ts-ignore
    const openapi = await new SwaggerParser().dereference(`./openapi.json`)
    const path = openapi.paths[`/ai-for-u/${task}`];
    const schema = path.post.requestBody.content["application/json"].schema;
    const properties = schema.properties;
    const requiredList = schema.required;
    const resets: {[key: string]: Reset} = {}
    return {
        props: {
            task,
            properties,
            requiredList,
            resets,
        },
    }
}

export default TemplateTask;
export {getServerSideProps};
