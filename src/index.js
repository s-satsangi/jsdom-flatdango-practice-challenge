const url = "http://localhost:3000/films"
const filmsDiv = () => document.querySelector("#films")
const posterDiv = () => document.querySelector("#poster")
const showingDiv = () => document.querySelector("#showing")

document.addEventListener('DOMContentLoaded', () => {
    //call a func that gets the JSON for the first movie
    fetchFirstFlick()
})

//Client -
// - See the first movie's details, including its **poster, title, runtime, showtime, and available tickets** (the number of tickets left will need to be derived from the theater's capacity and the number of tickets sold)
//
//
//me -
//ok, first I'll get the first movie

function fetchFirstFlick(){
    fetch(`${url}/1`).then(resp => resp.json()).then(flick => displayPosterAndShowInfo(flick))
    // ... and then I'll display the poster & show info
}


//display poster & show info
function displayPosterAndShowInfo(flick){
    //display poster
    // debugger
    document.getElementById('poster').src = flick.poster

    //manage tix
    if (parseInt(flick.capacity)-parseInt(flick.tickets_sold) > 0) {
    //sell tix stuff
    document.getElementsByClassName("ui orange button")[0].addEventListener('click', (event)=>{
        buyTix(event, flick)
    })} else {
    //sold out stuff
    document.getElementsByClassName("ui orange button")[0].addEventListener('click', (event)=>{
        alert('Sorry, we are sold out :(')
    })}

    //display showing info
    document.getElementById('title').innerText = flick.title
    document.getElementById('runtime').innerText = flick.runtime
    document.getElementById('film-info').innerText = flick.description
    document.getElementById('showtime').innerText = flick.showtime
    document.getElementById('ticket-num').innerText = flick.tickets_sold

} 



//Client -
// - Buy a ticket for a movie. The number of tickets sold for that movie should be persisted, and I should be able to see the number of available tickets decreasing on the frontend.
//
//me -
// ok, let's add an event listener in the domcontentloaded event listener
//  to the ui orange button.  Since we're doing a patch for tickets, 
//  we'll need the id, let's add an id = flick.id to the 
//  extra content div 

function buyTix(event, flick){

//CLIENT -
// - I should not be able to buy a ticket if the showing is sold out.
//
//me - 
//just realized I need to put logic in displayPosterAndShowInfo ...

//got the id from flick, build the patch request

    let data = {}
        data.tickets_sold = parseInt(flick.tickets_sold) + 1

    let patchObj = {}
        patchObj.method = "PATCH"
        patchObj.headers = {"Content-Type": "application/json"}
        patchObj.body = JSON.stringify(data)
    
    fetch(`${url}/${flick.id}`, patchObj).then(resp => resp.json()).then(flick => displayPosterAndShowInfo(flick))
    //after the patch, send the new flick back to displayPosterAndShowInfo
}



// sample obj

// capacity: "30"
// description: "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature."
// id: "1"
// poster: "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
// runtime: "108"
// showtime: "04:00PM"
// tickets_sold: 27
// title: "The Giant Gila Monster"
