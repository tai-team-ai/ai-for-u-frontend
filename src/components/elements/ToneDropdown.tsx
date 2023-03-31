import {Dropdown} from "@nextui-org/react"
import InfoPopover from "./InfoPopover";


const toneItems = {
    'friendly': 'Friendly',
    'formal': "Formal",
    'informal': "Informal",
    'optimistic': "Optimistic",
    'worried': "Worried",
    'curious': "Curious",
    'assertive': "Assertive",
    'encouraging': "Encouraging",
    'surprised': "Surprised",
    'cooperative': "Cooperative",
};

export type ValidTones = keyof typeof toneItems


declare type ToneDropdownProps = {
    selectedTone: ValidTones
    setSelectedTone: (v: ValidTones) => void;
    tooltip?: string
}


const ToneDropdown = ({selectedTone, setSelectedTone, tooltip = ""}: ToneDropdownProps) => {
    return (
        <>
            <label style={{ display: "block" }} htmlFor="tone">Tone <InfoPopover text={tooltip}/></label>
            <Dropdown>
                <Dropdown.Button flat id="tone">{toneItems[selectedTone]}</Dropdown.Button>
                <Dropdown.Menu
                    disallowEmptySelection
                    selectionMode="single"
                    aria-label="Tone"
                    selectedKeys={[selectedTone]}
                    onSelectionChange={(t) => {
                        setSelectedTone((t as any).currentKey as ValidTones)
                }}>
                    {Object.entries(toneItems).map(([key, val]) => (
                        <Dropdown.Item key={key}>{val}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
    </>
    )
}

export default ToneDropdown;
