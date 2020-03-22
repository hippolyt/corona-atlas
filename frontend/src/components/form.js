import React from 'react'
import { Form as BForm, FormControl } from 'react-bootstrap'
import { useForm, useField } from 'informed'

export function TextInput(props) {
    const { fieldState, fieldApi, render, ref, userProps } = useField({ ...props })

    const { value } = fieldState
    const { setValue, setTouched } = fieldApi
    const { onChange, onBlur, ...rest } = userProps

    return render(
        <FormControl
            {...rest}
            ref={ref}
            value={!value && value !== 0 ? '' : value}
            onChange={e => {
                setValue(e.target.value);
                if (onChange) {
                    onChange(e);
                }
            }}
            onBlur={e => {
                setTouched(true);
                if (onBlur) {
                    onBlur(e)
                }
            }}
        />
    )
}

export function SelectInput(props) {
    const { fieldState, fieldApi, render, ref, userProps } = useField({ ...props })

    const { value } = fieldState
    const { setValue, setTouched } = fieldApi
    const { onChange, onBlur, ...rest } = userProps

    return render(
        <FormControl
            as="select"
            {...rest}
            ref={ref}
            value={!value && value !== 0 ? '' : value}
            onChange={e => {
                setValue(e.target.value);
                if (onChange) {
                    onChange(e);
                }
            }}
            onBlur={e => {
                setTouched(true);
                if (onBlur) {
                    onBlur(e)
                }
            }}
        />
    )
}

export function Form(props) {
    const { children, ...rest } = props

    const {
        formController,
        render,
        userProps
    } = useForm(rest)


    return render(
        <BForm
            {...userProps}
            onReset={formController.reset}
            onSubmit={formController.submitForm}
            onKeyDown={formController.keyDown}>
            {children}
        </BForm>
    )
}
