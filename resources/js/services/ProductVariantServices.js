import axios from 'axios'

const ProductVariantServices = {}

ProductVariantServices.list = async () => {
    let url = "/product-variant"
    const res = await axios
        .get(url)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
    return res
}

ProductVariantServices.store = async (data) => {
    let url = "product-variant"
    const res = await axios
        .post(url, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
    return res
}

ProductVariantServices.update = async (data) => {
    let url = "product-variant" + data.id
    const res = await axios
        .put(url, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
    return res
}

ProductVariantServices.delete = async (data) => {
    let url = "product-variant" + data.id
    const res = await axios
        .delete(url, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
    return res
}

ProductVariantServices.details = async (data) => {
    let url = "product-variant" + data.id
    const res = await axios
        .get(url, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
    return res
}



export default ProductVariantServices