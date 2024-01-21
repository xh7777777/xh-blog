import { Marked } from "marked"
import hljs from 'highlight.js';
import { markedHighlight } from "marked-highlight";
type PostProps = {
    content: string
}

const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

export default async function MdToHtml({ content }: PostProps) {;
    const trustedContent = await marked.parse(content)
    return (
        <div dangerouslySetInnerHTML={{ __html: trustedContent }} className="prose dark:prose-invert w-full max-w-none" />
    )
}
