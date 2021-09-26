# Page Loves

A non-configuration button for allowing users to love your web pages and blog posts.

Visit the [official website](https://www.lovepage.one/) for additional info.

## Simplest example

The button is a custom element that can be added directly to the page. Below there is a minimal example:

```html
<head>
  <!-- add the button script -->
  <script src="dist/love-page.js"></script>
</head>
<body>
  <!-- add the button -->
  <love-page url="example.com/my-page" />
</body>
```

The above will render a love button, persisting loves counts per url.

> In alternative a CDN can be user to get the JS code. Take a look at [UNPKG](https://unpkg.com/).

## Development

Clone the repo and install dependencies via pnpm:

```
pnpm install
```

The project uses [Vite](https://vitejs.dev/) for development, all the code can be found on the `src` directory. To start 
the development server run the command:

```
pnpm run dev
```
