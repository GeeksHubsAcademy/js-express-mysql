const getProducts = async() => {
    try {
        let res = await fetch('http://localhost:3000');
        console.log(res);
        let { products } = await res.json();
        console.log(products)
    } catch (error) {

    }
}
getProducts();