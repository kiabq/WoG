// Libraries
import { useState } from "react";

// Components
import AccountAvailabilityForm from "./AvailabilityForm/AccountAvailabilityForm";
import AccountAvailability from "./AvailabilityForm/AccountAvailability";
import PlayerInfoForm from "./PlayerInfo/PlayerInfoForm";
import PlayerInfo from "./PlayerInfo/PlayerInfo";
import OptionalPlayerInfo from "./OptionalPlayerInfo/OptionalPlayerInfo";

// Styles
import styles from './Account.module.css';

// Hooks
import { useAcct } from "../../hooks/useAccount";

// Types
import { Edit } from '../../utils/types';

const AccountForms = () => {
    const [editType, setEdit] = useState<Edit>(Edit.none);
    const { accountInfo } = useAcct();

    const makeEdit = (editType: Edit) => {
        setEdit(editType);
    }

    return (
        <>
            <div className={styles.account__info}>
                <div className={styles.player__info__wrapper}>
                    <p>{accountInfo.user}</p>
                    <img src={accountInfo.avatar} className={`${styles.account__info__avatar} pd3-top`}/>
                    { editType === 1 ? <PlayerInfoForm toggleEdit={makeEdit}/> : <PlayerInfo toggleEdit={makeEdit}/> }
                </div>
            </div>
            <div className={`${styles.account__forms} pd4`}>
                <div className={styles.account__consumable}>
                    { editType === 2 ? <AccountAvailabilityForm toggleEdit={makeEdit}/> : <AccountAvailability toggleEdit={makeEdit}/> }                
                    <OptionalPlayerInfo toggleEdit={makeEdit} editType={editType}/>
                </div>
            </div>
        </> 
    )
}

export default AccountForms;