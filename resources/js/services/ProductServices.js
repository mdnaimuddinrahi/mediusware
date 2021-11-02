import axios from 'axios'

const ProductServices = {}

ProductServices.list = async (data) => {
    let url = "product/index"
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

ProductServices.store = async (data) => {
    let url = ""
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

ProductServices.update = async (data) => {
    let url = "" + data.id
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

ProductServices.delete = async (data) => {
    let url = "" + data.id
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

ProductServices.details = async (data) => {
    let url = "" + data.id
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



export default ProductServices