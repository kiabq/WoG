// Libraries
import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";

// Hooks
import { useAuth } from "../../hooks/useProvider";

// Styles
import styles from './AccountForms.module.css';


interface PropTypes {
    account: {
        error: string | undefined,
        user: string | undefined,
        email: string | undefined,
        avatar: string | undefined,
        availability: any
    }
}

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

const AccountForms = ({ account }: PropTypes) => {
    const [edit, setEdit] = useState(false);
    const auth = useAuth();

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

        if (account.availability.days) {
            updateAvailability(eventFormSubmitArr, auth.token);
        } else {
            createAvailability(eventFormSubmitArr, auth.token);
        }

        setEdit(false);
    }
    
    return (
        <div>
            <button onClick={() => setEdit(!edit)}>Edit</button>

            {edit &&
                <form>
                    
                    <ul>
                        <li>
                            <input type={'checkbox'} name={'test'} value='sunday' className={styles.test}/>
                            <label htmlFor={'test'}>S</label>
                        </li>
                        <li>
                            <input type={'checkbox'} name={'test'} value='monday' className={styles.test}/>
                            <label htmlFor={'test'}>M</label>
                        </li>
                        <li>
                            <input type={'checkbox'} name={'test'} value='tuesday' className={styles.test}/>
                            <label htmlFor={'test'}>T</label>
                        </li>
                        <li>
                            <input type={'checkbox'} name={'test'} value='wednesday' className={styles.test}/>
                            <label htmlFor={'test'}>W</label>
                        </li>
                        <li>
                            <input type={'checkbox'} name={'test'} value='thursday' className={styles.test}/>
                            <label htmlFor={'test'}>Th</label>
                        </li>
                        <li>
                            <input type={'checkbox'} name={'test'} value='friday' className={styles.test}/>
                            <label htmlFor={'test'}>F</label>
                        </li>
                        <li>
                            <input type={'checkbox'} name={'test'} value='saturday' className={styles.test}/>
                            <label htmlFor={'test'}>Sa</label>
                        </li>
                    </ul>

                    <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                </form>
            }   
        </div>
    )
}

export default AccountForms;