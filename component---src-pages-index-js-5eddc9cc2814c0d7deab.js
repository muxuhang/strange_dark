(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{RXBc:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),l=a("Wbzz"),o=a("Bl7J"),c=a("vGFT"),i=a.n(c),s=a("5rEg"),u=a("2fM7"),m=a("NUBc");t.default=function(e){var t=e.data,a=e.location,c=t.site.siteMetadata.title,d=t.allMarkdownRemark.edges,f=t.allDirectory.nodes,p=Object(n.useState)([]),g=p[0],E=p[1],v=Object(n.useState)([]),b=v[0],h=v[1];if("undefined"!=typeof window){var x=document.createElement("script");x.src="https://s9.cnzz.com/z_stat.php?id=1278835659&web_id=1278835659";var y=document.getElementsByTagName("script")[0];y.parentNode.insertBefore(x,y)}var S=Object(n.useState)(1),O=S[0],w=S[1],j=Object(n.useState)(""),_=j[0],k=j[1];Object(n.useEffect)((function(){var e=d.filter((function(e){return e.node.frontmatter.title.search(_)>=0||e.node.frontmatter.description.search(_)>=0}));E(e)}),[_]);var I=Object(n.useState)(""),z=I[0],N=I[1];Object(n.useEffect)((function(){w(1);var e=d.filter((function(e){return e.node.parent.relativeDirectory===z||""==z}));E(e)}),[z]),Object(n.useEffect)((function(){var e=g.slice(7*(O-1),7*O);h(e)}),[O,g]);var B=Object(n.useState)(0),T=B[0],C=B[1];Object(n.useEffect)((function(){window.addEventListener("scroll",(function(e){var t=document.documentElement.scrollTop;C(t)}));var e=localStorage.getItem("current");1!=e&&w(parseInt(e)||1);var t=localStorage.getItem("classify");t&&N(t||"")}),[]),Object(n.useEffect)((function(){localStorage.setItem("current",O.toString())}),[O]),Object(n.useEffect)((function(){localStorage.setItem("classify",z.toString())}),[z]);return r.a.createElement(o.a,{location:a,title:c},r.a.createElement("div",null,r.a.createElement("div",{className:i.a.search_box,style:T>80?{position:"fixed",backgroundColor:"rgba(255,255,255,0.9)",padding:"15px 0",top:0}:{position:"absolute"}},r.a.createElement(s.a,{style:{maxWidth:"300px",flex:1},placeholder:"搜索",onKeyUp:function(e){13===e.keyCode&&k(e.target.value),""===e.target.value&&k("")}}),r.a.createElement(u.a,{placeholder:"分类",value:z,style:{marginLeft:10,minWidth:100},onChange:function(e){return N(e)}},r.a.createElement(u.a.Option,{value:""},"全部分类"),f.map((function(e,t){return r.a.createElement(u.a.Option,{value:e.name,key:t},e.name)})))),r.a.createElement("div",{style:{height:"60px"}})),r.a.createElement(r.a.Fragment,null,b.map((function(e){var t=e.node;console.log(t);var a=t.frontmatter.title||t.fields.slug;return r.a.createElement("article",{key:t.fields.slug,className:i.a.list_item},r.a.createElement("header",null,r.a.createElement("h3",null,r.a.createElement(l.Link,{style:{boxShadow:"none"},to:t.fields.slug},a)),r.a.createElement("small",null,t.frontmatter.date)),r.a.createElement("section",null,r.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.description||t.excerpt}})))}))),r.a.createElement(m.a,{style:{margin:"10px 0"},current:O,pageSize:7,total:g.length,onChange:function(e){return w(e)}}))}},vGFT:function(e,t,a){e.exports={search_box:"index-module--search_box--1gSNb",home_box:"index-module--home_box--3SWmn",list_item:"index-module--list_item--h3Xdi"}}}]);
//# sourceMappingURL=component---src-pages-index-js-5eddc9cc2814c0d7deab.js.map