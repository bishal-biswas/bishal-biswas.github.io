---
title : Toggle Switch Button made with Tailwind
metaDescription : Sample code for making a Sliding Toggle Button using Tailwind CSS only
publishDate : 2025-05-27T10:00
isDraft : false
tags : [Tailwind CSS, UI Design]
slug : toggle-switch-button-made-with-tailwind
---
## Toggle Switch Button

Use this code to make a toggle button using Tailwind CSS, no other CSS Required. Adjust the size according to your needs.

<div class="grid place-items-center my-4"><label class="flex items-center gap-2 cursor-pointer select-none w-fit">
 <input id="newArrivalFilter" type="checkbox" class="sr-only peer">
 
 <div class="block relative bg-gray-300 w-11 h-6 p-1 rounded-full 
 before:top-[0.15rem]
 before:absolute before:bg-white before:w-5 before:h-5 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-[1.3rem] peer-checked:bg-blue-500"></div>

<p> <span class="text-sm">Toggle</span>
</p></label></div>

## Sample Code

<pre><code class="language-html">&lt;label class="flex items-center gap-2 cursor-pointer select-none w-fit">
 &lt;input id="newArrivalFilter" type="checkbox" class="sr-only peer">
 &lt;div class="block relative bg-gray-300 w-11 h-6 p-1 rounded-full before:top-[0.15rem] before:absolute before:bg-white before:w-5 before:h-5 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-[1.3rem] peer-checked:bg-blue-500">&lt;/div>
 &lt;span class="text-sm text-black">Toggle&lt;/span>
&lt;/label&gt;</code></pre>