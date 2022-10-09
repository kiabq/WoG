// Libraries
import React from "react";
import axios from "axios";

// Styles
import styles from './AccountForms.module.css';

// Hooks
import { useAuth } from "../../hooks/useProvider";

// Types
import { EditPropTypes } from './types';

/* TODO:
- Create type for axios response from 'create' promise in the 'createAvailability' function.
- Default check for items that are already selected in user availability.
- Create option to set available times on available days.
*/

function createAvailability(formData: Array<Object>, token: string) {
    let config = {
        Authorization: `Bearer ${token}`
    }

    let availabilityBody = {
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
    create()
    .then((res) => {return update(res)})
    .catch((err) => console.log("An Error Occurred: ", err)) 
}

function updateAvailability(formData: Array<Object>, token: string) {
    let config = {
        Authorization: `Bearer ${token}`
    }

    let availabilityBody = {
        data: {
            day: formData
        }
    }

    // Update user availability under current authorized user.
    // This is based off of whichever JWT token is sent from localStorage.
    function update() {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user-availability/me`, 
            availabilityBody,
            { headers: config }
        )
    }

    update()
    .catch((err) => console.log("An Error Occurred: ", err))
}

const AccountAvailabilityForm = ({account, toggleEdit, checked}: EditPropTypes) => {
    const auth = useAuth();

    // Implement error handling
    function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();

        const eventForm: HTMLFormElement | null = e.currentTarget.form;
        let eventFormSubmitArr: Array<object> = [];

        if (eventForm !== null) {
            for(let i = 0; i < eventForm.length; i++) {
                let formElement = eventForm[i] as HTMLInputElement;
                if (formElement.checked) {
                    eventFormSubmitArr.push({ 'day' : formElement.value });
                }
            }
        }  

        if (account !== undefined) {
            if (account.availability?.days) {
                updateAvailability(eventFormSubmitArr, auth.token);
            } else {
                createAvailability(eventFormSubmitArr, auth.token);
            }
        }

        toggleEdit!();
        // After submit, navigate to account to re-render useAccount() hook.
        // navigate('/account');
    }

    return (
    <>
        <form>          
            <ul>
                <li>
                    <input type={'checkbox'} 
                        name={'day-checkbox'} 
                        value='sunday' 
                        defaultChecked={checked?.sunday} 
                        className={styles.test}
                    />
                    <label htmlFor={'day-checkbox'}>S</label>
                </li>
                <li>
                    <input type={'checkbox'} 
                        name={'day-checkbox'} 
                        value='monday' 
                        defaultChecked={checked?.monday} 
                        className={styles.test}
                    />
                    <label htmlFor={'day-checkbox'}>M</label>
                </li>
                <li>
                    <input type={'checkbox'} 
                        name={'day-checkbox'} 
                        value='tuesday' 
                        defaultChecked={checked?.tuesday} 
                        className={styles.test}
                    />
                    <label htmlFor={'day-checkbox'}>T</label>
                </li>
                <li>
                    <input type={'checkbox'} 
                        name={'day-checkbox'} 
                        value='wednesday'
                        defaultChecked={checked?.wednesday} 
                        className={styles.test}
                    />
                    <label htmlFor={'day-checkbox'}>W</label>
                </li>
                <li>
                    <input type={'checkbox'} 
                        name={'day-checkbox'} 
                        value='thursday' 
                        defaultChecked={checked?.thursday} 
                        className={styles.test}
                    />
                    <label htmlFor={'day-checkbox'}>Th</label>
                </li>
                <li>
                    <input type={'checkbox'} 
                        name={'day-checkbox'} 
                        value='friday' 
                        defaultChecked={checked?.friday} 
                        className={styles.test}
                    />
                    <label htmlFor={'day-checkbox'}>F</label>
                </li>
                <li>
                    <input type={'checkbox'} 
                        name={'day-checkbox'} 
                        value='saturday' 
                        defaultChecked={checked?.saturday} 
                        className={styles.test}
                    />
                    <label htmlFor={'day-checkbox'}>Sa</label>
                </li>
            </ul>

            <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
        </form> 
    </>
    )

}

export default AccountAvailabilityForm;