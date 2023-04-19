import Input from './Input'
import Textarea from './Textarea'
import Dropdown from './Dropdown'
import styles from '@/styles/TemplateForm.module.css'
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
import { Slider } from '@mui/material'
import { getTokenExhaustedCallToAction } from '@/utils/user'
import { colors } from '@/components/layout/layout'

// const camelToTitle = (camel: string): string => {
//   const reuslt = camel.replace(/([A-Z])/g, ' $1')
//   return reuslt.charAt(0).toUpperCase() + reuslt.slice(1)
// }

function range (start: number, stop: number | null = null): number[] {
  if (stop == null) {
    stop = start
    start = 0
  }
  return Array.from({ length: stop - start }, (_, index) => index + start)
}

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
  const [showGoPro, setShowGoPro] = useState<boolean>(false)
  const [callToActionMessage, setCallToActionMessage] = useState<string>('')
  const [children, setChildren] = useState<JSX.Element>(<></>)

  const transforms: Record<string, (v: any) => any> = {}

  function hexToRGBA (hex: string, alpha: number): string {
    const match = hex.match(/\w\w/g)
    if (match !== null) {
      const [r, g, b] = match.map((x: string) => parseInt(x, 16))
      return `rgba(${r},${g},${b},${alpha})`
    }
    return ''
  }

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
                          setShowResult(true)
                        })
                      } else if (response.status === 429) {
                        void response.json().then(message => {
                          const isUserLoggedIn = session !== null
                          setCallToActionMessage(getTokenExhaustedCallToAction(isUserLoggedIn))
                          if (isUserLoggedIn) {
                            setShowGoPro(true)
                          } else {
                            setShowLogin(true)
                          }
                        })
                      } else {
                        void response.text().then(message => {
                          showSnackbar(message)
                        })
                      }
                    })
                    .finally(() => {
                      setLoading(false)
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
                    label,
                    tooltip: property.description
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
                            step={5}
                            min={0}
                            max={100}
                            sx={{
                              color: colors.primaryLightHover,
                              '& .MuiSlider-thumb': {
                                '&:hover': {
                                  boxShadow: `0px 0px 0px 8px ${hexToRGBA(
                                    colors.secondaryLightContrast,
                                    0.16
                                  )}`
                                }
                              }
                            }}
                            marks={[
                              { value: 0, label: '0' },
                              { value: 100, label: '100' }
                            ]}
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
                  if (property.type === 'boolean') {
                    transforms[title] = Boolean
                    // @ts-expect-error The checkbox component usually doesn't allow Elements in the label but it supports it.
                    return <Checkbox css={{ marginBottom: '0.4rem', marginTop: '0.4rem' }} size="sm" {...inputProps} color='secondary'/>
                  }
                  const dropdownProps = {
                    id: title,
                    name: title,
                    label,
                    tooltip: property.description
                  }
                  if (property.type === 'integer') {
                    transforms[title] = Number
                    const [selected, setSelected] = useState([property.default])
                    resets[title] = { value: selected, setValue: (v: any) => { setSelected([v]) }, default: property.default }
                    return <Dropdown {...dropdownProps} validSelections={range(property.minimum, property.maximum).map(String)} selectionMode="single" selected={selected} setSelected={setSelected} />
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
                    className={styles['reset-button']}
                >Reset</Button>
                <Button
                    flat
                    type="submit"
                    disabled={loading}
                    className={styles['submit-button']}
                >{loading ? <Loading type="points" /> : 'Submit'}
                </Button>
            </div>
            <ResultBox showResult={showResult} loading={loading} responseProps={responseProps} >
                {children}
            </ResultBox>
        </form>
        <GoProModal
          open={showGoPro}
          message={callToActionMessage}
          setOpenState={setShowGoPro}
        />
        <LoginModal
          open={showLogin}
          setOpenState={setShowLogin}
          signUp={true}
          message={callToActionMessage}
        />
        </>)
}

export default TemplateForm
