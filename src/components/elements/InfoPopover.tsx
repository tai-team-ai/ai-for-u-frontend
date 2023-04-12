import { Popover, Text } from '@nextui-org/react'

interface InfoPopoverProps {
  text: string
}

const InfoPopover = ({ text }: InfoPopoverProps): JSX.Element => {
  if (text.trim().length === 0) {
    return <></>
  }
  return <Popover>
        <Popover.Trigger>
            <Text span style={{ cursor: 'pointer' }}>&#9432;</Text>
        </Popover.Trigger>
        <Popover.Content>
            <Text css={{ p: '$10' }}>{text}</Text>
        </Popover.Content>
    </Popover>
}

export default InfoPopover
