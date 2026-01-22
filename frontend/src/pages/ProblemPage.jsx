import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PROBLEMS } from '../data/problems.js'
import Navbar from '../components/Navbar'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ProblemDescription from '../components/ProblemDescription.jsx'
import CodeEditorPanel from '../components/CodeEditorPanel.jsx'
import OutputPanel from '../components/OutputPanel.jsx'
import { executeCode } from '../lib/piston.js'

import toast from "react-hot-toast";

const ProblemPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [currentProblemId, setCurrentProblemId] = useState("two-sum")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const currentProblem = PROBLEMS[currentProblemId]

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id)
      setCode(PROBLEMS[id].starterCode[selectedLanguage])
      setOutput(null)
    }
  }, [id, selectedLanguage])

  const handleLanguageChange = (newLanguage) => { setSelectedLanguage(newLanguage) }

  const handleProblemChange = (newProblemId) => { navigate(`/problem/${newProblemId}`) }

  const triggerConfetti = () => { }

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual == normalizedExpected;
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput(null)

    const result = await executeCode(selectedLanguage, code)
    setOutput(result)
    console.log("THE RESULT: ", result)
    setIsRunning(false)

    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage]
      const testPassed = checkIfTestPassed(result.output, expectedOutput)

      if (testPassed) {
        toast.success("Well Done!!")
      } else {
        toast.error("OOPS! some error is in the code\nwe believe you can do it")
      }
    }
  }
  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* left panel- problem desc */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* right panel- code editor & output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel - Code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              {/* Bottom panel - Output Panel*/}

              <Panel defaultSize={30} minSize={30}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}

export default ProblemPage
