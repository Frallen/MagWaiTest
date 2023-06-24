//модалка
export const stateModal = (state: boolean, modal: HTMLDivElement): void => {

    if (state) {
        modal.classList.add("visible");
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "visible"
        modal.classList.remove("visible");
    }
};

