# Design

The site is a graph of a life: you travel between nodes, and the node you land on projects a panel with its details. These notes keep later changes consistent.

## World

Teal water seen from above, with frosted, flat glass floating in it and a slow network of light in the background. The graph is the only thing that moves when you act; everything else stays still.

## Color

| Token | Hex | Use |
|---|---|---|
| Lagoon | `#042d39` | Deepest water at the edges; text on light buttons |
| Deep teal | `#0b6e71` | Main body of the background |
| Teal | `#129a91` | Mid background |
| Shallows | `#22c2b0` | The bright patch of the background |
| Foam | `#eefaf8` | Text, outlines, glass tint, primary buttons |
| Brass | `#e7d6a3` | "You are here" only: the focused node, the current breadcrumb, the ready state while dragging, focus rings |

Text on glass uses foam at three strengths: `--ink` (full), `--ink-2` (88%), `--ink-3` (78%). Do not go lower for anything people read; the panel sits on bright water.

## Type

One family: **Geologica** (variable weight, with a sharpness axis, Latin and Cyrillic).

- Name on the centre node: 300 weight, sharpness 100, the largest size on the page.
- Headings: 500 weight, sharpness 60.
- Body and labels: 400 to 600, sharpness 0.
- Scale (1.25): 13, 15, 19, 24, 30, 38 px.
- Sentence case everywhere. No all-caps labels, no letter-spaced eyebrows above headings.
- Dates use tabular numerals and sit in their own column in lists.

## Components

- **Node:** a flat frosted disc with a 1 px foam outline and a line icon. The focused node gets a brass outline, an outer ring, and one slow pulse.
- **Panel:** frosted glass, 8 px corners. The heading is the page's `h1`, followed by a plain role line, then the dates.
- **Buttons:** the first action is solid foam with lagoon text, and the rest are outlined. Labels say exactly what happens ("View code on GitHub").
- **Lists:** rows separated by hairlines, with what happened on the left and when on the right.
- **Tags:** quiet tinted chips. The "inside this node" chips are outlined pills and work as buttons.
- **Edge hints and phone tabs:** drawn chevrons, never arrow characters.

## Motion

- The travelling light and the trail along the edge while you drag are the signature. They respond to the person, so they stay.
- The panel unfolds once when you arrive.
- Nothing bobs, shimmers or loops on its own, except the slow pulse on the current node and the background particles.
- With reduced motion turned on, panels appear without the unfold, the trail stops flowing, and the camera jumps instead of gliding.

## Things to avoid

Gradient text, all-caps labels, eyebrow labels, `A · B · C` strings, arrows appended to links, identical card grids, glows used as decoration, and new typefaces.

## Files

- `content.js` and `content.ru.js`: all words. `period` and list `period` fields feed the date column.
- `favicon.svg` and `og-image.png`: browser tab icon and link-preview card. Regenerate the card if the name or role changes.
