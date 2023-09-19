import React from "react";
import { useSelector} from "react-redux";
import {AppState} from "../state";

function CreateShift() {
    // const dispatch = useDispatch();
    const {title, date} = useSelector((state: AppState) => state.schedulerState.newShift);
    const handleSubmit = () => {
    };
    const handleChange = () => {
    }

    return (
        <>
            <form className="input-group vertical" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} placeholder="Title" onChange={handleChange}/>
                <label htmlFor="name">Date</label>
                <input type="datetime-local" name="date" value={date} placeholder="Shift Date" onChange={handleChange}/>
                <div className="input-group">
                    <button className="primary bordered medium" type={"submit"}>Create Shift</button>
                    <button type="button" className="bordered medium">Cancel</button>
                </div>
            </form>
        </>
    );
}

export default CreateShift;