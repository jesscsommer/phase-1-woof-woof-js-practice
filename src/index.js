
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

//! Add event listeners 
document.querySelector('#good-dog-filter').addEventListener('click', e => {
    if (e.target.innerText.includes('ON')){
        e.target.innerText = e.target.innerText.replace('ON', 'OFF')
        document.querySelector('#dog-bar').innerHTML = ""
        getPups()
        .then(pups => pups.forEach(pup => addToDogBar(pup)))
        .catch(error => alert(error))
    } else {
        e.target.innerText = e.target.innerText.replace('OFF', 'ON')
        document.querySelector('#dog-bar').innerHTML = ""
        getPups()
        .then(pups => pups.forEach((pup) => {
            if (pup.isGoodDog){
                addToDogBar(pup)
            }
        }))
    }
})


//! Fetch data 

const getPups = () => {
    return fetch(baseURL)
    .then(res => res.json())
}

getPups()
.then(pups => pups.forEach(pup => addToDogBar(pup)))
.catch(error => alert(error))

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