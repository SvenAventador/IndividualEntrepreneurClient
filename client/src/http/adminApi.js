import {$authHost} from "./index";

export const getAllSuppliers = async () => {
    const {data} = await $authHost.get('/api/admin/getAllSuppliers')
    return data
}

export const addSupplier = async (supplier) => {
    const {data} = await $authHost.post('/api/admin/addSupplier', supplier)
    return data
}

export const deleteOneSupplier = async (id) => {
    const {data} = await $authHost.delete(`/api/admin/deleteOneSupplier?id=${id}`)
    return data
}

export const deleteAllSuppliers = async () => {
    const {data} = await $authHost.delete('/api/admin/deleteAllSupplier')
    return data
}

export const addToCart = async (supplierId, adminId, supplierGoodId) => {
    const {data} = await $authHost.post(`/api/admin/addToCart?supplierId=${supplierId}&adminId=${adminId}&supplierGoodId=${supplierGoodId}`)
    return data
}

export const getGoodsInCart = async () => {
    const {data} = await $authHost.get('/api/admin/getGoodsInCart')
    return data
}

export const createOrder = async (adminId) => {
    const {data} = await $authHost.post(`/api/admin/createOrder?adminId${adminId}`)
    return data
}

export const getOurGoods = async () => {
    const {data} = await $authHost.get('/api/admin/getAllGoods')
    return data
}