// Libraries
import React from "react";

// Styles
import styles from "./PlayerInfo.module.css";
import globals from "../../../globals.module.css";

// Hooks
import { useAcct } from "../../../hooks/useAccount";

// Types
import { Edit, EditFnProp } from "../types";

const PlayerInfo = ({ toggleEdit }: EditFnProp) => {
    const { accountInfo } = useAcct();

    return (
        <div className={`${styles.playerinfo}`}>
            <p>Name:</p>
            <p>{accountInfo.name}</p>

            <p>Invoice Email:</p>
            <p>{accountInfo.invoiceEmail}</p>

            <p>Pronoun:</p>
            <p>{accountInfo.pronoun}</p>

            <p>Date of Birth:</p>
            <p>{accountInfo.dob}</p>

            <button onClick={() => toggleEdit(Edit.player)} className={`${globals.submit}`}>
                <span>Edit Personal</span>
            </button>
        </div>
    );
}

export default PlayerInfo;