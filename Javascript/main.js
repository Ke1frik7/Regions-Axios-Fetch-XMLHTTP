window.addEventListener("load", () => {
    let inputs = renderElement(".form_input")
    let selects = renderElementALL("select")
    selects.forEach((item) => {
      item.addEventListener("change", () => {
        inputs.required = false
      })  
    })

    let template = $("template").content
    let check = renderElement("#check")
    check.addEventListener("change", () => {
        document.body.classList.toggle("chorniRejim")      
    })
    let header = renderElement("header")
    let btnLocals = renderElement(".btn-local")
    window.addEventListener("scroll", () => {
        header.classList.toggle("active", window.scrollY> 0)
        btnLocals.classList.toggle("fix", window.scrollY> 0)
        console.log(header, btnLocals)
    })
    
    function createCard (value){
        let xml = new XMLHttpRequest()
        let link = `https://restcountries.com/v3.1/name/${value}`
        xml.addEventListener("load", () => {
            let parses  = JSON.parse(xml.responseText)
            renders(parses)
        })
        xml.open("GET", link)
        xml.send()
    }
    createCard("Uzbekistan")
    createCard("Russia")
    createCard("Germany")
    createCard("Ukrain")
    let cards = renderElement(".cards")
    function renders(arr){
        // cards.innerHTML = null
        arr.forEach((item) =>{
            let clone = template.cloneNode(true)
            let img = clone.querySelector(".card-img-top")
            img.src = item.flags.png
            let title = clone.querySelector(".card-title")
            title.textContent = item.name.common
            let qita = clone.querySelector(".card-qita")
            qita.textContent = item.subregion
            let aholi = clone.querySelector(".aholi")
            aholi.textContent = item.population
            let btnLocal = clone.querySelector(".saqlash")
            btnLocal.dataset.id = item.fifa
            cards.appendChild(clone)
        })
    }
    let sortObject = {
        az: function(a, b){
            if(a.name.common < b.name.common){
                return -1
            }else{
                return 1
            }
        },
        za: function(a , b){
            if(a.name.common < b.name.common){
                return 1
            }else{
                return -1
            }
        }
    }
    let input  = renderElement(".form_input")
    let select = renderElement("#select")
    let selectSort = renderElement("#select_sorts")
    let allArray = []
    function handleSub(e){
        e.preventDefault()
        let inputValue = input.value
        fetch(`https://restcountries.com/v3.1/name/${inputValue}`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            for(let i = 0; i<data.length; i++){
                allArray = [...allArray, data[i]]
            }
            renders(allArray)
        })
        let selectValue = select.value
        if(selectValue === "Asia"){
            axios({
                method:"GET",
                url: "https://restcountries.com/v3.1/region/asia"
            })
            .then((response) => {
                allArray = response.data
                renders(allArray)
                
            })
        }else if(selectValue === "all"){
            axios({
                method:"GET", 
                url: "https://restcountries.com/v3.1/all"
            })
            .then((response) => {
                for(let i = 0; i<response.data.length; i++){
                    allArray = [...allArray, response.data[i]]
                }
                renders(allArray)
            })
            
        }else if(selectValue === "Yevropa"){
            axios({
                method: "GET",
                url: "https://restcountries.com/v3.1/region/europe"
            })
            .then((res) => {
                for(let i = 0; i<res.data.length; i++){
                    allArray = [...allArray, res.data[i] ]
                }
                renders(allArray)
            })
        }else if(selectValue === "Amerika"){
            axios({
                method: "GET", 
                url: "https://restcountries.com/v3.1/region/Americas"
            })
            .then((res) => {
                for(let i = 0; i<res.data.length; i++){
                    allArray = [...allArray, res.data[i]]
                }
                renders(allArray)
            })
        }else if(selectValue === "Afrika"){
            axios({
                method: "GET", 
                url: "https://restcountries.com/v3.1/region/Africa"
            })
            .then((res) => {
                for(let i = 0; i<res.data.length; i++){
                    allArray = [...allArray, res.data[i]]
                }
                renders(allArray)
            })
        }
        console.log(allArray)
    }
    renderElement("form").addEventListener("submit", handleSub)
})