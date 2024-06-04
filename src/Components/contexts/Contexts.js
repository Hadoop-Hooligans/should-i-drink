import { createContext } from "react";

export const SelectedLocationContext = createContext({
    fullAddress: '',
    latitude: '',
    longitude: ''
})

export const UserLocationContext = createContext({
    latitude: '',
    longitude: '',
    active: false
})


export const ClosestWellContext = createContext([])

export const SelectedDeterminand = createContext()
