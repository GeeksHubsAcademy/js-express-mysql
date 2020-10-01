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
        const form = event.target;
        const product = {
                name: form.name.value,
                price: +form.price.value,
                image_path: form.image_path.value
            }
            // let res = await fetch('http://localhost:3000', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(product)
            // });
        await axios.post('http://localhost:3000', product);
        getProducts();
        form.reset(); //limpiar los inputs del form
    } catch (error) {
        console.error(error);
    }
}
getProducts();