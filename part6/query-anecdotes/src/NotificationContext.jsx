import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })

  const handleNotification = ({ message, type }) => {
    setNotification({
      message,
      type
    })
    setTimeout(() => {
      setNotification({
        message: '',
        type: ''
      })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, handleNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}