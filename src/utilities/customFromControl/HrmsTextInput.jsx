import React from 'react'
import { useField } from 'formik'
import { FormField, Label } from 'semantic-ui-react'


function HrmsTextInput({...props}) {

        const [field, meta] =useField(props)
        // console.log(props)
        // console.log(field.value)
        // console.log(meta.value)
        
        return (
                <FormField error={meta.touched && !!meta.error}>
                        <label>{field.name}</label>
                        <input {...field} {...props}/>
                                {meta.touched && !!meta.error ? (
                                        <Label pointing basic color="red"  content={meta.error}/>
                                ): null }
                </FormField>
        )
}
export default HrmsTextInput

