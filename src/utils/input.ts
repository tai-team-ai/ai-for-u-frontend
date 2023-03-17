
interface UpdateInputProps {
    selector: string;
    value: any
    update: any
}

export function updateInput({selector, value, update}: UpdateInputProps) {
    if(typeof document === "undefined") {
        return;
    }
    const input: HTMLInputElement|null = document.querySelector(selector);
    if(input) {
        input.value = String(value);
        update(value);
    }
}