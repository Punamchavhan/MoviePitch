import { process } from './env'
import { Configuration, OpenAIApi } from 'openai'




const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')




const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
  const setupTextarea = document.getElementById('setup-textarea')
  if (setupTextarea.value) {
    const userInput = setupTextarea.value
  setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
  movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
  
  fetchBotReply(userInput)
  fetchSynopsis(userInput)
  }
})

async function fetchBotReply(outline) {
  const response = await openai.createCompletion({
    'model': 'text-davinci-003',
    'prompt': `generate a short message to enthusiastcally say "${outline}" sounds intresting and that you need some minutes to think about it. mention one aspect of sentense."`,
    'max_tokens': 60
  })
  movieBossText.innerText = response.data.choices[0].text.trim()
  console.log(response)
}

async function fetchSynopsis(outline) {

  const response = await openai.createCompletion({
    'model' : 'text-davinci-003',

    'prompt': `Generate an engaging, professional and marketable movie synopsis based on following "${ outline}`,
    
    'max_tokens': 700

   
  })


  const synopsis= response.data.choices[0].text.trim()
  document.getElementById('output-text').innerText= synopsis

  fetchTitle(synopsis)
}
async function fetchTitle(synopsis){
  const response = await openai.createCompletion({
    'model' : 'text-davinci-003',
    'prompt' : `generate a title baseed on "${synopsis}" it should be gripping, flashy and alluring`,
    'max_tokens' : 25,
    'temperature' :0.7

  })

  document.getElementById('output-title').innerText = response.data.choices[0].text.trim()

}