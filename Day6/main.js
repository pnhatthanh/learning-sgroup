// const a=document.getElementById("haha");
// console.log(a);
// a.style.color="red"




// setTimeout(function (params) {
//     console.log("Timeout")    
// },1000);
// console.log("No TIme out")

// let i=0;
// setInterval(function(){
//     console.log(i++);
// },1000);
//Muon dung su dung clearInterval


// let i=1;
// const interval=setInterval(function(){
//     console.log(i);
//     i++;
    
// },1000);
// setTimeout(function(){
//     clearInterval(interval)
// },5000);


//Viet ham promise randome number thannh cong khi random>20 thi tra ve so radom ban dau
//that bai thi random<10 tra ve loi so nho qua

// const promise=new Promise((resolve,reject)=>{
//     let random=Math.random()*100;
//     console.log(random)
//     if(random>50){
//         resolve(random);
//     }else if(random<10){
//         reject("So nho qua");
//     }
// })
// promise.then((random)=>{
//     console.log(random);
// })
// .catch((error)=>{
//     console.log(error);
// })

const API_URL = "https://pokeapi.co/api/v2/pokemon/ditto"

const pokemonData = fetch(API_URL)

pokemonData.then(res => {
    return res.json()
}).then(data => {
    console.log('fulfilled',data)
})

function fetch(url, callback){
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = () => {
        if (xhr.status === 200){
            callback(xhr.responseText, undefined)
        } else {
            callback(undefined, 'Error: ' + xhr.status)
        }
    }
    xhr.send()
}
// lan 1 - fetch pikachu
fetch('https://pokeapi.co/api/v2/pokemon/pikachu', function (data, error) {
    if (error){
        console.error(error)
    } else {
        data = JSON.parse(data)
        console.log(data)
        fetchData = data
        // lan 2 - fetch species
        fetch(data.species.url, function (data, error) {
            if (error){
                console.error(error)
            } else {
                data = JSON.parse(data)
                console.log(data)

                // lan 3 - fetch evolution_chain
                fetch(data.evolution_chain.url, function (data, error) {
                    if (error){
                        console.error(error)
                    } else {
                        data = JSON.parse(data)
                        console.log(data)

                        // lan 4 - fetch pichu
                        fetch(data.chain.species.url, function (data, error) {
                            if (error){
                                console.error(error)
                            } else {
                                data = JSON.parse(data)
                                console.log(data)
                            }
                        })
                    }
                })
            }
        })
    }
})

function promiseFetch(url){
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = () => {
            if (xhr.status === 200){
                resolve(xhr.responseText)
            } else {
                reject('Error: ' + xhr.status)
            }
        }
        xhr.send()
    })

    return promise
}

promiseFetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    .then(function (data) {
        data = JSON.parse(data)
        console.log('then 1', data)
        return promiseFetch(data.species.url)
    })
    .then(function (data) {
        data = JSON.parse(data)
        console.log('then 2', data)
        return promiseFetch(data.evolution_chain.url)
    })
    .then(function (data) {
        data = JSON.parse(data)
        console.log('then 3', data)
        return promiseFetch(data.chain.species.url)
    })
    .then(function (data) {
        data = JSON.parse(data)
        console.log('then 4', data)
    })
    .catch(function (error) {
        console.error(error)
    })

function rewriteFetch(url){
    const promise = new Promise((resolve, reject) => {
        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console(data)
            })
            .catch(error => {
                reject(error)
            })
    })

    return promise
}

rewriteFetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    .then(function (data) {
        console.log('then 1', data)
        return rewriteFetch(data.species.url)
    })
    .then(function (data) {
        console.log('then 2', data)
        return rewriteFetch(data.evolution_chain.url)
    })
    .then(function (data) {
        console.log('then 3', data)
        return rewriteFetch(data.chain.species.url)
    })
    .then(function (data) {
        console.log('then 4', data)
    })
    .catch(function (error) {
        console.error(error)
    })

const h1s = document.querySelectorAll('h1')
let message = 'dang tai du lieu...'
function batDongBo() {
    h1s[0].textContent = message
    console.log('dang tai du lieu...')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve()
            reject()
        }, 3000)
    })
}

batDongBo()
.then(
    function() {
        console.log('tai du lieu thanh cong')
        message = 'tai du lieu thanh cong'
        h1s[1].style.color = 'green'
    }
)
.catch(
    function() {
        console.error('tai du lieu that bai')
        message = 'tai du lieu that bai'
        h1s[1].style.color = 'red'
    }
)
.finally(
    function() {
        console.log('da tai xong')
        h1s[0].style.display = 'none'
        h1s[1].style.display = 'block'
        h1s[1].textContent = message
    }
)

function batDongBo1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //resolve('tai du lieu 2s')

            reject('tai du lieu  2s that bai')
        }, 2000)
    })
}
function batDongBo2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //resolve('tai du lieu 3s')
            reject('tai du lieu 3s that bai')
        }, 3000)
    })
}

const promise2s = batDongBo1()
const promise3s = batDongBo2()
const notPromise = 0
Promise.all(
    [
        promise3s,
        promise2s,
        notPromise,
    ]
)
.then(function (values) {
    console.log(values)
    values.forEach(value => {
        console.log(value)
    })
})
.catch(function (error) {
    console.error(error)
})
