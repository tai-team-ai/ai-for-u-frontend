import Input from './Input'
import Textarea from './Textarea'
import Dropdown from './Dropdown'
import { Checkbox, Button, Loading, Text } from '@nextui-org/react'
import LoginModal from '../modals/LoginModal'
import GoProModal from '../modals/GoProModal'
import { useState } from 'react'
import { uFetch } from '@/utils/http'
import { useSession } from 'next-auth/react'
import { type ResponseProps } from '../modals/FeedbackModal'
import { ResultBox } from '../layout/template'
import Markdown from 'markdown-to-jsx'
import { ShowDiffBtn } from './diffview'
import { showSnackbar } from './Snackbar'
// import Slider from './Slider'
import { Slider } from '@mui/material'

export declare interface State {
  setValue: (v: any) => void
}

declare interface TemplateFormProps {
  task: string
  properties: any
  requiredList: string[]
  resets: Record<string, Reset>
  dataToChildren?: ((v: any) => JSX.Element) | null
}

declare interface ResultChildrenProps {
  task: string
  data: any
  body: any
}

const ResultChildren = ({ task, data, body }: ResultChildrenProps): JSX.Element => {
  if (task === 'text-revisor') {
    return <>
            {data.revisedTextList.map((text: string, index: number) => <>
                <Text b>{`Revision ${index + 1}: `}</Text>
                <Markdown>{text}</Markdown>
                <ShowDiffBtn oldValue={body.textToRevise} newValue={text} />
            </>)}
        </>
  } else if (task === 'catchy-title-creator') {
    return <>
            <Text h3>Titles</Text>
            <ul>
                {data.titles.map((title: string) => {
                  return <>
                        <li><Markdown>{title}</Markdown></li>
                    </>
                })}
            </ul>
        </>
  } else if (task === 'cover-letter-writer') {
    return <>
            <Markdown>{data.coverLetter}</Markdown>
        </>
  } else if (task === 'text-summarizer') {
    return <>
            <Markdown>{data.summary}</Markdown>
        </>
  } else {
    return <>
            <Markdown>{JSON.stringify(data)}</Markdown>
        </>
  }
}

const jsonTypeToInputType = (jsonType: string): ('text' | 'number' | undefined) => {
  if (jsonType === 'string') {
    return 'text'
  } else if (jsonType === 'integer') {
    return 'number'
  }
  return undefined
}

export declare interface Reset {
  value: any
  setValue: (v: any) => void
  default: any
}

const TemplateForm = ({ task, properties, requiredList, resets }: TemplateFormProps): JSX.Element => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState<boolean>(false)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [responseProps, setResponseProps] = useState<ResponseProps>({
    aiToolEndpointName: '',
    userPromptFeedbackContext: {},
    aiResponseFeedbackContext: {}
  })
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [loginMessage, setLoginMessage] = useState<string>('')
  const [children, setChildren] = useState<JSX.Element>(<></>)

  const transforms: Record<string, (v: any) => any> = {}

  return (<>
        <form
            onSubmit={
                (e) => {
                  e.preventDefault()
                  setLoading(true)
                  const formData = new FormData(e.target as HTMLFormElement)
                  const body = Object.fromEntries(Array.from(formData.entries()).map(([key, val]: any) => [key, transforms[key](val)]))

                  void uFetch(`/api/ai-for-u/${task}`, { session, method: 'POST', body: JSON.stringify(body) })
                    .then(response => {
                      if (response.status === 200) {
                        void response.json().then(data => {
                          setResponseProps({ aiResponseFeedbackContext: data, aiToolEndpointName: task, userPromptFeedbackContext: body })
                          setChildren(<ResultChildren body={body} data={data} task={task} />)
                          setLoading(false)
                          setShowResult(true)
                        })
                      } else if (response.status === 429) {
                        void response.json().then(message => {
                          setLoginMessage(message.message)
                          setShowLogin(true)
                          setLoading(false)
                        })
                      } else {
                        void response.text().then(message => {
                          showSnackbar(message)
                          setLoading(false)
                        })
                      }
                    })
                }
            }
            onReset={
                (e) => {
                  const checkboxes: NodeListOf<HTMLInputElement> = e.currentTarget.querySelectorAll('input[type=checkbox]')
                  checkboxes.forEach((box) => {
                    if (box.checked) {
                      box.click()
                    }
                  })
                  for (const reset of Object.values(resets)) {
                    reset.setValue(reset.default)
                  }
                  setShowResult(false)
                }
            }
        >
            {
                Object.entries(properties).map(([title, property]: any) => {
                  const required = requiredList.includes(title)
                  const label = <>
                        <span>{property.title}<span style={{ color: 'red' }}>{required ? '*' : ''}</span></span>
                    </>
                  const inputProps = {
                    required,
                    name: title,
                    id: title,
                    type: jsonTypeToInputType(property.type),
                    fullWidth: true,
                    minLength: property.minLength,
                    maxLength: property.maxLength,
                    min: property.minimum | 0,
                    max: property.maximum,
                    label
                  }
                  if (title === 'creativity') {
                    transforms[title] = Number
                    const [creativity, setCreativity] = useState<number>(property.default)
                    resets[title] = { value: creativity, setValue: setCreativity, default: property.default }
                    return <>
                        <label htmlFor={title}>{label}</label>
                        <Slider
                            id={title}
                            name={title}
                            color="secondary"
                            step={1}
                            valueLabelDisplay="auto"
                            onChange={(e, val) => { setCreativity(val as number) }}
                            value={creativity}
                        />
                    </>
                  }
                  if (property.type === 'string') {
                    transforms[title] = String
                    if (typeof property.maxLength !== 'undefined' && property.maxLength <= 200) {
                      return <Input {...inputProps} />
                    }
                    // @ts-expect-error there seems to be some required props on textarea that aren't really required.
                    return <Textarea {...inputProps} />
                  }
                  if (property.type === 'integer') {
                    transforms[title] = Number
                    return <Input {...inputProps} />
                  }
                  if (property.type === 'boolean') {
                    transforms[title] = Boolean
                    // @ts-expect-error The checkbox component usually doesn't allow Elements in the label but it supports it.
                    return <Checkbox size="sm" {...inputProps} />
                  }
                  const dropdownProps = {
                    id: title,
                    name: title,
                    label
                  }
                  if (typeof property.allOf !== 'undefined') {
                    transforms[title] = String
                    const [selected, setSelected] = useState([property.default])
                    resets[title] = { value: selected, setValue: setSelected, default: [property.default] }
                    return <Dropdown {...dropdownProps} validSelections={property.allOf[0].enum} selectionMode="single" selected={selected} setSelected={setSelected} />
                  }
                  if (property.type === 'array' && typeof property.items.enum !== 'undefined') {
                    transforms[title] = v => v.split(', ')
                    const [selected, setSelected] = useState(property.default)
                    resets[title] = { value: selected, setValue: setSelected, default: property.default }
                    return <Dropdown {...dropdownProps} validSelections={property.items.enum} selectionMode="multiple" selected={selected} setSelected={setSelected} />
                  }
                  if (property.type === 'array') {
                    transforms[title] = v => v.split(',').map((v: string) => v.trim())
                    return <Input {...inputProps}/>
                  }
                  return null
                })
            }
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '1em' }}>
                <Button
                    light
                    color="error"
                    type="reset"
                >Reset</Button>
                <Button
                    flat
                    type="submit"
                    disabled={loading}
                >{loading ? <Loading type="points" /> : 'Submit'}
                </Button>
            </div>
            <ResultBox showResult={showResult} loading={loading} responseProps={responseProps} >
                {children}
            </ResultBox>
        </form>
        {session !== null
          ? <GoProModal
          bindings={{
            open: showLogin,
            onClose: () => { setShowLogin(false) }
          }}
          />
          : <LoginModal
          open={showLogin}
          setOpen={setShowLogin}
          isSignUp={true}
          message={loginMessage}
        />
        }
        </>)
}

export default TemplateForm
