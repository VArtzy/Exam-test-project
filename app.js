function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const nilai = getCookie('nilai')

if(nilai) {
    alert('Anda sudah mengikuti ujian, jika ingin mengikuti kembali silahkan reset di halaman penilaian')
    location.href = './penilaian.html'
}

const mulaiUjian = document.querySelector(".mulaiujian")
const tidak = document.querySelector('.tidak')
const popup = document.querySelector(".float")

mulaiUjian.addEventListener('click', () => {
    popup.classList.add("appear")
})

tidak.addEventListener('click', () => {
    popup.classList.remove('appear')
})