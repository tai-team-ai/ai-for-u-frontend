import { Tooltip, IconButton, Zoom } from '@mui/material'
import { InfoOutlined } from '@mui/icons-material'
import { isMobile } from '../../utils/hooks'

interface InfoPopoverProps {
  text: string
}

const InfoPopover = ({ text }: InfoPopoverProps): JSX.Element => {
  if (text.trim().length === 0) {
    return <></>
  }
  return <Tooltip arrow disableFocusListener title={text} enterTouchDelay={0} TransitionComponent={Zoom} followCursor placement={isMobile() ? 'top' : 'right'} leaveTouchDelay={2500}>
        <IconButton tabIndex={-1}><InfoOutlined sx={{ fontSize: 13, marginLeft: '-0.5rem', marginTop: '-0.5rem' }}/></IconButton>
    </Tooltip>
}

export default InfoPopover
