import { useNotification } from "../hooks/useNotification"

const Notification = () => {
  const { notification } = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: notification.type === 'error' ? 'red' : 'green',
    backgroundColor: notification.type === 'error' ? 'pink' : 'lightgreen'
  }
  
  if (!notification.message) return null

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification