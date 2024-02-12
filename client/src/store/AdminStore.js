import {create} from "zustand";
import {
    addSupplier,
    addToCart,
    createOrder,
    deleteAllSuppliers,
    deleteOneSupplier,
    getAllSuppliers,
    getGoodsInCart,
    getOurGoods
} from "../http/adminApi";

export const useAdmin = create((set) => ({
    suppliers: [],
    goodsInCart: [],
    oneSupplier: [],
    ourGoods: [],
    error: null,
    message: null,

    getAllSuppliers: async () => {
        try {
            const data = await getAllSuppliers()
            set({
                suppliers: data
            })

            return data
        } catch (error) {
            set({
                suppliers: [],
                error,
                message: error.response.data.message
            })
        }
    },

    addSupplier: async (supplier) => {
        try {
            const data = await addSupplier(supplier)
            set({
                oneSuppliers: data
            })

            return data
        } catch (error) {
            set({
                oneSupplier: [],
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteOneSupplier: async (id) => {
        try {
            const data = await deleteOneSupplier(id)
            set({
                oneSuppliers: [],
                suppliers: [],
                message: data
            })
        } catch (error) {
            set({
                suppliers: [],
                oneSupplier: [],
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteAllSupplier: async () => {
        try {
            const data = await deleteAllSuppliers()
            set({
                oneSuppliers: [],
                suppliers: [],
                message: data
            })
        } catch (error) {
            set({
                suppliers: [],
                oneSupplier: [],
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    addToCart: async (
        supplierId,
        adminId,
        supplierGoodId
    ) => {
        try {
            const data = await addToCart(supplierId, adminId, supplierGoodId)
            set({
                oneSuppliers: [],
                suppliers: [],
                message: data
            })
        } catch (error) {
            set({
                suppliers: [],
                oneSupplier: [],
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    getGoodsInCart: async () => {
        try {
            const data = await getGoodsInCart()
            set({
                oneSuppliers: [],
                suppliers: [],
                goodsInCart: data
            })

            return data
        } catch (error) {
            set({
                suppliers: [],
                oneSupplier: [],
                error,
                message: error.response.data.message
            })
        }
    },

    createOrder: async (adminId) => {
        try {
            const data = await createOrder(adminId)
            set({
                oneSuppliers: [],
                suppliers: []
            })

            return data
        } catch (error) {
            set({
                suppliers: [],
                oneSupplier: [],
                error,
                message: error.response.data.message
            })
        }
    },

    getAllGoods: async () => {
        try {
            const data = await getOurGoods()
            set({
                ourGoods: data
            })
            return data
        } catch (error) {
            set({
                ourGoods: [],
                error,
                message: error.response.data.message
            })
        }
    }
}))