const mulaiUjian = document.querySelector(".mulaiujian")
const tidak = document.querySelector('.tidak')
const popup = document.querySelector(".float")

mulaiUjian.addEventListener('click', () => {
    popup.classList.add("appear")
})

tidak.addEventListener('click', () => {
    popup.classList.remove('appear')
})