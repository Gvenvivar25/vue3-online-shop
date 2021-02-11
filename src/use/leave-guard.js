import {onBeforeRouteLeave, useRouter} from 'vue-router'
import {ref} from 'vue'

export function useLeaveGuard(hasChanges) {

  const router = useRouter()
  const canLeave = ref(false)
  const leaveTo = ref('')
  const saveChanges = ref(false)

  const navigate = () => {
    saveChanges.value = false
    canLeave.value = true
    router.push(leaveTo.value)
  }

  onBeforeRouteLeave(to => {
    leaveTo.value = to.path
    if(canLeave.value) {
      return true
    }

    if(hasChanges.value) {
      saveChanges.value = true
      return false
    }
    return true
  })

  return {saveChanges, navigate}
}