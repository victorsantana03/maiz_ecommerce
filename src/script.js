const btnCart = document.querySelector("#btn-cart")
const bgCart = document.querySelector("#bg-cart")
const btnCloseCard = document.querySelector("#btn-close-card")
const menu = document.querySelector("#menu")
const cartContent = document.querySelector("#cart-content")
const cartTotal = document.querySelector("#cart-total")
const btnFinish = document.querySelector("#btn-finish")
const input = document.querySelector("#input-cart")
const spanInput = document.querySelector("#span-input")
const totalItens = document.querySelector("#total-itens")

let cart = []

//Abrir o carrinho
btnCart.addEventListener("click", function () {
    bgCart.classList.remove("hidden")
    bgCart.classList.add("flex")
    addToCart()
})

//Fechar o carrinho
bgCart.addEventListener("click", function(event) {
    if (event.target === bgCart) {
        bgCart.classList.remove("flex")
        bgCart.classList.add("hidden")
    }  
})

btnCloseCard.addEventListener("click", function () {
    bgCart.classList.remove("flex")
    bgCart.classList.add("hidden")
})

//Pegar os atributos dos produtos
menu.addEventListener("click", function (event) {
    let iconClick = event.target.closest(".fa-solid")
    let name = iconClick.getAttribute("data-name")
    let price = iconClick.getAttribute("data-price")
    addToList(name, price)
})

//Adicionar os atributos a lista 
function addToList(name, price) {

    let itemExistente = cart.find(function(item) {
        return item.name === name
    })

    if (itemExistente) {
        itemExistente.quantity += 1
    }
    else {
        cart.push({
            name,
            price,
            quantity: 1
        })
    }
    addToCart()
}

//Adicinar a lista ao carrinho
function addToCart(){
    cartContent.innerHTML = ""
    let total = 0
    cart.forEach(item => {
        let totalPrice = item.price * item.quantity
        let div = document.createElement("div")
        div.innerHTML = `
            <div class="text-white font-medium border border-mostarda-escuro rounded-md p-2">
                <p>Pedido: ${item.name}</p>
                <p>Preço: R$${parseFloat(totalPrice).toFixed(2)}</p>
                <p>Quantidade: ${item.quantity}</p>
                <button class="delet-btn bg-vinho text-mostarda-escuro rounded-md py-px px-1 mt-2 outline-none" data-name="${item.name}">Descartar<button>
            </div>
        `
        cartContent.appendChild(div)
        total += item.price * item.quantity
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style:"currency",
        currency: "BRL"
    })

    totalItens.textContent = cart.length
}

//Deletar item
cartContent.addEventListener("click", function(event){
    if(event.target.classList.contains("delet-btn")){
        let name = event.target.getAttribute("data-name")
        removeItem(name)
    }
})

function removeItem(name){
    let index = cart.findIndex(item => item.name === name)
    if(index !== -1){
        if(cart[index].quantity > 1){
            cart[index].quantity -= 1
            addToCart()
            return
        } else {
            cart.splice(index, 1)
            addToCart()
        }
    }
}

btnFinish.addEventListener("click", function(){
    if(input.value === ""){
        spanInput.classList.remove("hidden")
        return
    } else{
        spanInput.classList.add("hidden")
    }

    if(cart.length === 0){
        alert("Seu carrinho está vazio")
        return
    } else{
        cart.length = 0
        alert("Pedido finalizado")
        spanInput.classList.remove("border-red-600")
        input.value = ""
        addToCart()
        return
    }
})