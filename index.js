import{a as v,S as w,i as a}from"./assets/vendor-frHSA4Lh.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const S="https://pixabay.com/api/",q="50342866-da1b32c712fb25d761b3cb22e";function P(r,t){const s={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};return v.get(S,{params:s}).then(i=>i.data).catch(i=>{throw console.error("Error fetching images:",i),i})}const d=document.querySelector(".gallery"),f=document.querySelector(".loader"),m=document.querySelector(".load-more"),B=new w(".gallery a",{captionsData:"alt",captionDelay:250});function E(r){const t=r.map(({webformatURL:s,largeImageURL:i,tags:e,likes:o,views:n,comments:L,downloads:b})=>`
    <li class="gallery-item">
      <a href="${i}">
        <img src="${s}" alt="${e}" />
      </a>
      <div>
        <ul class="info">
          <li class="info-item"><h4>Likes:</h4><p>${o}</p></li>
          <li class="info-item"><h4>Views:</h4><p>${n}</p></li>
          <li class="info-item"><h4>Comments:</h4><p>${L}</p></li>
          <li class="info-item"><h4>Downloads:</h4><p>${b}</p></li>
        </ul>
      </div>
    </li>
  `).join("");d.insertAdjacentHTML("beforeend",t),B.refresh()}function M(){d.innerHTML=""}function $(){f.classList.add("is-visible")}function I(){f.classList.remove("is-visible")}function O(){m.classList.add("is-visible")}function h(){m.classList.remove("is-visible")}const g=document.querySelector(".form"),R=g.elements["search-text"],x=document.querySelector(".load-more");let p="",l=1,c=0,u=0;g.addEventListener("submit",C);x.addEventListener("click",H);function C(r){r.preventDefault();const t=R.value.trim();if(!t){a.warning({message:"Please enter a search term.",position:"topRight"});return}p=t,l=1,u=0,M(),h(),y()}function H(){l+=1,y(!0)}async function y(r=!1){$();try{const t=await P(p,l),{hits:s,totalHits:i}=t;if(u=i,c=c||s.length,s.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3});return}E(s),l*c<u?O():(h(),r&&a.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"})),r&&A()}catch{a.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{I()}}function A(){const r=document.querySelector(".gallery").firstElementChild;if(!r)return;const{height:t}=r.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
