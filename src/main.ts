import "@/assets/styles/main.scss";
import {stateModal} from "./composables/mixins.ts";
import {postType} from "./types/global.types.ts";

import axios from "axios";

const hamburger = document.querySelector(".navbar-hamburger") as HTMLDivElement
const mobile = document.querySelector(".navbar") as HTMLDivElement
const loadMore = document.querySelector(".loadMore") as HTMLDivElement
let Posts: postType[] = []
let CurrentPage = 0
hamburger.addEventListener("click", (e) => {
    if ((e.currentTarget as HTMLDivElement).classList.contains("opened")) {
        (e.currentTarget as HTMLDivElement).classList.remove("opened");
        stateModal(false, mobile);

    } else {
        (e.currentTarget as HTMLDivElement).classList.add("opened");
        stateModal(true, mobile)
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
        console.log(Posts)
        Posts.length >= 30 && loadMore.classList.add("hide")
        useRender()
    } catch (e) {

    }

}
document.addEventListener("DOMContentLoaded", async () => await useFetch(CurrentPage))

