import styled from 'styled-components';

const StyledDiv = styled.div`
  @media screen and (max-width: 768px) {
    #navbar {
        width: 100%;
        padding-bottom: 20px;
    }

    main {
        padding: 0 10px;
    }

    #navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
  }

  @media screen and (min-width: 768px) {
    #navbar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        border-right: 2px solid black;
    }

    main {
        padding-top: 10px;
        padding-left: 280px;
        padding-right: 40px;
    }

    #navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 260px;
        height: 100%;
        overflow: auto;
    }

    .main-section p {
        margin-left: 20px;
    }

    .main-section>code, img, pre {
        margin-left: 20px;
    }
  }

  #technical-documentation {
    font-family: Arial, sans-serif;
  }

  .main-section p, .main-section li {
    font-size: 15px;
  }

  .nav-link {
    display: block;
    padding: 12px 16px;
    text-decoration: none;
    color: black;
    border-top: 1px solid black;
  }

  .nav-link:hover {
    background-color: #cdd0d1;
  }

  #navbar header {
    padding: 12px 16px;
    font-weight: bold;
    font-size: 20px;
  }

  main header {
    font-weight: bold;
    font-size: 20px;
  }

  img {
    max-width: 500px;
    width: 100%;
    border-radius: 8px;
  }

  .main-section {
    margin-bottom: 40px;
  }

  .main-section p {
    padding: 10px 0px;
  }

  .main-section ol, .main-section ul {
    padding-left: 60px;
  }

  code {
    background-color: #f7f7f7;
    padding: 2px 4px;
    border-radius: 4px;
  }

  pre {
    padding: 12px;
    background-color: #f7f7f7;
    border-radius: 10px;
  }

  #Anatomy_of_an_HTML_Document li {
    padding-bottom: 5px;
  }
`;

export default function TechnicalDocumentation() {
  return (
    <StyledDiv>
      <UnstyledTechnicalDocumentation />
    </StyledDiv>
  );
}

