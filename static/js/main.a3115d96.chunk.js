(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{23:function(e,t,n){},24:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(0),o=n(16),i=n.n(o),a=(n(23),n(24),n(2)),s=n(7),j=function(){return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"DrawOops Main Page"}),Object(c.jsx)(s.b,{to:"/join",children:"join"}),Object(c.jsx)("br",{}),Object(c.jsx)(s.b,{to:"/start",children:"start new game"}),Object(c.jsx)("br",{}),Object(c.jsx)(s.b,{to:"/game",children:"test game"})]})},u=function(){return Object(c.jsx)("div",{children:Object(c.jsx)("h1",{children:"join game"})})},l=function(){return Object(c.jsx)("div",{children:Object(c.jsx)("h1",{children:"start new game"})})},f=function(){return Object(c.jsx)("h1",{children:"Oops page not found"})},b=n(14),d=function(e){var t=Object(r.useRef)(null),n=Object(r.useState)(!1),o=Object(b.a)(n,2),i=o[0],a=o[1],s=Object(r.useState)({x:null,y:null}),j=Object(b.a)(s,2),u=j[0],l=j[1],f=function(e){var n=t.current;if(n)return console.log(e),console.log({x:e.clientX-n.offsetLeft,y:e.clientY-n.offsetTop}),{x:e.clientX-n.offsetLeft,y:e.clientY-n.offsetTop}},d=Object(r.useCallback)((function(e){var t=f(e);t&&(a(!0),l(t))}),[]),h=Object(r.useCallback)((function(e){if(i){var t=f(e);u&&t&&(O(u,t),l(t))}}),[i,u]);Object(r.useEffect)((function(){var e=t.current;if(e)return e.addEventListener("pointerdown",d),function(){e.removeEventListener("pointerdown",d)}}),[d]),Object(r.useEffect)((function(){var e=t.current;if(e)return e.addEventListener("pointermove",h),function(){e.removeEventListener("pointermove",h)}}),[h]);var O=function(e,n){var c=t.current;if(c){var r=c.getContext("2d");r&&(r.strokeStyle="black",r.lineJoin="round",r.lineWidth=5,r.beginPath(),r.moveTo(e.x,e.y),r.lineTo(n.x,n.y),r.closePath(),r.stroke())}},v=Object(r.useCallback)((function(){a(!1)}),[]);return Object(r.useEffect)((function(){var e=t.current;if(e)return e.addEventListener("pointerup",v),e.addEventListener("pointerleave",v),function(){e.removeEventListener("pointerup",v),e.removeEventListener("pointerleave",v)}}),[v]),Object(c.jsx)("canvas",{ref:t,height:e.height,width:e.width})},h=function(){return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"this is game play page"}),Object(c.jsx)(d,{width:700,height:700})]})};var O=function(){var e=Object(a.f)();return console.log(e),Object(c.jsx)("main",{children:Object(c.jsxs)(a.c,{children:[Object(c.jsx)(a.a,{path:"".concat(e.url),component:j,exact:!0}),Object(c.jsx)(a.a,{path:"".concat(e.url,"join"),component:u}),Object(c.jsx)(a.a,{path:"".concat(e.url,"start"),component:l}),Object(c.jsx)(a.a,{pate:"".concat(e.url,"game"),component:h}),Object(c.jsx)(a.a,{component:f})]})})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,31)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),o(e),i(e)}))};i.a.render(Object(c.jsx)(s.a,{basename:"/drawoops",children:Object(c.jsx)(O,{})}),document.getElementById("root")),v()}},[[30,1,2]]]);
//# sourceMappingURL=main.a3115d96.chunk.js.map