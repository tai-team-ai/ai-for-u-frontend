import { Tooltip, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'

interface InfoPopoverProps {
  text: string
}

const InfoPopover = ({ text }: InfoPopoverProps): JSX.Element => {
  if (text.trim().length === 0) {
    return <></>
  }
  return <Tooltip arrow disableFocusListener title={text}>
        <IconButton><Info fontSize="small"/></IconButton>
    </Tooltip>
}

export default InfoPopover
