# Rainbow Brackets for Obsidian

Makes nested brackets readable in plain Markdown text — like rainbow brackets in VS Code.

- **Colors by depth** — `()`, `[]` and `{}` are colored by nesting level (4 colors, cycling). Both brackets of a pair share a color.
- **Pair at the cursor** — the bracket next to the cursor and its match get a highlight.
- **Unmatched brackets** — shown in red with a dotted underline. In `[ ( ]` only the `(` is flagged.

Ignored: brackets inside inline code, code blocks, math (`$...$`) and frontmatter, escaped brackets (`\(`), and ordered list markers like `1)` / `a)` at the start of a line.

Works in the editor (Live Preview and Source mode). Reading view is not affected. Desktop and mobile.

## Installation

**From Community plugins:** Settings → Community plugins → Browse → search "Rainbow Brackets".

**Manually:** download `main.js`, `manifest.json` and `styles.css` from the [latest release](https://github.com/yndarra/obsidian-rainbow-brackets/releases/latest) into `<your vault>/.obsidian/plugins/rainbow-brackets/`, then enable the plugin in Settings → Community plugins.

**With [BRAT](https://github.com/TfTHacker/obsidian42-brat):** add `yndarra/obsidian-rainbow-brackets`.

## Customizing colors

Create a CSS snippet (Settings → Appearance → CSS snippets) and override the variables:

```css
body.theme-dark {
	--rb-0: #ffb20d;  /* level 1 */
	--rb-1: #da70d6;  /* level 2 */
	--rb-2: #4fc1ff;  /* level 3 */
	--rb-3: #6fdc8c;  /* level 4 */
	--rb-bad: #ff4d4d;                       /* unmatched */
	--rb-active-bg: rgba(255, 255, 255, .18); /* pair at the cursor */
}
body.theme-light { /* same variables for the light theme */ }
```

## Development

No build step — `main.js` is the plugin itself. Tests: `node --test`.

---

## По-русски

Плагин подсвечивает скобки в обычном тексте заметок: раскрашивает их по уровню вложенности, выделяет пару к скобке у курсора и показывает красным скобки без пары. Скобки в коде, формулах и маркеры списков вида `1)` не трогает. Цвета можно поменять через CSS-сниппет (см. выше).

## License

[MIT](LICENSE)
