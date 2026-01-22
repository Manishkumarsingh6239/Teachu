import React from 'react'
import { LANGUAGE_CONFIG } from '../data/problems'
function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode
}) {
  return (
    <div className='h-full bg-base-300 flex flex-col'>
      <div className="flex items-center justify-baseline px-4 py-3 bg-base-100 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img 
          src={LANGUAGE_CONFIG[selectedLanguage].icon}
          alt={LANGUAGE_CONFIG[selectedLanguage].name} 
          className='size-6'
          />
          <select className='select select-sm'
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default CodeEditorPanel
