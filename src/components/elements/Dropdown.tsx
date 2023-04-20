import { type CSS, Dropdown as NextUIDropdown } from '@nextui-org/react'
import { useMemo } from 'react'
import InfoPopover from './InfoPopover'

declare interface DropdownProps {
  name?: string
  initialSelection?: string
  validSelections?: string[]
  selectionMode?: 'single' | 'multiple'
  id?: string
  label?: string | JSX.Element | null
  tooltip?: string
  css?: CSS | null
  selected: string[]
  setSelected: (v: string[]) => void
}

const Dropdown = ({ id = '', name = '', initialSelection = '', validSelections = [], selectionMode = 'single', label = null, tooltip = '', css = null, selected, setSelected }: DropdownProps): JSX.Element => {
  const selectedValue = useMemo(() => Array.from(selected).join(', ').replaceAll('_', ' '), [selected])
  if (selected === undefined || selected === null) {
    selected = []
  } else if (!Array.isArray(selected)) {
    selected = [selected]
  }
  for (let i = 0; i < selected.length; i++) {
    // check if undefined or null
    if (selected[i] !== null && selected[i] !== undefined) {
      selected[i] = selected[i].toString()
    }
  }
  return (
        <>
            <label style={{ display: 'block' }} htmlFor={id}>{label} <InfoPopover text={tooltip}/></label>
            <NextUIDropdown >
            <NextUIDropdown.Button
              color="primary"
              css={{
                textTransform: 'capitalize',
                marginBottom: '0.4rem',
                ...css
              }}
              flat
          >
              <div // THis div is necessary to truncate the text and prevent teh button overflowing the screen
                  style={{
                    overflow: 'hidden',
                    maxWidth: 'calc(min(35vw, 15rem))',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
              >
                  {selectedValue}
              </div>
                </NextUIDropdown.Button>
                <NextUIDropdown.Menu
                    disallowEmptySelection
                    selectionMode={selectionMode}
                    selectedKeys={selected.slice(0) === undefined ? [] : selected.slice(0)}
                    // @ts-expect-error the selected keys resolve to strings in this kase.
                    onSelectionChange={setSelected}
                >
                    {Object.entries(validSelections).map(([key, val]) => {
                      return <NextUIDropdown.Item css={{ textTransform: 'capitalize' }} key={val}>{val}</NextUIDropdown.Item>
                    })}
                </NextUIDropdown.Menu>
            </NextUIDropdown>
            <input data-type="dropdown" placeholder={initialSelection} hidden id={id} name={name} value={selectedValue}/>
    </>
  )
}

export default Dropdown
