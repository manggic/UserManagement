

document.getElementById('name').addEventListener('keyup', function(e){
    console.log('e', e.target.value)
    user.name= e.target.value
})
document.getElementById('email').addEventListener('keyup', function(e){
    console.log('e', e.target.value)
    user.email= e.target.value
})
document.getElementById('mobile').addEventListener('keyup', function(e){
    console.log('e', e.target.value)
    user.mobile= e.target.value
})
document.getElementById('age').addEventListener('keyup', function(e){
    console.log('e', e.target.value)
    user.age= e.target.value
})
document.getElementById('dob').addEventListener('keyup', function(e){
    console.log('e', e.target.value)
    user.dob= e.target.value
})


let user = {  }


var data = null



// create 
if(document.getElementById('addBtn')){
    document.getElementById('addBtn').addEventListener('click',async function(e){
        e.preventDefault()
        // alert('add');

        console.log('full data', user)
    
        await fetch('http://localhost:3000/add', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(user) // body data type must match "Content-Type" header
        } )
        .then(res=> res.json().then(res =>  data=res  ))
        .catch(err=> console.log('err', err))
        console.log('Data',data)
        user ={ }
    })
}



