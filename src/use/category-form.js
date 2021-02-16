import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useCategoryForm(fn) {
  const {isSubmitting, handleSubmit} = useForm()

  const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
    'title',
    yup.string()
      .trim()
      .required('Введите наименование категории')
  )
  const {value: type, errorMessage: tpError, handleBlur: tpBlur} = useField(
    'type',
    yup.string()
      .required('Введите тип категории')
  )
  const onSubmit = handleSubmit(fn)

  return {
    isSubmitting,
    onSubmit,
    title,
    tBlur,
    tError,
    type,
    tpError,
    tpBlur
  }
}