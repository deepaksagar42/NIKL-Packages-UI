import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Code, Heading, Text, Separator } from '@radix-ui/themes';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  return (
    <Box className={`markdown-content ${className || ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Box mb="3" mt="4">
              <Heading size="6" weight="bold" color="gray">
                {children}
              </Heading>
            </Box>
          ),
          h2: ({ children }) => (
            <Box mb="3" mt="4">
              <Heading size="5" weight="bold" color="gray">
                {children}
              </Heading>
              <Separator size="4" mt="2" />
            </Box>
          ),
          h3: ({ children }) => (
            <Box mb="2" mt="4">
              <Heading size="4" weight="bold" color="gray">
                {children}
              </Heading>
            </Box>
          ),
          h4: ({ children }) => (
            <Box mb="2" mt="3">
              <Heading size="3" weight="medium" color="gray">
                {children}
              </Heading>
            </Box>
          ),
          h5: ({ children }) => (
            <Box mb="2" mt="3">
              <Heading size="2" weight="medium" color="gray">
                {children}
              </Heading>
            </Box>
          ),
          h6: ({ children }) => (
            <Box mb="2" mt="3">
              <Heading size="1" weight="medium" color="gray">
                {children}
              </Heading>
            </Box>
          ),
          p: ({ children }) => (
            <Box mb="3">
              <Text as="p" size="2" style={{ lineHeight: 1.6 }}>
                {children}
              </Text>
            </Box>
          ),          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ 
                color: 'var(--accent-9)', 
                textDecoration: 'underline', 
                textUnderlineOffset: '0.2em',
                fontFamily: 'inherit'
              }}
            >
              <Text size="2" style={{ display: 'inline' }}>{children}</Text>
            </a>
          ),          ul: ({ children }) => (
            <div style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
              <ul className="markdown-list" style={{ margin: 0 }}>{children}</ul>
            </div>
          ),
          ol: ({ children }) => (
            <div style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
              <ol className="markdown-list" style={{ margin: 0 }}>{children}</ol>
            </div>
          ),
          li: ({ children }) => (
            <div style={{ marginBottom: '0.375rem' }}>
              <Text as="span" size="2" style={{ lineHeight: 1.5 }}>
                {children}
              </Text>
            </div>
          ),          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isInline = !className || !className.includes('language-');
            
            return isInline ? (
              <Code>{children}</Code>
            ) : (
              <Box mb="4">
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: '6px',
                    backgroundColor: 'var(--gray-3)',
                    overflow: 'auto',
                  }}
                >
                  <pre style={{ margin: 0 }}>
                    <code className={language ? `language-${language}` : ''}>
                      {String(children).replace(/\n$/, '')}
                    </code>
                  </pre>
                </div>
              </Box>
            );
          },
          blockquote: ({ children }) => (
            <Box
              mb="4"
              style={{
                borderLeft: '4px solid var(--gray-6)',
                paddingLeft: '1rem',
                marginLeft: '0',
                color: 'var(--gray-11)',
              }}
            >
              {children}
            </Box>
          ),
          table: ({ children }) => (
            <Box mb="4" style={{ overflow: 'auto' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                {children}
              </table>
            </Box>
          ),
          thead: ({ children }) => <thead>{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr style={{ borderBottom: '1px solid var(--gray-6)' }}>
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th
              style={{
                padding: '0.5rem',
                textAlign: 'left',
                fontWeight: 'bold',
                borderBottom: '2px solid var(--gray-6)',
              }}
            >
              <Text size="2" weight="bold">{children}</Text>
            </th>
          ),
          td: ({ children }) => (
            <td style={{ padding: '0.5rem', textAlign: 'left' }}>
              <Text size="2">{children}</Text>
            </td>
          ),
          img: ({ src, alt }) => (
            <Box mb="4" style={{ textAlign: 'center' }}>
              <img 
                src={src} 
                alt={alt || ''} 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  borderRadius: '6px'
                }} 
              />
              {alt && (
                <Text as="div" size="1" color="gray" style={{ marginTop: '0.5rem' }}>
                  {alt}
                </Text>
              )}
            </Box>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
