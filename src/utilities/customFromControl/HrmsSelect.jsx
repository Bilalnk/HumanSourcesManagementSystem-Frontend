import React from 'react'
import { useField } from 'formik'
import { FormField, Label } from 'semantic-ui-react'

function HrmsSelect({props}) {

        const [field, meta] = useField(props)

        return (
                <FormField error={meta.touched && !!meta.error}>
                        <label>{field.name}</label>
                        <select {...field} {...props} >

                                <option></option>

                        </select>


                        {meta.touched && !!meta.error ? (
                                <Label pointing basic color="red" content={meta.error} />
                        ) : null}
                </FormField>
        )
}

export default HrmsSelect
