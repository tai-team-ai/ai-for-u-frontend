import { createContext, useState, useEffect } from 'react'
import { Alert, Snackbar, Slide } from '@mui/material'

export const SnackBarContext = createContext<{ addAlert: (alert: string) => void }>({ addAlert: () => {} })

const AUTO_DISMISS = 6000

export function SnackBarProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [alerts, setAlerts] = useState<string[]>([])

  const activeAlertIds = alerts.join(',')
  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const timer = setTimeout(() => { setAlerts((alerts) => alerts.slice(1)) }, AUTO_DISMISS)
      return () => { clearTimeout(timer) }
    }
  }, [activeAlertIds])

  const addAlert = (alert: string): void => { setAlerts((alerts) => [alert, ...alerts]) }

  const value = { addAlert }
  console.log('alerts', alerts)
  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {alerts.map((message, index) => (
        <div
          style={{
            position: 'fixed'
          }}
        >
          <Snackbar
            key={index}
            open={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={Slide}
            style={{ bottom: `${(alerts.length - index) * 100 - 80}px` }}
          >
            <Alert severity="error">{message}</Alert>
          </Snackbar>
        </div>
      ))}
    </SnackBarContext.Provider>
  )
}
