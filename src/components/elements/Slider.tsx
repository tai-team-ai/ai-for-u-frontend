import styles from '@/styles/Slider.module.css'

declare interface SliderProps {
  label?: string | JSX.Element | null
  required?: boolean
  name: string
  min: number
  max: number
  value: number
  setValue: (v: number) => void
}

const Slider = ({ label = null, required = false, name, min, max, value, setValue }: SliderProps): JSX.Element => {
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
        defaultValue={value}
        onChange={(e) => { setValue(Number(e.target.value)) }}
      />
    </div>
  </>
}

export default Slider
