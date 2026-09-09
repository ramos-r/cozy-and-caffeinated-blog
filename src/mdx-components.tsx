import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="font-serif text-2xl mt-10 mb-4" {...props} />,
  h3: (props) => <h3 className="font-serif text-xl mt-8 mb-3" {...props} />,
  p: (props) => <p className="leading-relaxed mb-5" {...props} />,
  a: (props) => (
    <a className="text-accent underline underline-offset-2 hover:no-underline" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-accent pl-4 my-6 font-serif italic text-lg text-muted-foreground"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc pl-5 mb-5 space-y-2 leading-relaxed" {...props} />,
  ol: (props) => <ol className="list-decimal pl-5 mb-5 space-y-2 leading-relaxed" {...props} />,
  li: (props) => <li {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
};
