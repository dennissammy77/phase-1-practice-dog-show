document.addEventListener('DOMContentLoaded', () => {
    const dogTableList = document.getElementById("table-body");
    const dogForm = document.getElementById("dog-form");
    fetch('http://localhost:3000/dogs').then((response)=>response.json()).then((data)=>{
        data.map((dog)=>{
            const tData = document.createElement('tr');
            tData.innerHTML=`
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button id="dog-${dog.id}">Edit</button></td>
            `
            dogTableList.appendChild(tData)
            document.getElementById(`dog-${dog.id}`).addEventListener("click",()=>{
                // populate form 
                dogForm.querySelector('[name=name').value=dog.name
                dogForm.querySelector('[name=breed').value=dog.breed
                dogForm.querySelector('[name=sex').value=dog.sex
            });
            dogForm.addEventListener('submit',(e)=>{
                e.preventDefault();
                const name = dogForm.querySelector('[name=name').value;
                const breed = dogForm.querySelector('[name=breed').value;
                const sex = dogForm.querySelector('[name=sex').value;
                fetch(`http://localhost:3000/dogs/${dog.id}`,{
                    method: 'PATCH',
                    headers: {
                        "content-Type": "application/json",
                        "accept": "application/json"
                    },
                    data: JSON.stringify({
                        name,
                        breed,
                        sex
                    })
                }).catch((err)=>console.log(err))
            })
        })
    }).catch((err)=>console.error(err))
})