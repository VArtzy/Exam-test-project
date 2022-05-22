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

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function reset() {
    if(confirm('Yakin ingin mereset ujian?')) {
        eraseCookie('nilai')
        location.href = './index.html'
    }
}

const nilai = getCookie('nilai')

const nilaiText = document.querySelector('#nilai');
const peringkatText = document.querySelector('#peringkat')

if(nilai) {
console.log(nilai)

nilaiText.textContent = nilai

if(nilai == 0) peringkatText.textContent = 'Idiot'
if(nilai == 100) peringkatText.textContent = 'Amatir'
if(nilai == 200) peringkatText.textContent = 'Semenjana'
if(nilai == 300) peringkatText.textContent = 'Normal'
if(nilai == 400) peringkatText.textContent = 'Programmer'
if(nilai == 500) peringkatText.textContent = 'Istimewa'

} else {
    alert('Mneer gaikut ujian gausah sok sok kesini ya...')
    location.href = './index.html'
}