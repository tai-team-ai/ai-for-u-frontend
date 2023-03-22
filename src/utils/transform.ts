

export function placeholderDefault(input: HTMLInputElement) {
    if(input.value === "") {
        return input.placeholder;
    }
    return input.value;
}