import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_POST } from '../graphql/mutations'
import { All_POST } from '../graphql/queries';

const initialFormValue = {
    title: '',
    description: '',
    image: ''
}

export const useFormAddPost = (initialForm, validateFrom, images, setImages) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [errorsMessage, setErrosMessage] = useState(null)
    const [completeMessage, setCompledMessage] = useState(null)


    const [createPost] = useMutation(ADD_POST, {
        refetchQueries: [{query: All_POST}],
        onCompleted: (data) => {
            notifyCompled('Publicacion creada con éxito')
        },
        onError: (error) => {
            notifyErrors('Error con esta peticion, intentelo nuevamenta mas tarde!');
        }
    })


    const notifyCompled = message => {
        setCompledMessage(message)
        setForm(initialFormValue)
        setImages(null)
        setTimeout(() => {
            setCompledMessage(null)
        }, 3000)
    }
    const notifyErrors = message => {
        setErrosMessage(message)
        setTimeout(() => {
            setErrosMessage(null)
        }, 3000)
    }

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
        if (Object.keys(errors).length === 0) {
                createPost({
                    variables: {
                        title: form.title,
                        description: form.description,
                        image: images ? images : ''
                    }
                })
            setTimeout(() => {
                setLoading(false)
            }, [2000])
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