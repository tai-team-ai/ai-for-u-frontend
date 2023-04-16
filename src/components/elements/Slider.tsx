import styles from '@/styles/Slider.module.css'
import { useState } from 'react'

declare interface SliderProps {
  label?: string | JSX.Element | null
  required?: boolean
  name: string
  min: number
  max: number
  defaultValue: number
}

const Slider = ({ label = null, required = false, name, min, max, defaultValue }: SliderProps): JSX.Element => {
  const [value, setValue] = useState<number>(defaultValue)
  return <>
    <div className={styles.sliderWrapper}>
      <label className={styles.sliderLabel} htmlFor={name}>{label} ({value})</label>
      <input
        required={required}
        className={styles.sliderInput}
        name={name}
        id={name}
        min={min}
        max={max}
        type="range"
        defaultValue={defaultValue}
        onChange={(e) => { setValue(Number(e.target.value)) }}
      />
    </div>
  </>
}

export default Slider
