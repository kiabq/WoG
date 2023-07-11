// Libraries
import axios from 'axios';

export async function getUser(token: string | undefined) {
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