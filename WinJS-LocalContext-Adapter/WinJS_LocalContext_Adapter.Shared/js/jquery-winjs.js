/*jslint indent:2*/
﻿
(function ($) {
  'use strict';

  if (!$) {
    return;
  }

  $.fn.domManip = msappWrapUnsafeFunction($.fn.domManip);
  $.fn.html = msappWrapUnsafeFunction($.fn.html);

}(jQuery));
