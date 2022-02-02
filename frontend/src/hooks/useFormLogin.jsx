import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { CREATE_USER, LOGIN } from '../graphql/mutations'


const initialFormValue = {
    name: '',
    email: '',
    password: ''
}

export const useFormLogin = (initialForm, validateFrom, register) => {
    const { activateAuth } = useContext(Context)

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [errorsMessage, setErrosMessage] = useState(null)
    const [completeMessage, setCompledMessage] = useState(null)


    const notifyCompled = message => {
        setCompledMessage(message)
        setForm(initialFormValue)
        setTimeout(() => {
            window.location.reload()
        }, 3400)
    }

    const notifyErrors = message => {
        setErrosMessage(message)
        setTimeout(() => {
            setErrosMessage(null)
        }, 3000)
    }

    const [createUser] = useMutation(CREATE_USER, {
        // refetchQueries: [{query: ALL_QUERIES}],
        onCompleted: (data) => {
            notifyCompled('Bienvenido a Hydro! ahora puedes iniciar  sesión')
        },
        onError: (error) => {
            notifyErrors(error.graphQLErrors[0].message)
        },
    })

    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const user = data.signIn
            activateAuth({...user})
        },
        onError: (error) => {
            notifyErrors(error.graphQLErrors[0].message)
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleBlur = (e) => {
        handleChange(e)
        setErrors(validateFrom(form))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validateFrom(form))
        setLoading(true)
        if (!register && !errors.email && !errors.password) {
            console.log('form', form, register)
            login({
                variables: {
                    email: form.email,
                    password: form.password
                }
            })
        }

        if (Object.keys(errors).length === 0) {
            if (register) {
                createUser({
                    variables: {
                        username: form.name,
                        email: form.email,
                        password: form.password
                    }
                })
            }
            setTimeout(() => {
                setLoading(false)
            }, [5000])
        } else {
            return
        }
    }

    return {
        form,
        errors,
        loading,
        errorsMessage,
        handleChange,
        handleBlur,
        handleSubmit,
        completeMessage
    }
}