import { type Props as InputProps } from '@nextui-org/react/types/input/input-props'

declare module '@nextui-org/react/types/input/input-props' {
  export interface Props extends Omit<InputProps, 'label'> {
    label: string | JSX.Element
  }
}
