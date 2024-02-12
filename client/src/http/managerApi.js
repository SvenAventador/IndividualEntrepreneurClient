import {$authHost} from "./index";

export const getAllAdoptInvoice = async () => {
    const {data} = await $authHost.get('/api/manager/getAllAdoptInvoices')
    return data
}

export const closeOrder = async (id) => {
    console.log('api', id)
    const {data} = await $authHost.post(`/api/manager/closeOrder?id=${id}`)
    return data
}