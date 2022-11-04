// Libraries
import axios, { AxiosResponse } from "axios"

// Hooks
import { useAcct } from "../hooks/useAccount"

// Function used to make POST req. to create availability data.
// A relation between the availability data and the user account will also be created.
export function createAvailability(formData: Array<Object>, token: string) {
    const config = {
        Authorization: `Bearer ${token}`
    }

    const availabilityBody = {
        data: {
            day: formData
        }
    }

    // Create user availability on the backend.
    function create() {
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user-availabilities`, 
            availabilityBody, 
            { headers: config }
        )
    }

    // Update users relation, setting the user availability relation field
    // to the id of the newly created user avaialibility.
    function update(res: any) {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/me/update`, 
            { user_availability: res.data.id },
            { headers: config }
        )
    }

    // Promise used to create and then update user availability.   
    return (
        create()
        .then((res) => {return update(res)})
        .catch((err) => console.log("An Error Occurred: ", err)) 
    )
}

// Function that will update the availability information if it already exists
export function updateAvailability(formData: Array<Object>, token: string) {
    const config = {
        Authorization: `Bearer ${token}`
    }

    const availabilityBody = {
        data: {
            day: formData,
        }
    }

    // Update user availability under current authorized user.
    // This is based off of whichever JWT token is sent from localStorage.
    function update() {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user-availability/me`, 
            { ...availabilityBody },
            { headers: config }
        )
    }

    return (
        update()
        .catch((err) => console.log("An Error Occurred: ", err))
    );
}

export function updateUserInformation(formData: Object, token: string) {
    const config = {
        Authorization: `Bearer ${token}`
    }

    console.log(formData)

    function update() {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/me/update`, 
            { user_info: formData },
            { headers: config }
        )
    }

    return (
        update()
        .catch((err) => console.log("An Error Occurred: ", err))
    )
}