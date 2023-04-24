import { createContext, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

export const SnackBarContext = createContext<{ addAlert: (alert: string) => void }>({ addAlert: () => {} })

const AUTO_DISMISS = 5000

export function SnackBarProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [alerts, setAlerts] = useState<string[]>([])

  const addAlert = (alert: string): void => { setAlerts((alerts) => [alert, ...alerts]) }

  const value = { addAlert }
  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {alerts.map((alert) =>
        <Snackbar key={alert} autoHideDuration={AUTO_DISMISS} open={true}>
          <Alert severity="error">{alert}</Alert>
        </Snackbar>
      )}
    </SnackBarContext.Provider>
  )
}
