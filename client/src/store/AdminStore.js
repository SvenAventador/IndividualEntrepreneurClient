import {create} from "zustand";
import {
    addSupplier,
    deleteAllSuppliers,
    deleteOneSupplier,
    getAllSuppliers
} from "../http/adminApi";

export const useAdmin = create((set) => ({
    suppliers: [],
    oneSupplier: [],
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
    }
}))