# Page Loves

A non-configuration button for allowing users to love your web pages and blog posts.

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

## Development

Clone the repo and install dependencies via yarn:

```
yarn
```

The project uses [Vite](https://vitejs.dev/) for development, all the code can be found on the `src` directory. To start the development server run the command:

```
yarn dev
```
