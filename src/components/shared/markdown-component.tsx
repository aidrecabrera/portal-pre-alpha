import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
export function MarkdownComponent({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => <a {...props} className="typography-a" />,
        ul: ({ node, ...props }) => <ul {...props} className="typography-ul" />,
        ol: ({ node, ...props }) => <ol {...props} className="typography-ul" />,
        li: ({ node, ...props }) => <li {...props} />,
        p: ({ node, ...props }) => <p {...props} className="typography-p" />,
        h1: ({ node, ...props }) => <h1 {...props} className="typography-h1" />,
        h2: ({ node, ...props }) => <h2 {...props} className="typography-h2" />,
        h3: ({ node, ...props }) => <h3 {...props} className="typography-h3" />,
        table: ({ node, ...props }) => (
          <Table {...props} className="typography-table" />
        ),
        thead: ({ node, ...props }) => <TableHeader {...props} />,
        tbody: ({ node, ...props }) => <TableBody {...props} />,
        tr: ({ node, ...props }) => <TableRow {...props} />,
        th: ({ node, ...props }) => (
          <TableHead {...props} className="typography-th" />
        ),
        td: ({ node, ...props }) => (
          <TableCell {...props} className="typography-td" />
        ),
        code: ({ node, inlist, ...props }) =>
          inlist ? (
            <code {...props} className="bg-muted rounded px-1 py-0.5" />
          ) : (
            <code {...props} className="block p-2 mb-4 rounded bg-muted" />
          ),
        blockquote: ({ node, ...props }) => (
          <blockquote {...props} className="typography-blockquote" />
        ),
        hr: ({ node, ...props }) => <hr {...props} className="my-4" />,
      }}
      className="text-sm markdown-content"
    >
      {content}
    </Markdown>
  );
}
