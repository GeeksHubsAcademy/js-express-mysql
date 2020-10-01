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
        let {
            products
        } = await res.json();
        renderProducts(products)
    } catch (error) {
        console.error(error)
    }
}
const addProduct = async(event) => {
    try {
        event.preventDefault();
        const product = {
            name: event.target.name.value,
            price: +event.target.price.value,
            image_path: event.target.image_path.value
        }
        console.log(product)
        let res = await fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        getProducts();
    } catch (error) {
        console.error(error);
    }
}
getProducts();