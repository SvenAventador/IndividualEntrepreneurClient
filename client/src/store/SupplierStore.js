import {create} from 'zustand';
import {
    addGood,
    adoptInvoice,
    changeStatus,
    deleteAllGood,
    deleteOneGood,
    getAllGoods,
    getAllInvoice,
    getOneGood,
    updateGood
} from "../http/supplierApi";

export const useSupplier = create((set) => ({
    allGoods: {},
    oneGood: [],
    invoice: [],
    error: null,
    message: null,

    getAllGoods: async (userId) => {
        try {
            const data = await getAllGoods(userId);
            set({
                allGoods: data
            })
            return data
        } catch (error) {
            set({
                allGoods: [],
                error,
                message: error.response.data.message
            })
            throw error
        }
    },

    getOneGood: async (id) => {
        try {
            const data = await getOneGood(id)
            set({
                oneGood: data
            })
            return data
        } catch (error) {
            set({
                oneGood: [],
                error,
                message: error.response.data.message
            })
        }
    },

    addGood: async (userId, good) => {
        try {
            const data = await addGood(userId, good)
            set({
                oneGood: data
            })
        } catch (error) {
            set({
                oneGood: [],
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    updateGood: async (good) => {
        try {
            const data = await updateGood(good)
            set({
                oneGood: data
            })
        } catch (error) {
            set({
                oneGood: [],
                error,
                message: error.response.data.message
            })

            throw error
        }
    },

    deleteAllGood: async (userId) => {
        try {
            await deleteAllGood(userId)
        } catch (error) {
            set({
                error,
                message: error.response.data.message
            })
        }
    },

    deleteOneGood: async (id) => {
        try {
            await deleteOneGood(id)
        } catch (error) {
            set({
                error,
                message: error.response.data.message
            })
        }
    },

    getAllInvoices: async (supplierId) => {
        try {
            const data = await getAllInvoice(supplierId)
            set({
                invoice: data
            })

            return data
        } catch (error) {
            set({
                error,
                message: error.response.data.message
            })
        }
    },

    adoptInvoice: async (id) => {
        try {
            const data = await adoptInvoice(id)
            set({
                invoice: data
            })

            return data
        } catch (error) {
            set({
                error,
                message: error.response.data.message
            })
        }
    },

    changeStatus: async (invoiceId, statusId) => {
        try {
            const data = await changeStatus(invoiceId, statusId)
            set({
                invoice: data
            })

            return data
        } catch (error) {
            set({
                error,
                message: error.response.data.message
            })
        }
    }
}))