function UnstyledTechnicalDocumentation() {
  return (
    <div id="technical-documentation">
      <nav id="navbar">
        <header>HTML Basics</header>
        <ul>
          <li>
            <a className="nav-link" href="#What_is_HTML?">What is HTML?</a>
          </li>
          <li>
            <a className="nav-link" href="#Anatomy_of_an_HTML_Element">Anatomy of an HTML Element</a>
          </li>
          <li>
            <a className="nav-link" href="#Nesting_Elements">Nesting Elements</a>
          </li>
          <li>
            <a className="nav-link" href="#Void_Elements">Void Elements</a>
          </li>
          <li>
            <a className="nav-link" href="#Anatomy_of_an_HTML_Document">Anatomy of an HTML Document</a>
          </li>
          <li>
            <a className="nav-link" href="#Reference">Reference</a>
          </li>
        </ul>
      </nav>
      <main id="main-doc">
        <section className="main-section" id="What_is_HTML?">
          <header>What is HTML?</header>
          <p>HTML (<b>H</b>yper<b>T</b>ext <b>M</b>arkup <b>L</b>anguage) is the code that is used to structure a web page and its content. For example, content could be structured within a set of paragraphs, a list of bulleted points, or using images and data tables.</p>
          <p>HTML is a <i>markup language</i> that defines the structure of your content. HTML consists of a series of elements, which you use to enclose, or wrap, different parts of the content to make it appear a certain way, or act a certain way. The enclosing tags can make a word or image hyperlink to somewhere else, can italicize words, can make the font bigger or smaller, and so on.</p>
          <p>For example take the following line of content:</p>
          <code>My cat is very grumpy</code>
          <p>If we wanted the line to stand by itself, we could specify that it is a paragraph by enclosing it in paragraph tags:</p>
          <code>&lt;p&gt;My cat is very grumpy&lt;/p&gt;</code>
          <br></br>
        </section>
        <section className="main-section" id="Anatomy_of_an_HTML_Element">
          <header>Anatomy of an HTML Element</header>
          <p>Let&apos;s explore this paragraph element a bit further.</p>
          <img src="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics/grumpy-cat-small.png" alt="Paragraph Element Example" />
          <p>The main parts of our element are as follows:</p>
          <ol>
            <li>The opening tag: This consists of the name of the element (in this case, p), wrapped in opening and closing angle brackets. This states where the element begins or starts to take effect. In this case where the paragraph begins.</li>
            <li>The closing tag: This is the same as the opening tag, except that it includes a forward slash before the element name. This states where the element ends. In this case where the paragraph ends. Failing to add a closing tag is one of the standard beginner errors and can lead to strange results.</li>
            <li>The content: This is the content of the element, which in this case, is just text.</li>
            <li>The element: The opening tag, the closing tag, and the content together comprise the element.</li>
          </ol>
          <p>Elements can also have attributes that look like the following:</p>
          <img src="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics/grumpy-cat-attribute-small.png" alt="Element Attribute Example" />
          <p>Attributes contain extra information about the element that you don&apos;t want to appear in the actual content. Here, <code>class</code> is the attribute <i>name</i> and <code>editor-note</code> is the attribute <i>value</i>. The class attribute allows you to give the element a non-unique identifier that can be used to target it (and any other elements with the same <code>class</code> value) with style information and other things. Some attributes have no value, such as <code>required</code>.</p>
          <p>Attributes that set a value always have:</p>
          <ol>
            <li>A space between it and the element name (or the previous attribute, if the element already has one or more attributes).</li>
            <li>The attribute name followed by an equal sign.</li>
            <li>The attribute value wrapped by opening and closing quotation marks.</li>
          </ol>
          <p>Note: Simple attribute values that don&apos;t contain ASCII whitespace (or any of the characters <code>&quot; &apos; ` = &lt; &gt;</code>) can remain unquoted, but it is recommended that you quote all attribute values, as it makes the code more consistent and understandable.</p>
        </section>
        <section className="main-section" id="Nesting_Elements">
          <header>Nesting Elements</header>
          <p>You can put elements inside other elements too. This is called <b>nesting</b>. If we wanted to state that our cat is <b>very</b> grumpy, we could wrap the word &quot;very&quot; in a <code>&lt;strong&gt;</code> element, which means that the word is to be strongly emphasized:</p>
          <code>&lt;p&gt;My cat is <code>&lt;strong&gt;</code>very&lt;/strong&gt; grumpy.&lt;/p&gt;</code>
          <p>You do however need to make sure that your elements are properly nested. In the example above, we opened the <code>&lt;p&gt;</code> element first, then the <code>&lt;strong&gt;</code> element; therefore, we have to close the <code>&lt;strong&gt;</code> element first, then the <code>&lt;p&gt;</code> element. The following is incorrect:</p>
          <code>&lt;p&gt;My cat is &lt;strong&gt;very grumpy.&lt;/p&gt;&lt;/strong&gt;</code>
          <p>The elements have to open and close correctly so that they are clearly inside or outside one another. If they overlap as shown above, then your web browser will try to make the best guess at what you were trying to say, which can lead to unexpected results. So don&apos;t do it!</p>
        </section>
        <section className="main-section" id="Void_Elements">
          <header>Void Elements</header>
          <p>Some elements have no content and are called void elements. Take this example <code>&lt;img&gt;</code> element:</p>
          <code>&lt;img src=&quot;images/firefox-icon.png&quot; alt=&quot;My test image&quot; /&gt;</code>
          <p>This contains two attributes, but there is no closing <code>&lt;/img&gt;</code> tag and no inner content. This is because an image element doesn&apos;t wrap content to affect it. Its purpose is to embed an image in the HTML page in the place it appears.</p>
        </section>
        <section className="main-section" id="Anatomy_of_an_HTML_Document">
          <header>Anatomy of an HTML Document</header>
          <p>That wraps up the basics of individual HTML elements, but they aren&apos;t handy on their own. Now we&apos;ll look at how individual elements are combined to form an entire HTML page. Here is an example:</p>
          <pre>
{`<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
      <title>My test page</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My test image" />
  </body>
</html>
`}
          </pre>
          <p>Here, we have the following:</p>
          <ul>
            <li><code>&lt;!DOCTYPE html&gt;</code> is the doctype. It is a required preamble. In the mists of time, when HTML was young (around 1991/92), doctypes were meant to act as links to a set of rules that the HTML page had to follow to be considered good HTML, which could mean automatic error checking and other useful things. However, these days, they don&apos;t do much and are basically just needed to make sure your document behaves correctly. That&apos;s all you need to know for now.</li>
            <li><code>&lt;html&gt;&lt;/html&gt;</code> is the <code>&lt;html&gt;</code> element. This element wraps all the content on the entire page and is sometimes known as the root element. It also includes the lang attribute, setting the primary language of the document.</li>
            <li><code>&lt;head&gt;&lt;/head&gt;</code> is the <code>&lt;head&gt;</code> element. This element acts as a container for all the stuff you want to include on the HTML page that isn&apos;t the content you are showing to your page&apos;s viewers. This includes things like keywords and a page description that you want to appear in search results, CSS to style our content, character set declarations, and more.</li>
            <li><code>&lt;meta charset=&quot;utf-8&quot;&gt;</code> This element sets the character set your document should use to UTF-8 which includes most characters from the vast majority of written languages. Essentially, it can now handle any textual content you might put on it. There is no reason not to set this, and it can help avoid some problems later on.</li>
            <li><code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;&gt;</code>. This viewport element ensures the page renders at the width of viewport, preventing mobile browsers from rendering pages wider than the viewport and then shrinking them down.</li>
            <li><code>&lt;title&gt;&lt;/title&gt;</code> is the <code>&lt;title&gt;</code> element. This sets the title of your page, which is the title that appears in the browser tab the page is loaded in. It is also used to describe the page when you bookmark/favorite it.</li>
            <li><code>&lt;body&gt;&lt;/body&gt;</code> is the <code>&lt;body&gt;</code> element. This contains all the content that you want to show to web users when they visit your page, whether that&apos;s text, images, videos, games, playable audio tracks, or whatever else.</li>
          </ul>
        </section>
        <section className="main-section" id="Reference">
          <header>Reference</header>
          <p>All documentation was taken from <a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics">MDN</a>.</p>
        </section>
      </main>
    </div>
  );
}