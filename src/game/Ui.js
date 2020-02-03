import React, { useCallback } from 'react'

import { useGameState } from './state'
import './Ui.css'

export function Ui({ children }) {
  const [{ currentTurn, currentCO, maxCO, goalCO, currentPO, maxPO }, dispatch] = useGameState()

  const isStarted = currentTurn > 0
  const currentYear = currentTurn + 2019
  
  const resourcePos = currentPO / maxPO
  const currentPos = currentCO / maxCO
  const goalPos = goalCO / maxCO
  const handleStart = useCallback(() => dispatch({ type: 'game:start' }))

  const effectOpacity = currentPos < 0.6 ? 0 : currentPos - 0.5

  return (
    <div className="Ui">
      <header className="Ui-header">
        <div className='Ui-thermo'>
          <div className='Ui-thermo-inner'>
            <div className='Ui-thermo-meter Ui-thermo-meter--goal' style={{ '--x': goalPos.toFixed(2) }} />
            {/* TODO: a11y for current value */}
            <div className='Ui-thermo-meter Ui-thermo-meter--current' style={{ '--x': currentPos.toFixed(2) }} />
            <div className='Ui-thermo-meter Ui-thermo-meter--boil' style={{ '--x': 1 }} />
            
            <div className='Ui-year' style={{ '--x': currentPos.toFixed(2) }} onClick={isStarted ? undefined : handleStart}>
              <div className="Ui-year-text">
                {isStarted ? currentYear : 'START'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="Ui-canvas">
        {children}
        <div className="Ui-canvas-effect" style={{ '--opacity': effectOpacity }} />
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