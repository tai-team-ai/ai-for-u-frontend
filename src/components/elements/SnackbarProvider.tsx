import { createContext, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

export const SnackBarContext = createContext<{ addAlert: (alert: string) => void }>({ addAlert: () => {} })

const AUTO_DISMISS = 8000

export function SnackBarProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [alerts, setAlerts] = useState<string[]>([])

  const activeAlertIds = alerts.join(',')
  const onClose = (): void => {
    if (activeAlertIds.length > 0) {
      setAlerts((alerts) => alerts.slice(0, alerts.length - 1))
    }
  }

  const addAlert = (alert: string): void => { setAlerts((alerts) => [alert, ...alerts]) }

  const value = { addAlert }
  console.log('alerts', alerts)
  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {alerts.map((alert) => (
        <div style={{
          position: 'fixed',
          bottom: '16px'
        }}>
          <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} key={alert} autoHideDuration={AUTO_DISMISS} onClose={onClose}>
            <Alert severity="error">{alert}</Alert>
          </Snackbar>
        </div>
      ))}

    </SnackBarContext.Provider>
  )
}
