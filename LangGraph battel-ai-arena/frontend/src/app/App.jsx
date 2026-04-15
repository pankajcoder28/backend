import React, { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MOCK_DATA = [
  {
    id: 1,
    problem: "Write a short Python function to calculate the Fibonacci sequence.",
    solution_1: "```python\ndef fibonacci(n):\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    seq = [0, 1]\n    for i in range(2, n):\n        seq.append(seq[-1] + seq[-2])\n    return seq\n```\nThis function iteratively calculates the sequence.",
    solution_2: "```python\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n\ndef get_fib_seq(n):\n    return [fib(i) for i in range(n)]\n```\nThis approach uses recursion to build the sequence.",
    judge: {
      solution_1_score: 9,
      solution_2_score: 6,
      solution_1_feedback: "Solution 1 is highly efficient and avoids the exponential time complexity of simple recursion. It uses iteration, making it safe for larger values of n.",
      solution_2_feedback: "Solution 2 uses naive recursion, leading to O(2^n) time complexity, which is highly inefficient for large n. It also calculates values redundantly."
    }
  },
  {
    id: 2,
    problem: "Explain the concept of closures in JavaScript with a simple example.",
    solution_1: "A closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function's variables, scope chain. \n\n```javascript\nfunction makeCounter() {\n  let count = 0;\n  return function() {\n    return count++;\n  };\n}\n\nlet counter = makeCounter();\nconsole.log(counter()); // 0\nconsole.log(counter()); // 1\n```",
    solution_2: "In JS, closures are created every time a function is created, at function creation time. It gives you access to an outer function's scope from an inner function.\n\n```javascript\nconst add = (function () {\n  let counter = 0;\n  return function () {counter += 1; return counter}\n})();\n\nadd(); // 1\nadd(); // 2\n```",
    judge: {
      solution_1_score: 10,
      solution_2_score: 8,
      solution_1_feedback: "Excellent explanation. The `makeCounter` example is a classic and very clean way to demonstrate encapsulation through closures.",
      solution_2_feedback: "Good explanation, but using an IIFE (Immediately Invoked Function Expression) for the example might confuse beginners slightly compared to a standard higher-order function."
    }
  }
];


function MarkdownRenderer({ content }) {
  return (
    <div className="prose-custom text-sm leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

function SolutionCard({ title, solution, score, highlighted }) {
  return (
    <div className={`flex flex-col h-full rounded-2xl p-6 transition-colors duration-300 ${highlighted ? 'bg-[#1e2430] border border-[#3b82f6]/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)]'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-dark-text)]">{title}</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${score >= 8 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
          Score: {score}/10
        </div>
      </div>
      
      <div className="flex-grow">
        <MarkdownRenderer content={solution} />
      </div>
    </div>
  );
}

function ChatMessage({ data }) {
  const isSol1Winner = data.judge.solution_1_score >= data.judge.solution_2_score;
  const isSol2Winner = data.judge.solution_2_score >= data.judge.solution_1_score;

  return (
    <div className="py-12 border-b border-[var(--color-dark-border)] border-opacity-50">
      {/* Problem Section */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
            U
          </div>
          <div className="pt-1.5">
            <h2 className="text-xl md:text-2xl font-medium text-[var(--color-dark-text)] leading-snug">
              {data.problem}
            </h2>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <SolutionCard 
          title="Model A" 
          solution={data.solution_1} 
          score={data.judge.solution_1_score} 
          highlighted={isSol1Winner && !isSol2Winner}
        />
        <SolutionCard 
          title="Model B" 
          solution={data.solution_2} 
          score={data.judge.solution_2_score} 
          highlighted={isSol2Winner && !isSol1Winner}
        />
      </div>

      {/* Judge Recommendation Section */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl p-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Judge Recommendation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-5 rounded-xl border ${isSol1Winner && !isSol2Winner ? 'bg-blue-500/10 border-blue-500/30' : 'bg-[#0d1117] border-[var(--color-dark-border)]'} transition-all`}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-white/90">Model A Evaluation</span>
              </div>
              <p className="text-sm text-[var(--color-dark-text)]/90 leading-relaxed italic">"{data.judge.solution_1_feedback}"</p>
            </div>
            
            <div className={`p-5 rounded-xl border ${isSol2Winner && !isSol1Winner ? 'bg-blue-500/10 border-blue-500/30' : 'bg-[#0d1117] border-[var(--color-dark-border)]'} transition-all`}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-white/90">Model B Evaluation</span>
              </div>
              <p className="text-sm text-[var(--color-dark-text)]/90 leading-relaxed italic">"{data.judge.solution_2_feedback}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    // In a real app, we would send this to the backend
    setInputVal("");
    alert("In a real application, this would dispatch the problem to the AI Battle Arena backend.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full sticky top-0 z-10 bg-[var(--color-dark-bg)]/80 backdrop-blur-md border-b border-[var(--color-dark-border)] h-16 flex items-center justify-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Battle Arena
        </h1>
      </header>

      {/* Messages List */}
      <main className="w-full flex-grow pb-32">
        {MOCK_DATA.map((msg) => (
          <ChatMessage key={msg.id} data={msg} />
        ))}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 w-full bg-gradient-to-t from-[var(--color-dark-bg)] via-[var(--color-dark-bg)] to-transparent pt-10 pb-6 px-4">
        <div className="max-w-4xl mx-auto">
          <form 
            onSubmit={handleSend}
            className="flex items-center gap-3 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] p-2 pl-6 rounded-full shadow-2xl focus-within:ring-2 focus-within:ring-blue-500/50 transition-all font-sans"
          >
            <input 
              type="text" 
              className="flex-grow bg-transparent border-none outline-none text-[var(--color-dark-text)] placeholder-[var(--color-dark-text-muted)] h-10" 
              placeholder="Submit a problem to the arena..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[var(--color-dark-surface)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
          <div className="text-center mt-3 text-xs tracking-wide text-[var(--color-dark-text-muted)]">
            AI Battle Arena compares multiple models to find the best solution.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
