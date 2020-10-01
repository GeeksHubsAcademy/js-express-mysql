const productsDiv = document.querySelector('.products')
const renderProducts = (products = []) => {
    productsDiv.innerHTML = '';
    products.forEach(product => {
        productsDiv.innerHTML += `
        <div class="product">
        <h3>${product.name}</h3>
        <div>${product.price.toFixed(2)} €</div>
        <img src="${product.image_path}" alt="${product.name}"/>
        </div>
        `
    })
}

const getProducts = async() => {
    try {
        let res = await fetch('http://localhost:3000');
        console.log(res);
        let {
            products
        } = await res.json();
        renderProducts(products)
    } catch (error) {

    }
}
const addProduct = (event) => {
    event.preventDefault();
    const product = {
        name: event.target.name.value,
        price: +event.target.price.value,
        image_path: event.target.image_path.value
    }
    console.log(product)
}
getProducts();