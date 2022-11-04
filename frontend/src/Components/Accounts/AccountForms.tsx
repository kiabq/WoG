// Libraries
import React, { useEffect, useState } from "react";

// Components
import AccountAvailabilityForm from "./AvailabilityForm/AccountAvailabilityForm";
import AccountAvailability from "./AvailabilityForm/AccountAvailability";
import PlayerInfoForm from "./PlayerInfo/PlayerInfoForm";
import PlayerInfo from "./PlayerInfo/PlayerInfo";

// Styles
import styles from './Account.module.css';
import globals from '../../globals.module.css';

// Hooks
import { useAcct } from "../../hooks/useAccount";

// Types
import { Edit } from './types';

const AccountForms = () => {
    const [isEdit, setEdit] = useState<Edit>(Edit.none);
    const { accountInfo } = useAcct();

    const makeEdit = (editType: Edit) => {
        setEdit(editType);
    }

    return (
    <>
        <div className={`${styles.account__info} ${globals.pd4}`}>
            <p>{accountInfo.user}</p>
            <img src={accountInfo.avatar} className={`${styles.account__info__avatar}`}/>
            { isEdit === 1 ? <PlayerInfoForm toggleEdit={makeEdit}/> : <PlayerInfo toggleEdit={makeEdit}/> }
        </div>
        <div className={`${styles.account__forms} ${globals.pd4}`}>
            <div className={styles.account__consumable}>
                { isEdit === 2 ? <AccountAvailabilityForm toggleEdit={makeEdit}/> : <AccountAvailability toggleEdit={makeEdit}/> }
                <h1>Optional Questions</h1>
            </div>
        </div>
    </>
    )
}

export default AccountForms;