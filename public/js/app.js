

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    document.getElementById("message-1").style.color = '#333333'
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.getElementById("message-1").style.color = 'red'
                messageOne.textContent = (data.error)
                messageTwo.textContent = ''
                
            } else {
                document.getElementById("message-1").style.color = '#333333'
                messageOne.textContent = `${data.description}. Its ${data.temperature}\u00B0C in ${data.location}, ${data.region}, ${data.country}.`
                messageTwo.textContent = `Feelslike: ${data.feelslike}\u00B0C`
            }
        })
    })


    


})