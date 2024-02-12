import {create} from "zustand";
import {closeOrder, getAllAdoptInvoice} from "../http/managerApi";

export const useManager = create((set) => ({
    allInvoice: [],
    error: null,
    message: null,

    getAdoptInvoice: async () => {
        try {
            const data = await getAllAdoptInvoice()
            set({
                allInvoice: data
            })

            return data
        } catch (error) {
            set({
                allInvoice: [],
                error,
                message: error.response.data.message
            })
        }
    },

    closeOrder: async (id) => {
        try {
            const data = await closeOrder(id)
            set({
                allInvoice: []
            })

            return data
        } catch (error) {
            set({
                allInvoice: [],
                error,
                message: error.response.data.message
            })
        }
    }
}))