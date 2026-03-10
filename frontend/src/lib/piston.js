// Wandbox API for code execution (replaces Piston which now returns 401)

const WANDBOX_API = "https://wandbox.org/api/compile.json";

const LANGUAGE_COMPILERS = {
  javascript: "nodejs-20.17.0",
  python: "cpython-3.14.0",
  java: "openjdk-jdk-22+36",
  cpp: "gcc-13.2.0",
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const compiler = LANGUAGE_COMPILERS[language];

    if (!compiler) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    // Wandbox saves Java files as prog.java, so `public class` causes an error
    let sourceCode = code;
    if (language === "java") {
      sourceCode = code.replace(/public\s+class\s+/g, "class ");
    }

    const response = await fetch(WANDBOX_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: sourceCode,
        compiler,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    const compilerError = data.compiler_error || "";
    const programError = data.program_error || "";
    const output = data.program_output || "";

    if (compilerError) {
      return {
        success: false,
        output: output,
        error: compilerError,
      };
    }

    if (programError) {
      return {
        success: false,
        output: output,
        error: programError,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}