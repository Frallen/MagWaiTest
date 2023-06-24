import "@/assets/styles/main.scss";
import {checkModalForm, clearErrors, clearForm, stateModal, useAlert} from "./composables/mixins.ts";
import {postType} from "./types/global.types.ts";

import axios from "axios";

const hamburger = document.querySelector(".navbar-hamburger") as HTMLDivElement
const mobile = document.querySelector(".navbar") as HTMLDivElement
const loadMore = document.querySelector(".loadMore") as HTMLDivElement
const modal = document.querySelector(".modal") as HTMLDivElement
const modalClose = modal.querySelector(".modal-wrapper-header .icon") as HTMLDivElement
const buttonCall = document.querySelectorAll(".call-me")
const formCallBack = document.querySelector(".callback-form") as HTMLFormElement

let Posts: postType[] = []
let CurrentPage = 0

buttonCall.forEach(p => {
    p.addEventListener("click", () => {
        stateModal(true, modal, "visible");
    })
})

modalClose.addEventListener("click", () => {
    stateModal(false, modal, "visible");
    clearForm(formCallBack)
})
formCallBack.querySelectorAll("input").forEach(p => clearErrors(p))

formCallBack.addEventListener("submit", (e) => {
    const email = formCallBack.querySelector("#email") as HTMLInputElement
    const name = formCallBack.querySelector("#name") as HTMLInputElement
    e.preventDefault()
    if (checkModalForm(name, email)) {
        modalClose.click()
        useAlert(true, "Заявка создана!", "Ожидайте звонка.")
    }
})


hamburger.addEventListener("click", (e) => {
    if ((e.currentTarget as HTMLDivElement).classList.contains("opened")) {
        (e.currentTarget as HTMLDivElement).classList.remove("opened");
        stateModal(false, mobile, "visible-nav");

    } else {
        (e.currentTarget as HTMLDivElement).classList.add("opened");
        stateModal(true, mobile, "visible-nav")
    }
})
const useRender = () => {
    const wrapper = document.querySelector(".post-wrapper") as HTMLDivElement
    Posts.forEach(p => {
        wrapper.insertAdjacentHTML("beforeend",
            `<div class="post-wrapper-item">
                    <div class="image">
                    <img src="/images/stopper.png" alt="">
                    </div>
                    <div class="box">
                    <div class="title box-item">
                    ${p.title}
                    </div>
                    <div class="subTitle box-item">
                    How to increase your productivity with a Music
                    </div>
                    <p class="text box-item">${p.body}</p>
                    <div class="date box-item">Posted by <span>userId:${p.userId}</span>, on July  24, 2019</div>
                    <a href="/" class="button button-primary">Continue reading</a>
                    </div>
                    </div>`
        )
    })

}
loadMore.addEventListener("click", async () => {
    CurrentPage = CurrentPage + 1
    await useFetch(CurrentPage)
})

const useFetch = async (page: number) => {
    try {
        const snap = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${page}&_limit=5`)
        Posts.push(...snap.data as postType[])
        Posts.length >= 30 && loadMore.classList.add("hide")
        useRender()
    } catch (e) {

    }

}
document.addEventListener("DOMContentLoaded", async () => await useFetch(CurrentPage))

