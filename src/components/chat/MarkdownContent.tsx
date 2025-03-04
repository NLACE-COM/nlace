
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <ReactMarkdown 
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        // Customize how code blocks are rendered
        code: ({node, className, children, ...props}: any) => {
          const match = /language-(\w+)/.exec(className || '');
          return !props.inline ? (
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 my-2 overflow-auto rounded">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded" {...props}>
              {children}
            </code>
          )
        },
        // Customize image rendering
        img: ({node, ...props}: any) => (
          <img className="max-w-full rounded my-2" {...props} />
        ),
        // Customize table rendering
        table: ({node, ...props}: any) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
          </div>
        ),
        th: ({node, ...props}: any) => (
          <th className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium uppercase tracking-wider" {...props} />
        ),
        td: ({node, ...props}: any) => (
          <td className="px-3 py-2 whitespace-nowrap text-sm" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
