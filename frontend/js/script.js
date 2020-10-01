const productsDiv = document.querySelector('.products')
const renderProducts = (products = []) => {
    productsDiv.innerHTML = '';
    products.forEach(product => {
        productsDiv.innerHTML += `
        <div class="product">
        <h3>${product.name}</h3>
        <div>${product.price}</div>
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
getProducts();