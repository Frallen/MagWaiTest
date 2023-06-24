import validator from "validator/es";
import Swal from "sweetalert2";

//модалка
export const stateModal = (state: boolean, modal: HTMLDivElement, className: string): void => {
    if (state) {
        modal.classList.add(className);
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = className
        modal.classList.remove(className);
    }
};

// валидация
export const checkModalForm = (name: HTMLInputElement, email: HTMLInputElement,) => {
    switch (true) {
        case name && !validator.isLength(name.value, {min: 3}): {
            addError(name, "Введите имя");
            break;
        }
        case !validator.isEmail(email.value, {allow_utf8_local_part: false}): {
            addError(email, "example@email.com");
            break;
        }
        default:
            return true;
    }
};

//добавить ошибку
const addError = (elem: HTMLInputElement, placeHolder: string) => {
    elem.classList.add("invalid");
    elem.setAttribute("placeholder", placeHolder);
    elem.focus();
};


export const clearErrors = (item: HTMLInputElement): void => {

    item.addEventListener("input", () => {
        item.classList.contains("invalid") && item.classList.remove("invalid");
    });
}
//очитска полей
export const clearForm = (item: HTMLFormElement): void => {
    item.querySelectorAll("input").forEach(p => {
        (p as HTMLInputElement).value = ""
        p.classList.contains("invalid") && p.classList.remove("invalid");
    })
}
//уведомления
export const useAlert = async (success: boolean, title: string, text: string) =>
    await Swal.fire({
        icon: success ? "success" : "error",
        title: title,
        text: text,
        confirmButtonText: "Хорошо",
    });