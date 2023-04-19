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
  console.log(selectedValue)
  const maxLength = 50
  return (
        <>
            <label style={{ display: 'block' }} htmlFor={id}>{label} <InfoPopover text={tooltip}/></label>
            <NextUIDropdown >
                <NextUIDropdown.Button css={{ textTransform: 'capitalize', ...css }} flat>
                    {selectedValue.length > maxLength ? `${selectedValue.substring(0, maxLength)}...` : selectedValue}
                </NextUIDropdown.Button>
                <NextUIDropdown.Menu
                    disallowEmptySelection
                    selectionMode={selectionMode}
                    selectedKeys={selected}
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
