import React from 'react'

import { useGameState } from './state'
import './Ui.css'

export function Ui({ children }) {
  const [{ currentTurn }] = useGameState()

  return (
    <div className="Ui">
      <header className="Ui-header">TURN: {currentTurn}</header>
      <div className="Ui-canvas">
        {children}
      </div>
      <footer className="Ui-footer"></footer>
    </div>
  )
}

export default Ui