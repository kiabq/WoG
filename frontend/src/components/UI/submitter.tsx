// Libraries
import * as React from "react";
import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners"

interface ISubmitterProps {
    editing: boolean,
    loading: boolean,
    onCancel: () => void
}

export default function Submitter({ editing, loading, onCancel }: ISubmitterProps) {
    const override: CSSProperties = {
        // marginTop: "3px"
    }

    if (editing) {
        return (
            <div className='flex justify-center pt-[1.5rem] md:pt-0 mt-auto'>
                <button type='submit' className='w-20 py-1 mr-1 text-slate-50 bg-blue-500 rounded-lg' disabled={loading}>
                    {loading ? 
                        <ClipLoader 
                            size={20}
                            cssOverride={override}
                            color="text-slate-50"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> : 
                        <span>Save</span>
                    }
                </button>
                <button type='button' className='w-20 py-1 ml-1 text-blue-500 border-blue-500 border-2 rounded-lg' disabled={loading} onClick={() => onCancel()}>Cancel</button>
            </div>
        )
    } else {
        return <></>
    }
} 