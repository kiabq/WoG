// Styles
import styles from "./PlayerInfo.module.css";

// Hooks
import { useAcct } from "../../../hooks/useAccount";

// Types
import { Edit, EditFnProp } from "../../../utils/types";

const PlayerInfo = ({ toggleEdit }: EditFnProp) => {
    const { accountInfo } = useAcct();

    return (
        <div className={styles.playerinfo}>
            <div className="pd3-top">
                <label htmlFor="name" className="ub_lgt">Name:</label>
                <p>{accountInfo.user_info?.name}</p>
            </div>

            <div className="pd3-top">
                <label htmlFor="invoiceEmail" className="ub_lgt">Invoice Email:</label>
                <p>{accountInfo.user_info?.invoiceEmail}</p>
            </div>
            
            <div className="pd3-top">
                <label htmlFor="pronoun" className="ub_lgt">Pronoun:</label>
                <p>{accountInfo.user_info?.pronoun}</p>
            </div>
            
            <div className="pd3-top">
                <label htmlFor="dob" className="ub_lgt">Age:</label>
                <p>{accountInfo.user_info?.age}</p>
            </div>
            
            <button onClick={() => toggleEdit(Edit.player)} className="btn btn-padding edit">
                <span>Edit Personal</span>
            </button>
        </div>
    );
}

export default PlayerInfo;