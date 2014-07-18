# winjs-localcontext-adapter

Shims and other snippets to assist with use of traditional JavaScript libraries
within the locked-down local context of WinJS

## Usage

- include msapp-wrap.js in your project's Start Page (e.g. via a script tag)

### jQuery

- use jQuery 2.0.3, as 2.1.0 and later currently trigger an exception during
  initialisation: https://github.com/jquery/sizzle/issues/274

- after jQuery, but before anything that uses jQuery, include jquery-winjs.js
