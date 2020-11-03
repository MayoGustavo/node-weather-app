console.log('Client side java script file is loaded!')

const weatherForm = document.querySelector('form')
const inputElement = document.querySelector('input')
const messageOne = document.getElementById("message1")
const messageTwo = document.getElementById("message2")

weatherForm.addEventListener('submit', (e) => {

    messageOne.textContent = "Searching..."
    messageTwo.textContent = ""
    e.preventDefault()
  
    const url='http://localhost:3000/weather?address='+inputElement.value

    fetch(url).then((response) => {
        response.json().then((data) => {
            
            if (data.error)
            {
                messageOne.textContent = data.error
            }
            else
            {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})