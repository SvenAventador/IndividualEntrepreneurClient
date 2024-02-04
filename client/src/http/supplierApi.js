import {$authHost} from "./index";

export const getAllGoods = async (userId) => {
    const {data} = await $authHost.get(`/api/supplier/getAllGoods?userId=${userId}`)
    return data
}

export const getOneGood = async (id) => {
    const {data} = await $authHost.get(`/api/supplier/getOneGood?id=${id}`)
    return data
}

export const addGood = async (userId, good) => {
    const {data} = await $authHost.post(`/api/supplier/addGood?userId=${userId}`, good)
    return data
}

export const updateGood = async (good) => {
    const {data} = await $authHost.put(`/api/supplier/updateGood`, good)
    return data
}

export const deleteAllGood = async (userId) => {
    const {data} = await $authHost.delete(`/api/supplier/deleteAllGoods?userId=${userId}`)
    return data
}

export const deleteOneGood = async (id) => {
    const {data} = await $authHost.delete(`/api/supplier/deleteOneGood?id=${id}`)
    return data
}