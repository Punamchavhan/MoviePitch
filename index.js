const setupTextarea = document.getElementById('setup-textarea') 
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

const apiKey = "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"

const url= "https://api.openai.com/v1/completions"

document.getElementById("send-btn").addEventListener("click", () => {
  //if (setupTextarea.value) {
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
  //}
  fetchBotReplay()
})

function fetchBotReplay(){
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application.json',
      'Authorization': 'Bearer ${apiKey}'
    },
    body: JSON.stringify({
      'model': 'text-davinci-003',
      'promt': 'Give me an enthusiastic response in 5 words '
    })
  }).then(response => response.json()).then(data =>
    movieBossText.innerText = data.choices[0].text 
    )

}