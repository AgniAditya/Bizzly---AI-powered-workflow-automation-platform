import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';
import { useState } from 'react';

function AIResponse({ text }: { text: string }) {
  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');

      if (match) {
        return <CodeBlock language={match[1]} code={codeString} />;
      }
      return (
        <code className="bg-gray-800 px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300"
        >
          {children}
        </a>
      );
    },
  };

  return (
    <div className="w-full h-fit justify-start flex">
      <div className="text-white text-md px-4 py-2 rounded-lg">
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>

      <SyntaxHighlighter style={oneDark} language={language} PreTag="div">
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponse;
