import DOMPurify from "isomorphic-dompurify"
import { marked } from "marked"
import { useState } from "react"
import { FaMaximize, FaMinimize } from "react-icons/fa6"
import styled from "styled-components"

marked.setOptions({
    breaks: true,
})

const defaultText = `# Welcome to my React Markdown Previewer

## Subheading
### Subsubheading
#### Subsubsubheading

Yeah, we got some default text here.
Here is some example code: \`<div></div>\`

\`\`\`
// Multiline code:
function exampleCode(number1, number2) {
  return number1 + number 2;
}
\`\`\`

We got **bold** and _italic_ text.
Or what about **_both_**.
You can even ~~cross stuff out~~.
We got [links](https://finlaytech.ca).
We got:
> Block Quotes!\n
And if you want to get crazy, we got tables:
Crazy Header | Insane Header | Interesting Header
-|-|-
Content | More Content | Even More Content

Don't worry, we got lists too:
- Content
  - More Content
    - Even More Content
      - Still More Content
      
And don't forget about numbered lists:
1. Conent
2. More Content
3. Even More Content

Last but not least, we got pictures:
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

const StyledDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #cedcf2;
    overflow: auto;

    #markdown-previewer {
        font-family: sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        scroll-behavior: smooth;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .box {
        border: 1px solid black;
    }

    .maximized {
        width: 100%;
        min-height: 80vh;
    }

    .maximized #editor {
        height: 80vh;
    }

    #editor-box {
        max-width: 700px;
        width: 70vw;
        margin: 40px;
    }

    #editor {
        overflow-y: scroll;
        width: 100%;
        font: 16px monospace;
        padding: 10px;
        border: none;
        resize: vertical;
        margin-bottom: -6px;
        min-height: 300px;
    }

    #editor:focus {
        outline: none;
    }

    .toolbar {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-color: #727b8a;
    }

    .icon {
        padding: 10px;
        font-size: 20px;
    }

    .icon:hover {
        color: #cedcf2;
        cursor: pointer;
    }

    .icon button {
        display: flex;
        color: inherit;
        font: inherit;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    .window-header {
        font: 20px fantasy;
        padding-left: 10px;
    }

    #preview-box {
        max-width: 1000px;
        width: 90vw;
        min-height: 200px;
        margin: 20px;
        background-color: white;
    }

    #preview {
        padding: 10px;
    }

    #preview blockquote {
        border-left: 3px solid #224b4b;
        color: #224b4b;
        padding-left: 5px;
        margin-left: 25px;
    }

    #preview > p > code {
        padding: 3px;
    }

    #preview code {
        background: white;
        font-size: 0.875rem;
        font-weight: bold;
    }

    #preview pre {
        display: block;
        overflow: auto;
        background: white;
        padding: 5px;
        line-height: 1.2;
    }

    #preview h1 {
        border-bottom: 3px solid #224b4b;
    }

    #preview h2 {
        border-bottom: 1px solid #224b4b;
    }

    #preview table {
        border-collapse: collapse;
    }

    #preview td,
    #preview th {
        border: 2px solid #224b4b;
        padding-left: 5px;
        padding-right: 5px;
    }

    #preview img {
        display: block;
        max-width: 90%;
        margin: 2rem auto;
    }

    #preview ul,
    #preview ol {
        margin-top: 1em;
        margin-bottom: 1em;
        margin-left: 2em;
    }
`

export default function MarkdownPreviewer() {
    return (
        <StyledDiv>
            <UnstyledMarkdownPreviewer />
        </StyledDiv>
    )
}

const UnstyledMarkdownPreviewer = () => {
    const [editorContent, setEditorContent] = useState(defaultText)
    const [editorMaximized, setEditorMaximized] = useState(false)
    const [previewerMaximized, setPreviewerMaximized] = useState(false)

    const handleEditorChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditorContent(event.target.value)
    }

    const handleEditorMaximize = () => {
        setEditorMaximized(!editorMaximized)
        setPreviewerMaximized(false)
    }

    const handlePreviewerMaximize = () => {
        setPreviewerMaximized(!previewerMaximized)
        setEditorMaximized(false)
    }

    return (
        <div id="markdown-previewer">
            {!previewerMaximized && (
                <Editor
                    windowName="Editor"
                    content={editorContent}
                    onContentChange={handleEditorChange}
                    maximized={editorMaximized}
                    onMaximize={handleEditorMaximize}
                />
            )}
            {!editorMaximized && (
                <Previewer
                    windowName="Previewer"
                    content={editorContent}
                    maximized={previewerMaximized}
                    onMaximize={handlePreviewerMaximize}
                />
            )}
        </div>
    )
}

type EditorProps = {
    windowName: string
    content: string
    onContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    maximized: boolean
    onMaximize: () => void
}

function Editor(props: EditorProps) {
    return (
        <div className={`box${props.maximized ? " maximized" : ""}`} id="editor-box">
            <Toolbar
                name={props.windowName}
                onMaximize={props.onMaximize}
                maximized={props.maximized}
            />
            <textarea
                id="editor"
                spellCheck="false"
                defaultValue={props.content}
                onChange={props.onContentChange}
            />
        </div>
    )
}

type PreviewerProps = {
    windowName: string
    content: string
    maximized: boolean
    onMaximize: () => void
}

function Previewer(props: PreviewerProps) {
    return (
        <div className={`box${props.maximized ? " maximized" : ""}`} id="preview-box">
            <Toolbar
                name={props.windowName}
                onMaximize={props.onMaximize}
                maximized={props.maximized}
            />
            <Markdown content={props.content} />
        </div>
    )
}

function Markdown({ content }: { content: string }) {
    const sanitizedContent = DOMPurify.sanitize(marked.parse(content) as string)
    // biome-ignore lint/security/noDangerouslySetInnerHtml: content is sanitized via DOMPurify above
    return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} id="preview" />
}

type ToolbarProps = {
    name: string
    maximized: boolean
    onMaximize: () => void
}

function Toolbar(props: ToolbarProps) {
    return (
        <div className="toolbar">
            <p className="window-header">{props.name}</p>
            <div className="icon">
                {!props.maximized && (
                    <button type="button" aria-label="Maximize" onClick={props.onMaximize}>
                        <FaMaximize />
                    </button>
                )}
                {props.maximized && (
                    <button type="button" aria-label="Restore" onClick={props.onMaximize}>
                        <FaMinimize />
                    </button>
                )}
            </div>
        </div>
    )
}
