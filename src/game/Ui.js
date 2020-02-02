import React, { useCallback } from 'react'

import { useGameState } from './state'
import './Ui.css'

export function Ui({ children }) {
  const [{ currentTurn, currentCO, maxCO, goalCO, currentPO, maxPO }, dispatch] = useGameState()

  const isStarted = currentTurn > 0
  const currentYear = currentTurn + 2019
  const currentPos = currentCO / maxCO
  const goalPos = goalCO / maxCO
  const resourcePos = currentPO / maxPO

  const handleStart = useCallback(() => dispatch({ type: 'game:start' }))

  return (
    <div className="Ui">
      <header className="Ui-header">
        <div className='Ui-thermo'>
          <div className='Ui-thermo-meter Ui-thermo-meter--goal' />
          {/* TODO: a11y for current value */}
          <div className='Ui-thermo-meter Ui-thermo-meter--current' style={{ '--x': currentPos.toFixed(2) }} />
          
          <div className='Ui-year' style={{ '--x': currentPos.toFixed(2) }} onClick={isStarted ? undefined : handleStart}>
            <div className="Ui-year-text">
              {isStarted ? currentYear : 'START'}
            </div>
          </div>
        </div>
      </header>
      <div className="Ui-canvas">
        {children}
      </div>
      <footer className="Ui-footer">
        <div className='Ui-resource'>
          {/* TODO: a11y for current value */}
          <div className='Ui-resource-value' style={{ '--x': resourcePos.toFixed(2) }} />
        </div>
      </footer>
    </div>
  )
}

export default Ui