import { type CSS, Dropdown as NextUIDropdown, Text } from '@nextui-org/react'
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
            <Text css={{ truncateText: 'calc(min(35vw, 15rem))' }}>{selectedValue}</Text>
                </NextUIDropdown.Button>
                <NextUIDropdown.Menu
                    disallowEmptySelection
                    selectionMode={selectionMode}
                    selectedKeys={selected}
                    // @ts-expect-error the selected keys resolve to strings in this case.
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
