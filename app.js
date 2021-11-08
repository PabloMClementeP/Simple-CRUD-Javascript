// Inital data
const data = [{
    "id": 1,
    "name": "Gustavo",
    "second": "Smithen",
    "date": "2021-05-07",
    "email": "gsmithen0@eventbrite.com",
    "phone": "1154203547"
  }, {
    "id": 2,
    "name": "Avril",
    "second": "Paternoster",
    "date": "2021-08-14",
    "email": "apaternoster1@wordpress.org",
    "phone": "9931814579"
  }, {
    "id": 3,
    "name": "Rriocard",
    "second": "Pacht",
    "date": "2021-09-16",
    "email": "rpacht2@ask.com",
    "phone": "2385408882"
  }, {
    "id": 4,
    "name": "Verene",
    "second": "Cartner",
    "date": "2021-03-20",
    "email": "vcartner3@abc.net.au",
    "phone": "4902219295"
  }, {
    "id": 5,
    "name": "Pat",
    "second": "Leacy",
    "date": "2021-05-14",
    "email": "pleacy4@infoseek.co.jp",
    "phone": "9489569782"
  }, {
    "id": 6,
    "name": "Margarette",
    "second": "O'Kinneally",
    "date": "2021-03-01",
    "email": "mokinneally5@wiley.com",
    "phone": "7686006949"
  }, {
    "id": 7,
    "name": "Adela",
    "second": "Crauford",
    "date": "2021-05-14",
    "email": "acrauford6@exblog.jp",
    "phone": "2045182691"
  }, {
    "id": 8,
    "name": "Purcell",
    "second": "Cristofolo",
    "date": "2021-04-24",
    "email": "pcristofolo7@oakley.com",
    "phone": "2989404212"
  }];

// Constants and global variables
const d =document,
    ls = localStorage,
    $table = d.querySelector(".table"),
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".title-form"),
    $template = d.getElementById("list-template").content,
    $fragment = d.createDocumentFragment();

// Constants modal
const closeModal = d.querySelector(".close"),
  openModal = d.querySelector(".open-modal"),
  modal = d.querySelector(".modal"),
  modalCont = d.querySelector(".modal-container");




    // function getAll print data in the html table 
    // if no was data in local storage get the data from initial variable
const getAll = async ()=>{

        if(ls.getItem("users") === null){
            data.forEach (el=>{
                $template.querySelector(".id").textContent = el.id;
                $template.querySelector(".name").textContent = el.name;
                $template.querySelector(".second").textContent = el.second;
                $template.querySelector(".date").textContent = el.date;
                $template.querySelector(".email").textContent = el.email;
                $template.querySelector(".phone").textContent = el.phone;
    
                // the button edit will have a data atribute with the element data
                $template.querySelector(".edit").dataset.id = el.id;
                $template.querySelector(".edit").dataset.name = el.name;
                $template.querySelector(".edit").dataset.second = el.second;
                $template.querySelector(".edit").dataset.date = el.date;
                $template.querySelector(".edit").dataset.email = el.email;
                $template.querySelector(".edit").dataset.phone = el.phone;
    
                // the button delete has a data atribute with the id
                $template.querySelector(".delete").dataset.id = el.id;
    
                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);
            })
            ls.setItem('users', JSON.stringify(data));
        }else{
            let getData = JSON.parse(ls.getItem("users"));
            getData.forEach (el=>{
                $template.querySelector(".id").textContent = el.id;
                $template.querySelector(".name").textContent = el.name;
                $template.querySelector(".second").textContent = el.second;
                $template.querySelector(".date").textContent = el.date;
                $template.querySelector(".email").textContent = el.email;
                $template.querySelector(".phone").textContent = el.phone;
    
                // the button edit will have a data atribute with the element data
                $template.querySelector(".edit").dataset.id = el.id;
                $template.querySelector(".edit").dataset.name = el.name;
                $template.querySelector(".edit").dataset.second = el.second;
                $template.querySelector(".edit").dataset.date = el.date;
                $template.querySelector(".edit").dataset.email = el.email;
                $template.querySelector(".edit").dataset.phone = el.phone;
    
                // the button delete has a data atribute with the id
                $template.querySelector(".delete").dataset.id = el.id;
    
                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);
            })
        }


        $table.querySelector("tbody").appendChild($fragment);
        clearForm();
}


// On DOM Loaded call getAll function
d.addEventListener("DOMContentLoaded", getAll);


// When the form submit button is pressed
// if the data-atribute "id" does exists and has a number it is in edit mode
// otherwise it is in creation mode

d.addEventListener("submit", async e=>{
    if(e.target === $form){
        e.preventDefault();
        
        if(e.target.id.value){
            // EDIT MODE
            let getData = JSON.parse(ls.getItem("users"));

            getData.forEach( el=>{
                if(el.id === parseInt(e.target.id.value)){
                    el.name = e.target.name.value;
                    el.second = e.target.second.value;
                    el.date = e.target.date.value;
                    el.email = e.target.email.value;
                    el.phone = e.target.phone.value;
                }
            })

            ls.setItem('users', JSON.stringify(getData));
            
            closeFormModal();
            // page refresh
            setTimeout(()=>{
                clearForm();
                location.reload();
            },400);

        }else{
            // CREATE MODE
            let getData = JSON.parse(ls.getItem("users"));

            // let date = new Date
            
            let newData = {
                    id: Math.floor(Math.random()*1001),
                    name: e.target.name.value,
                    second: e.target.second.value,
                    date: e.target.date.value,
                    email: e.target.email.value,
                    phone: e.target.phone.value
                }

            ls.setItem('users', JSON.stringify([...getData, newData]));

            closeFormModal();
            // page refresh
            setTimeout(()=>{
                clearForm();
                location.reload();
            },400);
        }

    }
});

d.addEventListener("click", async e=>{
    // if edit button was clicked
    if(e.target.matches(".edit")){
        $title.textContent = "Edit User";
        $form.id.value = e.target.dataset.id,
        $form.name.value = e.target.dataset.name,
        $form.second.value = e.target.dataset.second,
        $form.date.value = e.target.dataset.date,
        $form.email.value = e.target.dataset.email,
        $form.phone.value = e.target.dataset.phone;
        console.log("abrirModal")
        openFormModal();
    }

    // if delete button was clicked
    if(e.target.matches(".delete")){
        let isDelete = confirm("Realy you go to delete the user?" + e.target.dataset.id);

        if(isDelete){
            let getData = JSON.parse(ls.getItem("users"));
            let newData = getData.filter( el=>{
                return el.id !== parseInt(e.target.dataset.id);
            });


            ls.setItem('users', JSON.stringify(newData));

            // page refresh
            clearForm();
            location.reload();

        }
    }

});

// Close / Open Modal

openModal.addEventListener("click", e=>{
    e.preventDefault();
    openFormModal();
});


const openFormModal = ()=>{
    modalCont.style.opacity = "1";
    modalCont.style.visibility = "visible";
    modal.classList.toggle("modal-close");
}

const closeFormModal = e=>{
    modal.classList.toggle("modal-close");
    setTimeout(()=>{
        modalCont.style.opacity = "0";
        modalCont.style.visibility = "hidden";
    },400);
}

closeModal.addEventListener("click", e=>{
    e.preventDefault();
    closeFormModal();
});

const clearForm = ()=>{
    $title.textContent = "Add new User";
    $form.id.value = '',
    $form.name.value = '',
    $form.second.value = '',
    $form.date.value = '',
    $form.email.value = '',
    $form.phone.value = ''
}