import{a as W,n as E,e as z,o as pe}from"../chunks/scheduler.D4tQEfxT.js";import{S as F,i as U,e as b,j as q,c as _,k as T,l as C,f as j,q as c,b as v,d as J,m as g,n as ve,s as M,a as A,o as S,p as B,r as P,t as I,B as ae,A as re,h as L,D as oe,u as N,g as O}from"../chunks/index.NO1YNLBk.js";import{c as R,T as ke}from"../chunks/ThemePicker.DSLR_JO4.js";function X(l){return(l==null?void 0:l.length)!==void 0?l:Array.from(l)}function we(l){let e,t;return{c(){e=b("p"),t=q(l[0]),this.h()},l(s){e=_(s,"P",{style:!0,class:!0});var a=T(e);t=C(a,l[0]),a.forEach(j),this.h()},h(){c(e,"--x",l[2]+"px"),c(e,"--y",l[3]+"px"),c(e,"--r",l[4]+"deg"),c(e,"--h",l[1]?l[5].red:"inherit"),v(e,"class","svelte-17ku7in")},m(s,a){J(s,e,a),g(e,t)},p(s,[a]){a&1&&ve(t,s[0]),a&4&&c(e,"--x",s[2]+"px"),a&8&&c(e,"--y",s[3]+"px"),a&16&&c(e,"--r",s[4]+"deg"),a&34&&c(e,"--h",s[1]?s[5].red:"inherit")},i:E,o:E,d(s){s&&j(e)}}}function be(l,e,t){let s;z(l,R,r=>t(5,s=r));let{letter:a}=e,{highlighted:u}=e,{settings:d}=e,f,o,$;return pe(()=>{t(2,f=Math.floor(Math.random()*d.translationalOffset)-d.translationalOffset/2),t(3,o=Math.floor(Math.random()*d.translationalOffset)-d.translationalOffset/2),t(4,$=Math.floor(Math.random()*d.rotationalOffset)-d.rotationalOffset/2)}),l.$$set=r=>{"letter"in r&&t(0,a=r.letter),"highlighted"in r&&t(1,u=r.highlighted),"settings"in r&&t(6,d=r.settings)},[a,u,f,o,$,s,d]}class me extends F{constructor(e){super(),U(this,e,be,we,W,{letter:0,highlighted:1,settings:6})}}function _e(l){let e,t,s="<",a,u,d,f=">",o,$,r,y="<",m,n,k,h=">",p,i,w,ee="<",Y,V,Z,te=">",x;return{c(){e=b("nav"),t=b("a"),a=q(s),u=b("span"),d=q("WhoAmI"),o=q(f),$=M(),r=b("a"),m=q(y),n=b("span"),k=q("Blog"),p=q(h),i=M(),w=b("a"),Y=q(ee),V=b("span"),Z=q("Contact"),x=q(te),this.h()},l(D){e=_(D,"NAV",{class:!0});var H=T(e);t=_(H,"A",{href:!0,class:!0});var G=T(t);a=C(G,s),u=_(G,"SPAN",{style:!0});var se=T(u);d=C(se,"WhoAmI"),se.forEach(j),o=C(G,f),G.forEach(j),$=A(H),r=_(H,"A",{href:!0,class:!0});var K=T(r);m=C(K,y),n=_(K,"SPAN",{style:!0});var le=T(n);k=C(le,"Blog"),le.forEach(j),p=C(K,h),K.forEach(j),i=A(H),w=_(H,"A",{href:!0,class:!0});var Q=T(w);Y=C(Q,ee),V=_(Q,"SPAN",{style:!0});var ne=T(V);Z=C(ne,"Contact"),ne.forEach(j),x=C(Q,te),Q.forEach(j),H.forEach(j),this.h()},h(){c(u,"color",l[0].green),v(t,"href","#whoAmI"),v(t,"class","svelte-kgfe6f"),c(n,"color",l[0].orange),v(r,"href","#blog"),v(r,"class","svelte-kgfe6f"),c(V,"color",l[0].cyan),v(w,"href","#contact"),v(w,"class","svelte-kgfe6f"),v(e,"class","svelte-kgfe6f")},m(D,H){J(D,e,H),g(e,t),g(t,a),g(t,u),g(u,d),g(t,o),g(e,$),g(e,r),g(r,m),g(r,n),g(n,k),g(r,p),g(e,i),g(e,w),g(w,Y),g(w,V),g(V,Z),g(w,x)},p(D,[H]){H&1&&c(u,"color",D[0].green),H&1&&c(n,"color",D[0].orange),H&1&&c(V,"color",D[0].cyan)},i:E,o:E,d(D){D&&j(e)}}}function $e(l,e,t){let s;return z(l,R,a=>t(0,s=a)),[s]}class je extends F{constructor(e){super(),U(this,e,$e,_e,W,{})}}function ie(l,e,t){const s=l.slice();return s[2]=e[t],s}function ce(l,e,t){const s=l.slice();return s[2]=e[t],s}function ue(l){let e,t;return e=new me({props:{letter:l[2],settings:l[1],highlighted:de.includes(l[2])}}),{c(){S(e.$$.fragment)},l(s){B(e.$$.fragment,s)},m(s,a){P(e,s,a),t=!0},p:E,i(s){t||(I(e.$$.fragment,s),t=!0)},o(s){L(e.$$.fragment,s),t=!1},d(s){N(e,s)}}}function fe(l){let e,t;return e=new me({props:{letter:l[2],settings:l[1],highlighted:de.includes(l[2])}}),{c(){S(e.$$.fragment)},l(s){B(e.$$.fragment,s)},m(s,a){P(e,s,a),t=!0},p:E,i(s){t||(I(e.$$.fragment,s),t=!0)},o(s){L(e.$$.fragment,s),t=!1},d(s){N(e,s)}}}function ye(l){let e,t,s,a,u,d,f,o,$=X(he),r=[];for(let h=0;h<$.length;h+=1)r[h]=ue(ce(l,$,h));const y=h=>L(r[h],1,1,()=>{r[h]=null});let m=X(ge),n=[];for(let h=0;h<m.length;h+=1)n[h]=fe(ie(l,m,h));const k=h=>L(n[h],1,1,()=>{n[h]=null});return f=new je({}),{c(){e=b("div"),t=b("h1");for(let h=0;h<r.length;h+=1)r[h].c();s=M(),a=b("br"),u=M();for(let h=0;h<n.length;h+=1)n[h].c();d=M(),S(f.$$.fragment),this.h()},l(h){e=_(h,"DIV",{class:!0});var p=T(e);t=_(p,"H1",{style:!0,class:!0});var i=T(t);for(let w=0;w<r.length;w+=1)r[w].l(i);s=A(i),a=_(i,"BR",{}),u=A(i);for(let w=0;w<n.length;w+=1)n[w].l(i);i.forEach(j),d=A(p),B(f.$$.fragment,p),p.forEach(j),this.h()},h(){c(t,"--foreground",l[0].foreground),v(t,"class","svelte-2lw3zf"),v(e,"class","hero svelte-2lw3zf")},m(h,p){J(h,e,p),g(e,t);for(let i=0;i<r.length;i+=1)r[i]&&r[i].m(t,null);g(t,s),g(t,a),g(t,u);for(let i=0;i<n.length;i+=1)n[i]&&n[i].m(t,null);g(e,d),P(f,e,null),o=!0},p(h,[p]){if(p&2){$=X(he);let i;for(i=0;i<$.length;i+=1){const w=ce(h,$,i);r[i]?(r[i].p(w,p),I(r[i],1)):(r[i]=ue(w),r[i].c(),I(r[i],1),r[i].m(t,s))}for(ae(),i=$.length;i<r.length;i+=1)y(i);re()}if(p&2){m=X(ge);let i;for(i=0;i<m.length;i+=1){const w=ie(h,m,i);n[i]?(n[i].p(w,p),I(n[i],1)):(n[i]=fe(w),n[i].c(),I(n[i],1),n[i].m(t,null))}for(ae(),i=m.length;i<n.length;i+=1)k(i);re()}(!o||p&1)&&c(t,"--foreground",h[0].foreground)},i(h){if(!o){for(let p=0;p<$.length;p+=1)I(r[p]);for(let p=0;p<m.length;p+=1)I(n[p]);I(f.$$.fragment,h),o=!0}},o(h){r=r.filter(Boolean);for(let p=0;p<r.length;p+=1)L(r[p]);n=n.filter(Boolean);for(let p=0;p<n.length;p+=1)L(n[p]);L(f.$$.fragment,h),o=!1},d(h){h&&j(e),oe(r,h),oe(n,h),N(f)}}}let he="Harrison",ge="DiAmbrosio",de="aeiouAEIUO";function Te(l,e,t){let s;return z(l,R,u=>t(0,s=u)),[s,{translationalOffset:1500,rotationalOffset:720}]}class Ie extends F{constructor(e){super(),U(this,e,Te,ye,W,{})}}function Me(l){let e,t,s='&lt;<span class="svelte-k7lhju">WhoAmI</span>&gt;',a,u,d='I am <em class="svelte-k7lhju">H<span class="svelte-k7lhju">a</span>rr<span class="svelte-k7lhju">i</span>s<span class="svelte-k7lhju">o</span>n D<span class="svelte-k7lhju">iA</span>mbr<span class="svelte-k7lhju">o</span>s<span class="svelte-k7lhju">io</span></em>, a humble programmer interested in all things related to web development, creative coding, computer graphics, game development and Linux. I am all self taught, and have found learning about computers to be one of my life&#39;s passions. I am familiarizing myself with a few programming languages: C++, TypeScript, JavaScript, and some Java. Additionally, I&#39;m most comfortable as a web developer and frequently dive deep into the community on new runtimes, frameworks and best practices. I find Svelte to come with a great experience and enjoy building projects most often in the framework. As of now I&#39;m a graduating senior from Saint Peter&#39;s Prep and will study Computer Science and Electrical/Computer Engineering at Worcester Polytechnic Institute.',f,o,$="Technologies and Dotfiles",r,y,m='<li class="svelte-k7lhju"><a target="_blank" href="https://github.com/EggbertFluffle/nvim" class="svelte-k7lhju"><strong class="svelte-k7lhju">Neovim</strong></a> - Text editor and the only way I can type now. If I need to use another editor vim binds are a requirement, without question. Package management is done with <a href="https://github.com/folke/lazy.nvim" class="svelte-k7lhju">lazy.nvim</a> which makes the whole configuration process super portable.</li> <li class="svelte-k7lhju"><a target="_blank" href="https://voidlinux.org/" class="svelte-k7lhju"><strong class="svelte-k7lhju">Linux (Void, Debian)</strong></a> - My choice for linux distros. Mostly used out of recommendation (or no other option). As for Void, I do appreciate the minimalism and boot speed. Debian is nice and simple as well, and if not for the outdated repos, it would be my favorite.</li> <li class="svelte-k7lhju"><a target="_blank" href="https://dwm.suckless.org/" class="svelte-k7lhju"><strong class="svelte-k7lhju">dwm</strong></a> - Window manager of choice. Simple, works well, and I love how the config is written in C. As for complementary programs, the only one that adds any functionality besides comsetics is <a href="https://tools.suckless.org/slstatus/" class="svelte-k7lhju">slstatus</a>.</li> <li class="svelte-k7lhju"><a target="_blank" href="https://github.com/EggbertFluffle/kitty" class="svelte-k7lhju"><strong class="svelte-k7lhju">Kitty</strong></a> - Just a terminal emulator, I like it for the in built image rendering. It also has nice paneling that can be similar to my dwm binds but I don&#39;t take advantage of those often.</li> <li class="svelte-k7lhju"><a target="_blank" href="https://github.com/saysjonathan/dwm.tmux" class="svelte-k7lhju"><strong class="svelte-k7lhju">dwm.tmux</strong></a> - I use tmux for when I&#39;m on my school chromebook or not in a graphical environment with tiling window management. This nice plugin makes it easy to get keybinds similar to dwm and it&#39;s a nice set-and-forget.</li>';return{c(){e=b("div"),t=b("h2"),t.innerHTML=s,a=M(),u=b("p"),u.innerHTML=d,f=M(),o=b("h3"),o.textContent=$,r=M(),y=b("ul"),y.innerHTML=m,this.h()},l(n){e=_(n,"DIV",{id:!0,style:!0,class:!0});var k=T(e);t=_(k,"H2",{class:!0,"data-svelte-h":!0}),O(t)!=="svelte-71aw4j"&&(t.innerHTML=s),a=A(k),u=_(k,"P",{class:!0,"data-svelte-h":!0}),O(u)!=="svelte-g0h9dt"&&(u.innerHTML=d),f=A(k),o=_(k,"H3",{class:!0,"data-svelte-h":!0}),O(o)!=="svelte-1x9pdqr"&&(o.textContent=$),r=A(k),y=_(k,"UL",{class:!0,"data-svelte-h":!0}),O(y)!=="svelte-w37hyi"&&(y.innerHTML=m),k.forEach(j),this.h()},h(){v(t,"class","svelte-k7lhju"),v(u,"class","svelte-k7lhju"),v(o,"class","svelte-k7lhju"),v(y,"class","svelte-k7lhju"),v(e,"id","whoAmI"),c(e,"--foreground",l[0].foreground),c(e,"--red",l[0].red),c(e,"--green",l[0].green),c(e,"--background2",l[0].background2),c(e,"--yellow",l[0].yellow),c(e,"--orange",l[0].orange),v(e,"class","svelte-k7lhju")},m(n,k){J(n,e,k),g(e,t),g(e,a),g(e,u),g(e,f),g(e,o),g(e,r),g(e,y)},p(n,[k]){k&1&&c(e,"--foreground",n[0].foreground),k&1&&c(e,"--red",n[0].red),k&1&&c(e,"--green",n[0].green),k&1&&c(e,"--background2",n[0].background2),k&1&&c(e,"--yellow",n[0].yellow),k&1&&c(e,"--orange",n[0].orange)},i:E,o:E,d(n){n&&j(e)}}}function Ae(l,e,t){let s;return z(l,R,a=>t(0,s=a)),[s]}class He extends F{constructor(e){super(),U(this,e,Ae,Me,W,{})}}function Le(l){let e,t,s='&lt;<span class="svelte-1wcqpkk">Blog</span>&gt;',a,u,d='<li class="svelte-1wcqpkk">10/14/2023: <a href="/blogs/terminal_based_3d_graphics" class="svelte-1wcqpkk">Terminal Based 3D Graphics</a></li> <li class="svelte-1wcqpkk">01/14/2024: <a href="/blogs/introduction" class="svelte-1wcqpkk">Introduction</a></li> <li class="svelte-1wcqpkk">TT/BB/DDDD: <a href="/blogs/wolfenstein_terminal_raycaster" class="svelte-1wcqpkk">Wolfenstein-style Terminal Raycast Renderer</a></li> <li class="svelte-1wcqpkk">03/22/2024: <a href="/blogs/neocities" class="svelte-1wcqpkk">Neocities</a></li> <li class="svelte-1wcqpkk">05/09/2024: <a href="/blogs/minecraft_clone" class="svelte-1wcqpkk">Minecraft Clone (maybe pt.1)</a></li>';return{c(){e=b("div"),t=b("h2"),t.innerHTML=s,a=M(),u=b("ul"),u.innerHTML=d,this.h()},l(f){e=_(f,"DIV",{id:!0,style:!0,class:!0});var o=T(e);t=_(o,"H2",{class:!0,"data-svelte-h":!0}),O(t)!=="svelte-11pldbm"&&(t.innerHTML=s),a=A(o),u=_(o,"UL",{class:!0,"data-svelte-h":!0}),O(u)!=="svelte-1bik9xy"&&(u.innerHTML=d),o.forEach(j),this.h()},h(){v(t,"class","svelte-1wcqpkk"),v(u,"class","svelte-1wcqpkk"),v(e,"id","blog"),c(e,"--foreground",l[0].foreground),c(e,"--orange",l[0].orange),c(e,"--background2",l[0].background2),c(e,"--yellow",l[0].yellow),v(e,"class","svelte-1wcqpkk")},m(f,o){J(f,e,o),g(e,t),g(e,a),g(e,u)},p(f,[o]){o&1&&c(e,"--foreground",f[0].foreground),o&1&&c(e,"--orange",f[0].orange),o&1&&c(e,"--background2",f[0].background2),o&1&&c(e,"--yellow",f[0].yellow)},i:E,o:E,d(f){f&&j(e)}}}function Ee(l,e,t){let s;return z(l,R,a=>t(0,s=a)),[s]}class qe extends F{constructor(e){super(),U(this,e,Ee,Le,W,{})}}function Ce(l){let e,t,s='&lt;<span class="svelte-pfrjp5">Contact</span>&gt;',a,u,d='<li class="svelte-pfrjp5">Github: <a href="https://github.com/EggbertFluffle/" class="svelte-pfrjp5">EggbertFluffle</a></li> <li class="svelte-pfrjp5">E-Mail: hdiambrosio@gmail.com</li> <li class="svelte-pfrjp5">LinkedIn: <a href="https://www.linkedin.com/in/harrison-diambrosio-505443229/" class="svelte-pfrjp5">Harrison DiAmbrosio</a></li>';return{c(){e=b("div"),t=b("h2"),t.innerHTML=s,a=M(),u=b("ul"),u.innerHTML=d,this.h()},l(f){e=_(f,"DIV",{id:!0,style:!0,class:!0});var o=T(e);t=_(o,"H2",{class:!0,"data-svelte-h":!0}),O(t)!=="svelte-15ugsvk"&&(t.innerHTML=s),a=A(o),u=_(o,"UL",{class:!0,"data-svelte-h":!0}),O(u)!=="svelte-joe40"&&(u.innerHTML=d),o.forEach(j),this.h()},h(){v(t,"class","svelte-pfrjp5"),v(u,"class","svelte-pfrjp5"),v(e,"id","contact"),c(e,"--foreground",l[0].foreground),c(e,"--orange",l[0].orange),c(e,"--background2",l[0].background2),c(e,"--yellow",l[0].yellow),c(e,"--cyan",l[0].cyan),v(e,"class","svelte-pfrjp5")},m(f,o){J(f,e,o),g(e,t),g(e,a),g(e,u)},p(f,[o]){o&1&&c(e,"--foreground",f[0].foreground),o&1&&c(e,"--orange",f[0].orange),o&1&&c(e,"--background2",f[0].background2),o&1&&c(e,"--yellow",f[0].yellow),o&1&&c(e,"--cyan",f[0].cyan)},i:E,o:E,d(f){f&&j(e)}}}function De(l,e,t){let s;return z(l,R,a=>t(0,s=a)),[s]}class Se extends F{constructor(e){super(),U(this,e,De,Ce,W,{})}}function Be(l){let e,t,s,a,u,d,f,o,$,r,y;return t=new ke({}),a=new Ie({}),d=new He({}),o=new qe({}),r=new Se({}),{c(){e=b("main"),S(t.$$.fragment),s=M(),S(a.$$.fragment),u=M(),S(d.$$.fragment),f=M(),S(o.$$.fragment),$=M(),S(r.$$.fragment),this.h()},l(m){e=_(m,"MAIN",{style:!0,class:!0});var n=T(e);B(t.$$.fragment,n),s=A(n),B(a.$$.fragment,n),u=A(n),B(d.$$.fragment,n),f=A(n),B(o.$$.fragment,n),$=A(n),B(r.$$.fragment,n),n.forEach(j),this.h()},h(){c(e,"--background1",l[0].background1),v(e,"class","svelte-1vhtni8")},m(m,n){J(m,e,n),P(t,e,null),g(e,s),P(a,e,null),g(e,u),P(d,e,null),g(e,f),P(o,e,null),g(e,$),P(r,e,null),y=!0},p(m,[n]){(!y||n&1)&&c(e,"--background1",m[0].background1)},i(m){y||(I(t.$$.fragment,m),I(a.$$.fragment,m),I(d.$$.fragment,m),I(o.$$.fragment,m),I(r.$$.fragment,m),y=!0)},o(m){L(t.$$.fragment,m),L(a.$$.fragment,m),L(d.$$.fragment,m),L(o.$$.fragment,m),L(r.$$.fragment,m),y=!1},d(m){m&&j(e),N(t),N(a),N(d),N(o),N(r)}}}function Pe(l,e,t){let s;return z(l,R,a=>t(0,s=a)),[s]}class We extends F{constructor(e){super(),U(this,e,Pe,Be,W,{})}}export{We as component};
