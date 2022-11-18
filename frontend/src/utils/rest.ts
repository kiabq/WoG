// Libraries
import axios, { AxiosResponse } from "axios"

// Hooks
import { useAcct } from "../hooks/useAccount"

/* USER AVAILABILITY */

/**
 * @param {Object} formData Object Argument (Data to be sent in the request)
 * @param {string} token JWT Authentication token
 * @returns {Promise} Represents the promise that will be called to initiate the request
 */

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

/* USER INFORMATION */

/**
 * @param {Object} formData Object Argument (Data to be sent in the request)
 * @param {string} token JWT Authentication token
 * @param {number} category Used to determine what category to update in the request
 * @returns {Promise} Represents the promise that will be called to initiate the request
 */

export function updateUserInformation(formData: Object, token: string, category: number) {
    function getCategoryType() {
        switch (category) {
            case 1:
                return "user_info";
            case 2: 
                return "optionalQuestions";
            default:
                throw new Error("Something went wrong!");
        }
    }

    const config = {
        Authorization: `Bearer ${token}`
    }

    function update() {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/me/update`, 
            { [`${getCategoryType()}`]: formData },
            { headers: config }
        )
    }

    return (
        update()
        .catch((err) => console.log("An Error Occurred: ", err))
    )
}