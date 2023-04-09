import styles from "@/styles/Snackbar.module.css";


const showSnackbar = (message: string, milliseconds: number = 3000) => {
    const snackbar = document.querySelector(`.${styles.snackbar}`);
    if (snackbar) {
        snackbar.textContent = message;
        snackbar.removeAttribute("hidden");
        snackbar.classList.add(styles.show);
        setTimeout(() => {
            snackbar.classList.remove("show");
            snackbar.setAttribute("hidden", "");
            snackbar.textContent = "";
        }, milliseconds);
    }
}

const Snackbar = () => {
    return (
        <div className={styles.snackbar} hidden></div>
    )
}

export default Snackbar;
export { showSnackbar };