console.log('Javascript file is loaded')


const form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#Temperature-1')
const msg2 = document.querySelector('#Temperature-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    msg1.textContent = 'Loading'
    msg2.textContent = ''
    fetch(`https://3000-eff7d572-5a92-4f20-8051-981c6b452af2.ws-ap0.gitpod.io/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                return msg1.textContent = data.error
            }
            msg1.textContent = data.foreCast
            msg2.textContent = data.location
            console.log(data)
        })
    })
    .catch((error) => {
        console.log('Cannot connect')
    })
})