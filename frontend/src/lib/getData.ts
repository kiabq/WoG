// Libraries
import axios from 'axios';

// Types
import { IUser } from '@/utils/types';

export async function getUser(token: string | undefined): Promise<IUser | null> {
    return axios.get(`${process.env.REACT_APP_BACKEND}/api/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status === 200) {
            return res.data;
        }
    }).catch(() => {
        return null;
    })
}

export async function getDM() {
    try {
        return axios.get(`${process.env.REACT_APP_BACKEND}/api/dungeon-masters?populate=attributes
            &populate[1]=sunday.times
            &populate[2]=monday.times
            &populate[3]=tuesday.times
            &populate[4]=wednesday.times
            &populate[5]=thursday.times
            &populate[6]=friday.times
            &populate[7]=saturday.times`)
            .then((res) => {
                    return res.data.data;
                }
            )
    } catch(err) {
        return null;
    }
}

export async function getAllUsers(token: string | undefined, page?: number, pageSize?: number) {
    const pagination = `pagination[page]=${page}`;
    const paginationPage = `pagination[pageSize]=${pageSize}`;

    return axios.get(`${process.env.REACT_APP_BACKEND}/api/users?populate[0]=optionalQuestions&populate[1]=role&populate[2]=availability&${pagination}&${paginationPage}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status === 200) {
            return res.data;
        }

        if (res.status !== 200) {
            throw new Error("");
        }
    }).catch(() => {
        return null;
    })
}
