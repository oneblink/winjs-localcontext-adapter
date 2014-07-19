# winjs-localcontext-adapter

Shims and other snippets to assist with use of traditional JavaScript libraries
within the locked-down local context of WinJS

## Warning

Microsoft deliberately prevents certain unsafe JavaScript and DOM practices from
functioning within the local context.

- DO NOT use this project without carefully vetting all JavaScript included in
  the local context

- DO NOT link to remote resources from your local context

## Instructions

- include msapp-wrap.js in your project's Start Page (e.g. via a script tag)

### jQuery

- use jQuery 2.0.3, as 2.1.0 and later currently trigger an exception during
  initialisation: https://github.com/jquery/sizzle/issues/274

- after jQuery, but before anything that uses jQuery, include jquery-winjs.js

```html
<script src="jquery.min.js"></script>
<script src="msapp-wrap.js"></script>
<script src="jquery-winjs.js"></script>
```

### Angular.JS

- include jQuery, following the directions above

- below / after that, include Angular.JS

- Angular.JS will detect the adjusted jQuery and use it for DOM manipulation

```html
<script src="jquery.min.js"></script>
<script src="msapp-wrap.js"></script>
<script src="jquery-winjs.js"></script>
<script src="angular.min.js"></script>
```

- use the ngCsp directive, so that Angular.JS will avoid calling `eval()`

```html
<html ng-csp="">
<head>
  <link rel="stylesheet" href="angular-csp.css" />
</head>
```
