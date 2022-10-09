// Libraries
import React from "react";

// Types
import { EditPropTypes } from "./types";

const AccountAvailability = ({ checked } : EditPropTypes) => {
    console.log(checked)
    return (
        <div>
            {checked?.sunday && <p>S</p>}
            {checked?.monday && <p>M</p>}
            {checked?.tuesday && <p>T</p>}
            {checked?.wednesday && <p>W</p>}
            {checked?.thursday && <p>Th</p>}
            {checked?.friday && <p>F</p>}
            {checked?.saturday && <p>Sa</p>}
        </div>
    )
}

export default AccountAvailability;