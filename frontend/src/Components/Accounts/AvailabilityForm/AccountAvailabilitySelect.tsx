// Components
import AddTimeNode from "./AddTimeNode";

// Styles
import st from "./AccountAvailability.module.css";

// Hooks
import useAvailability from "../../../hooks/useAvailability";

const AccountAvailabilitySelect = () => {
    // Used to map list elements (each checkbox)}
    const { checked, getAvailableDays, getAvailableTimes, updateChecked, dayOptions } = useAvailability();

    if (checked !== undefined) {
        return (
            <div className={st.av__form__list}>
                {dayOptions.map((day) =>
                    <div key={day}>
                        <div className={st.av__form__list__element}>
                            <input type="checkbox"
                                name="day-checkbox"
                                value={day}
                                className={st.av__form__list__element__checkbox}
                                onClick={() => updateChecked(day)}
                                defaultChecked={getAvailableDays(day)}
                            />                                              
                            <label className={st.av__form__list__element__label} htmlFor="day-checkbox">
                                {day[0].toUpperCase() + day[1]}
                            </label>
                        </div>
                        <ul>
                            {getAvailableDays(day) && <AddTimeNode times={getAvailableTimes(day)}/>}
                        </ul>
                    </div>
                )}
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default AccountAvailabilitySelect;