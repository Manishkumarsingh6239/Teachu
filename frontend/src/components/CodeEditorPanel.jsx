import Editor from '@monaco-editor/react'
import {Loader2Icon, PlayIcon} from 'lucide-react'
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
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300 gap-2">
        <div className="flex items-center gap-3">
          <img 
          src={LANGUAGE_CONFIG[selectedLanguage].icon}
          alt={LANGUAGE_CONFIG[selectedLanguage].name} 
          className='size-6'
          />
          <select className='select select-sm'
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e)}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.name}</option>
            ))}
          </select>
        </div>
        <button className='btn btn-sm btn-primary gap-2' onClick={onRunCode}>
            {isRunning ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                Running...
              </>
            ):
            (
              <>
                <PlayIcon className="size-4" />
                Run Code
              </>
            )
            }
        </button>
      </div>

      <div className="flex-1">
        <Editor 
        height="100%"
        language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
        value={code}
        onChange={onCodeChange}
        theme='vs-dark'
        options={{
          fontSize:14,
          lineNumbers:"on",
          scrollBeyondLastLine:true,
          automaticLayout:true,
          minimap:{enabled:false}
        }}
        />
      </div>
    </div>
  )
}

export default CodeEditorPanel
