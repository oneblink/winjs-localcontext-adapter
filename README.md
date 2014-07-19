# winjs-localcontext-adapter

Shims and other snippets to assist with use of traditional JavaScript libraries
within the locked-down local context of WinJS

## Warning

Microsoft deliberately prevents certain unsafe JavaScript and DOM practices from
functioning within the local context.

- DO NOT use this project without carefully vetting all JavaScript included in
  the local context

- DO NOT link to remote resources from your local context

## Usage

- include msapp-wrap.js in your project's Start Page (e.g. via a script tag)

### jQuery

- use jQuery 2.0.3, as 2.1.0 and later currently trigger an exception during
  initialisation: https://github.com/jquery/sizzle/issues/274

- after jQuery, but before anything that uses jQuery, include jquery-winjs.js
