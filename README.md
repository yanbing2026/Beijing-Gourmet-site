# Beijing Gourmet

Website for **Beijing Gourmet** — an all-you-can-eat Chinese buffet with sushi and a
Mongolian Grill at 8228 East 61st Street, Tulsa, OK 74133.

**Live:** https://yanbing2026.github.io/Beijing-Gourmet-site/
**Phone:** (918) 297-8895 · **Email:** beijinggourmettulsa@gmail.com

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero, photo carousel, customer testimonials |
| `prices.html` | Lunch / dinner / Sunday buffet prices, drinks, buffet-to-go |
| `location.html` | Address, hours, embedded Google Map |
| `faq.html` | Buffet questions — hours, time limits, seafood, dietary needs |
| `contact.html` | Contact form |

## Structure

```
├── index.html            # Home
├── prices.html           # Prices
├── location.html         # Location & Hours
├── faq.html              # FAQ
├── contact.html          # Contact Us
├── style.css             # Full stylesheet — light theme, gold + red accents, responsive
├── script.js             # Nav toggle, photo + testimonial carousels, contact form
├── favicon.png           # 64×64, cropped from the neon sign
├── apple-touch-icon.png  # 180×180 iOS home-screen icon
├── og-image.jpg          # 1200×630 social share card
├── logo.png              # Neon storefront sign (source for the favicon)
├── hero-bg.jpg           # Home hero photo (the buffet line)
├── gallery-1..4.jpg      # Carousel photos
├── robots.txt
├── sitemap.xml
└── .github/workflows/deploy.yml
```

## Local development

No build step — plain HTML, CSS and vanilla JS.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Colours and fonts are CSS custom properties in the `:root` block at the top of `style.css`.

### Photos and captions

Each carousel caption is written to match the photo it sits on — the storefront, the
dining room, the neon sign, and the Mongolian Grill & Sushi station. If you swap an
image, update its `alt` text and caption in `index.html` to match, otherwise screen
readers and Google Images describe the wrong picture.

## Contact form

`contact.html` posts to [Web3Forms](https://web3forms.com) via `script.js`.

The hidden `access_key` field in `contact.html` must hold a valid key — the free key is
issued instantly when you enter an email address at web3forms.com. Without a valid key
the form shows an inline error telling visitors to call instead, rather than silently
discarding the message.

Delivery is confirmed in-page: a green success message on send, and a red error with the
phone number as fallback if the request fails. Free tier allows 250 submissions/month.

## SEO and social sharing

- Per-page `meta description`, `rel="canonical"`, Open Graph and Twitter Card tags.
- `Restaurant` JSON-LD in `index.html` — opening hours, address, geo coordinates,
  phone, cuisine and price range, so Google can surface them directly.
- `sitemap.xml` and `robots.txt`.

`og-image.jpg` is the 1200×630 share card. It is generated with `ffmpeg` (this machine has
no ImageMagick); the light background is `#fafaf7` and the accent gold is `#ffb90f`, matching
`style.css`. Regenerate it if the phone number, address or tagline changes.

## Deployment

GitHub Pages, deployed from `main` by `.github/workflows/deploy.yml`. Pushing to `main`
publishes within about a minute.

Note: GitHub Pages also has a legacy branch build configured for this repo. If both are
active, each push triggers two deployments of identical content. Only one is needed.
