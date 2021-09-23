<script>
  import { onMount } from "svelte";

  export let language;
  export let code;

  onMount(() => {
    let script = document.createElement("script");
    script.src = "https://unpkg.com/prismjs@1.25.0/components/prism-core.min.js";
    document.head.append(script);

    script.onload = function () {
      let langJS = false;
      let lang_script;
      let lang_module;

      // This switch statement, evaluates what language is being used, if one of a key language is being used, it will
      // load the proper Prisim support tool, like Python requires "prism-python.js" to modify the raw code so that
      // Prisim can render it properly.
      switch (language) {
        case "json":
          lang_module = "https://prismjs.com/components/prism-json.js";
          langJS = true;
          break;

        case "html":
          lang_module = "https://prismjs.com/components/prism-markup.js";
          langJS = true;
          break;
      }

      if (langJS == true) {
        lang_script = document.createElement("script");
        lang_script.src = lang_module;
        lang_script.async = true;
        document.head.append(lang_script);

        lang_script.onload = () => {
          // @ts-ignore
          Prism.highlightAll();
        };
      } else {
        // @ts-ignore
        Prism.highlightAll();
      }
    };
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" type="text/css" />
  <link rel="stylesheet" href="https://unpkg.com/prismjs@1.25.0/themes/prism.css" />
</svelte:head>

<div class="w3-container">
  <pre><code class="language-{language}">{code}</code></pre>
</div>
