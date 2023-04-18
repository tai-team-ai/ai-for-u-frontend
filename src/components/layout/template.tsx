import styles from '@/styles/Template.module.css'
import { Card, Grid, Text, Loading, Dropdown } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { type FormEventHandler, type PropsWithChildren, useEffect, useRef, useState } from 'react'
import { getExamples } from '@/utils/user'
import { RateResponse, type ResponseProps } from '../modals/FeedbackModal'
import { type Reset } from '@/components/elements/TemplateForm'

interface ExampleObject {
  name: string
  example: any
}

interface ExampleProps {
  example: any
  fillExample: ((e: any) => void) | null
}

const Example = ({ example, fillExample, ...props }: PropsWithChildren<ExampleProps>): JSX.Element => {
  return (
        <>
            <Card
                isPressable
                isHoverable
                className={styles['template-card']}
                disableRipple={true} // if this page is turned into a single page app, then we'd want to enable this again
                css={{ $$cardColor: '$colors$secondaryLight', color: '$colors$secondaryLightContrast', marginRight: '1rem' }}
                onPress={() => { if (fillExample !== null) fillExample(example) }}
            >
                <Card.Body css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        size="$1xl"
                        weight="semibold"
                        css={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                        color="$colors$secondaryText" >
                        {props.children}
                    </Text>
                </Card.Body>
            </Card>
        </>
  )
}

interface ResultBoxProps {
  showResult: boolean
  loading: boolean
  responseProps: ResponseProps
}

export function ResultBox ({ showResult, loading, responseProps, children }: PropsWithChildren<ResultBoxProps>): JSX.Element {
  return (
        <>
            {
                showResult && !loading
                  ? <>
                        <div className={styles['result-box']}>
                            {children}
                        </div>
                        <RateResponse {...responseProps} />
                    </>
                  : null
            }
        </>
  )
}

declare interface ExamplesProps {
  examples: ExampleObject[]
  fillExample: (e: any) => void
}

const Examples = ({ examples, fillExample }: ExamplesProps): JSX.Element => {
  return (
        <section className={styles['example-section']}>
            <Text h2 className={styles['example-header']}>
                Examples
            </Text>
            <div className={styles.examples}>
                <Grid.Container gap={1} justify='flex-start' css={{ justifyContent: 'center' }}>
                    {
                        examples.length > 0
                          ? examples.map((example) => {
                            return <Example
                                    example={example.example}
                                    fillExample={fillExample}>
                                    {example.name}
                                </Example>
                          })
                          : <Text span>Loading Examples <Loading type="points" /></Text>
                    }
                </Grid.Container>
            </div>
        </section>
  )
}

const ExampleDropdown = ({ examples, fillExample }: ExamplesProps): JSX.Element => {
  return (
        <Dropdown>
            <Dropdown.Button css={{ width: '100%', fontSize: '1.2rem' }} size={'md'} flat color='secondary' >Examples</Dropdown.Button>
            <Dropdown.Menu css={{ height: '100%' }}
                onAction={(key) => {
                  fillExample(examples[key as number].example)
                }}
            >
                {examples.map((example, index) => {
                  return <Dropdown.Item key={index} variant="flat" color="secondary">{example.name}</Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
  )
}

interface TemplateProps {
  isSandbox?: boolean
  children?: React.ReactNode
  exampleUrl?: string | null
  fillExample?: ((e: any) => void) | null
  handleSubmit?: FormEventHandler | null
  resultBox?: JSX.Element | null
  resets?: Record<string, Reset> | null
}

export default function Template ({ isSandbox = false, children = null, exampleUrl = null, fillExample = null, resultBox = null, resets = null }: TemplateProps): JSX.Element {
  const { data: session } = useSession()
  const [examples, setExamples] = useState<ExampleObject[]>([])
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  if (typeof exampleUrl !== 'undefined' && exampleUrl !== null && !loading) {
    setLoading(true)
    void getExamples(session, exampleUrl)
      .then(data => {
        if (typeof data.exampleNames !== 'undefined') {
          for (let i = 0; i < data.exampleNames.length; i++) {
            examples.push({
              name: data.exampleNames[i],
              example: data.examples[i]
            })
          }
          setExamples([...examples])
        }
      })
  }

  if (fillExample == null) {
    fillExample = (example) => {
      for (const key of Object.keys(example)) {
        const target: HTMLInputElement | null = document.querySelector(`input#${key},textarea#${key}`)
        if (target != null) {
          if (target.type === 'checkbox' && target.checked !== example[key]) {
            target.click()
          }
          target.value = example[key]
        }

        if ((resets != null) && typeof resets[key] !== 'undefined') {
          if (typeof example[key] === 'string') {
            resets[key].setValue([example[key]])
          } else {
            resets[key].setValue(example[key])
          }
        }
      }
    }
  }

  const resizeChat = (): void => {
    if (!isSandbox || (sectionRef.current == null)) return

    sectionRef.current.style.height = '0px'
    const chatRect = sectionRef.current.getBoundingClientRect()
    const initialHeight = chatRect.height
    const sectionTop = chatRect.top
    const footerTop = document.getElementsByTagName('footer')[0].getBoundingClientRect().top

    const newHeight = footerTop - sectionTop - 24
    if (newHeight > initialHeight) {
      sectionRef.current.style.height = `${newHeight}px`
    }
  }

  useEffect(() => {
    window.addEventListener('resize', resizeChat)

    return () => {
      window.removeEventListener('resize', resizeChat)
    }
  })

  useEffect(() => {
    resizeChat()
  }, [])

  return (
        <Grid.Container gap={1} direction="row-reverse" css={{ position: 'relative' }}>
            <Grid sm={0} xs={12} >
                <ExampleDropdown examples={examples} fillExample={fillExample}></ExampleDropdown>
                {/* {<Examples examples={examples} fillExample={fillExample}></Examples>} */}
            </Grid>
            <Grid sm={9} xs={12}>
                <section ref={sectionRef} className={`${styles.content} ${isSandbox ? styles.sandbox : ''}`}>
                    {children}
                    {resultBox}
                </section>
            </Grid>
            <Grid sm={3} xs={0}>
                {<Examples examples={examples} fillExample={fillExample}></Examples>}
            </Grid>
        </Grid.Container>
  )
}
