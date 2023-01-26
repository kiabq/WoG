// Components
import AccountForms from "./AccountForms";

// Styles
import styles from './Account.module.css';

// Hooks
import { useAuth } from "../../hooks/useProvider";
import { useAcct } from "../../hooks/useAccount";

const Account = () => {
    const { accountInfo } = useAcct();
    const auth = useAuth();

    if (auth?.token && auth?.user && (accountInfo.error === undefined)) {
        return (
            <>
                <div className={`${styles.account} pd6-top`}>
                    <AccountForms/>
                </div>
            </>
        )
    }

    return null;
}

export default Account;