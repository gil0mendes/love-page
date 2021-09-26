<script lang="ts">
  import { codeBlockCdn, codeBlockInstall, codeBlockUsage } from "../strings";

  import ParticleCanvas from "../components/particle-canvas.svelte";
  import LoveButton from "../components/love-button.svelte";
  import Highlight from "../components/PrismJS.svelte";
</script>

<div class="relative hero">
  <ParticleCanvas />
  <div class="container relative mx-auto z-10">
    <div class="px-4 min-h-screen flex flex-col justify-center items-center">
      <h1
        class="text-5xl md:text-6xl font-extrabold leading-tight md:leading-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-400"
      >
        LovePage
      </h1>
      <div class="my-8">
        <LoveButton />
      </div>
      <p class="text-xl text-gray-600">Easy integration for people love your work.</p>
    </div>
  </div>
</div>

<div class="container mx-auto max-w-screen-md">
  <section class="step mb-8">
    <h2>1. Add the dependencies</h2>
    <p>The love page button is published as a small JavaScript and CSS files:</p>

    <Highlight language="html" code={codeBlockInstall} />

    <p>In alternative, you can download the files using a CDN or serve it directly though it:</p>
    <Highlight language="html" code={codeBlockCdn} />
  </section>

  <section class="step mb-8">
    <h2>2. Add the button</h2>

    <p>Add the button element to the website and it's done. Simples than this isn't possible!</p>
    <Highlight language="html" code={codeBlockUsage} />
    <p>
      The love page button persists the number of loves to a page using a simple cloud-based hosting provieded by us. No
      need to configure any server or service, is direct.
    </p>
  </section>
</div>
