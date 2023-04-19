fetch('http://localhost:3000/pups')
.then(res => {
    if (res.ok) {
        return res.json()
    } else {
        throw res.statusText
    }})
.then(allDogs => {
    allDogs.forEach(dog => {
        const dogBarName = document.createElement('span')
        dogBarName.innerText = dog.name
        dogBarName.addEventListener('click', (e) => {
            document.querySelector('#dog-info').innerHTML = ""

            const doggoTitle = document.createElement('h2')
            doggoTitle.innerText = dog.name

            const doggoImg = document.createElement('img')
            doggoImg.src = dog.image
            doggoImg.alt = dog.name

            const doggoBtn = document.createElement('button')
            if (dog.isGoodDog){
                doggoBtn.innerText = 'Good Dog!'
            } else {
                doggoBtn.innerText = 'Bad Dog!'
            }
            doggoBtn.addEventListener('click', (e) => {
                toggleGoodDog(e, dog)
            })

            document.querySelector('#dog-info').append(doggoTitle, doggoImg, doggoBtn)
        })
        document.querySelector('#dog-bar').append(dogBarName)
    })
})
.catch(error => alert(error))

const toggleGoodDog = (e, dog) =>  {
    if (dog.isGoodDog){
        e.target.innerText = 'Bad Dog!'
    } else {
        e.target.innerText = 'Good Dog!'
    }
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }, 
        body: JSON.stringify({
            isGoodDog: !dog.isGoodDog
        })
    })
    .then(res => {
        if (res.ok) {
            res.json()
        } else {
            throw res.statusText
        }
    })
    .catch(error => alert(error))
}