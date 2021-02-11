import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'
import { computed} from 'vue'

export function useProductForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      category: 'fruit'
    }
  })
  const store = useStore()

  const categories = computed (() => store.getters['category/categories'])

  const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
    'title',
    yup.string()
      .trim()
      .required('Введите наименование товара')
  )
  const {value: price, errorMessage: pError, handleBlur: pBlur} = useField(
    'price',
    yup.number()
      .required('Введите цену')
      .min(10, 'Цена не может быть меньше 10')
  )
  const {value: count, errorMessage: cError, handleBlur: cBlur} = useField(
    'count',
    yup.number()
      .required('Введите количество')
      .min(0, 'Количество не может быть меньше 0')
  )

  const {value: img, errorMessage: iError, handleBlur: iBlur} = useField(
    'img',
    yup.string()
      .trim()
      .required('Введите ссылку на изображение')
  )

  const {value: category} = useField('category')

  const onSubmit = handleSubmit(fn)

  return {
    category,
    isSubmitting,
    onSubmit,
    title,
    tBlur,
    tError,
    price,
    count,
    pError,
    pBlur,
    cError,
    cBlur,
    img,
    iBlur,
    iError,
    categories
  }
}