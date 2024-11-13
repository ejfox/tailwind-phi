# tailwind-φ

Ever notice how some designs just feel... right? There's often mathematics behind that feeling - specifically the golden ratio (φ ≈ 1.618034). This plugin gives you a set of magic numbers, baked into Tailwind utilities, that you can mix into your existing designs to make them feel more harmonious.

```bash
npm install tailwind-phi
```

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwind-phi')
  ]
}
```

## How to Think About It

Rather than replacing your existing Tailwind classes, `tailwind-phi` adds new ones you can use strategically:

- Use `grid-cols-phi-fixed` when you want that perfect content-sidebar split that just feels right
- Drop `text-phi` and friends into your typography system where you need naturally progressive size jumps
- Grab `aspect-phi` when you need an image container that's pleasing to the eye
- Try the `phi-thirds` layout when you need three columns but want them to feel balanced

The golden ratio isn't about strict rules - it's about having good proportions in your back pocket when you need them.

## Design Tips

- Mix it with your existing spacing system. Use Tailwind's standard `gap-*` with `grid-cols-phi-fixed` for example
- The golden ratio works great for main/aside divisions (main content vs sidebar) 
- Try `phi`-based spacing around your most important content - it creates subtle emphasis
- The typography scale works beautifully for article or blog layouts
- When something feels slightly off in your layout, try swapping in a `phi`-based proportion

See the [live demo](https://github.com/yourusername/tailwind-phi/demo) for the full utility reference and detailed examples.

## License

MIT


<div align="center">
  <h1>tailwind-φ</h1>
  <p>The golden ratio, served à la carte for your designs ✨</p>
</div>

Nature's most beautiful proportion (φ ≈ 1.618034) is now available as a carefully curated set of Tailwind utilities. Like a master chef's secret ingredients, these proportions can elevate your designs from good to exquisite.

```bash
npm install tailwind-phi
```

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwind-phi')
  ]
}
```

## The Art of Golden Proportions

### The Perfect Rectangle
The golden rectangle (1:1.618034) is your foundational plating. Use it for images, cards, or any container where you want to cultivate a more organic sense of "rightness" and balance.

```html
<figure class="aspect-phi overflow-hidden rounded-phi">
  <!-- Landscape orientation -->
</figure>

<!-- or portrait orientation -->
 <figure class="aspect-phi-reverse overflow-hidden rounded-phi">
  <!-- Portrait orientation -->
</figure>
```


### Typographic Rhythm & Balance

```html
<article class="space-y-phi-sm">
  <h1 class="text-phi-xl">Leading with Impact</h1>
  <h2 class="text-phi-lg">Natural Hierarchy</h2>
  <p class="text-phi">
    Your content, flowing with mathematical grace
  </p>
</article>
```

## Composing Your Design

The key to using these proportions isn't to apply them everywhere, but to use them intentionally:

- 🖼 `aspect-phi` creates the perfect frame for your visual content
- 📏 `-phi` modifiers for spacing create subtle, natural rhythms - best when there are multiple stacked elements
- 🎯 `grid-cols-phi-fixed` for when you need that perfect asymmetrical balance
- 📝 `text-phi-{size}` scale builds harmony into your typography

Think of these utilities like fine seasonings - they're most effective when applied thoughtfully to enhance your design's natural flavors.
