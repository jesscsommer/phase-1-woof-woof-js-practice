
//! Globals 
const baseURL = 'http://localhost:3000/pups'
const dogInfoDiv = document.querySelector('#dog-info')

//! Render on page

const addToDogBar = (pup) => {
    const newSpan = document.createElement('span')
    newSpan.innerText = pup.name
    newSpan.addEventListener('click', e => displayDoggo(pup))
    document.querySelector('#dog-bar').append(newSpan)
}

const displayDoggo = (pup) => {
    dogInfoDiv.innerHTML = ""
    const pupInfo = document.createElement('div')

    const img = document.createElement('img')
    img.src = pup.image
    img.alt = pup.name

    const name = document.createElement('h2')
    name.innerText = pup.name

    const btn = document.createElement('button')
    btn.innerText = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    btn.addEventListener('click', e => patchPups(pup.id, {
        isGoodDog: !pup.isGoodDog
    }))

    pupInfo.append(img, name, btn)
    dogInfoDiv.append(pupInfo)
}

//! Fetch data 

const getPups = () => {
    fetch(baseURL)
    .then(res => res.json())
    .then(pups => pups.forEach(pup => addToDogBar(pup)))
    .catch(error => alert(error))
}

getPups()

const patchPups = (id, body) => {
    fetch(`${baseURL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(pup => displayDoggo(pup))
    .catch(error => alert(error))
}