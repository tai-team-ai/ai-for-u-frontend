import { GetServerSideProps } from "next";
import Layout from "@/components/layout/layout";
import SwaggerParser from "swagger-parser";
import Input from "@/components/elements/Input";
import Textarea from "@/components/elements/Textarea";
import Checkbox from "@/components/elements/Checkbox"
import { ChangeEvent, useState, useEffect, useRef, RefObject } from "react";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Dropdown from "@/components/elements/Dropdown";
import Template from "@/components/layout/template";

import TemplateForm, {State} from "@/components/elements/TemplateForm"


declare type TemplateTaskProps = {
    task: string
    openapi: any
}


const TemplateTask = ({task, openapi}: TemplateTaskProps) => {
    const schema = openapi.paths[`/ai-for-u/${task}`].post.requestBody.content["application/json"].schema;
    const properties = schema.properties;
    const requiredList: string[] = schema.required;

    const state: {[key: string]: State} = {}

    return (
        <Layout>
            <Template exampleUrl={`/api/ai-for-u/${task}-examples`} state={state}>
                <TemplateForm properties={properties} requiredList={requiredList} state={state}/>
            </Template>
        </Layout>
    )
}


const getServerSideProps: GetServerSideProps =  async (context) => {
    const {task} = context.query
    // @ts-ignore
    const openapi = await new SwaggerParser().dereference(`./openapi.json`)
    return {
        props: {
            task,
            openapi
        },
    }
}

export default TemplateTask;
export {getServerSideProps};
