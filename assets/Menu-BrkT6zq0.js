import{r as c,j as s,c as x,u as j,L as p,a as f,b as v,P as q,A as N,H as w}from"./index-BmkMiYTo.js";const y="_input_1syrv_1",z="_icon_1syrv_35",o={input:y,"input-wrapper":"_input-wrapper_1syrv_27",icon:z},k=c.forwardRef(function({isValid:t=!0,className:r,...n},d){return s.jsxs("div",{className:o["input-wrapper"],children:[s.jsx("img",{className:o.icon,src:"./search.svg",alt:"лупа"}),s.jsx("input",{...n,ref:d,className:x(o.input,r,{[o.invalid]:!t}),placeholder:"Введите блюдо или состав"})]})}),F="_head_19qps_1",$={head:F},E="_link_gqz4q_1",L="_head_gqz4q_9",S="_card_gqz4q_27",I="_price_gqz4q_41",P="_rating_gqz4q_99",b="_footer_gqz4q_133",A="_title_gqz4q_141",C="_desc_gqz4q_157",a={link:E,head:L,card:S,price:I,"add-to-cart":"_add-to-cart_gqz4q_71",rating:P,footer:b,title:A,desc:C};function M(e){const t=j(),r=n=>{n.preventDefault(),t(f.add(e.id))};return s.jsx(p,{to:`/product/${e.id}`,className:a.link,children:s.jsxs("div",{className:a.card,children:[s.jsxs("div",{className:a.head,style:{backgroundImage:`url(${e.image})`},children:[s.jsxs("div",{className:a.price,children:[e.price," ",s.jsx("span",{children:"₽"})]}),s.jsx("button",{className:a["add-to-cart"],onClick:r,children:s.jsx("img",{src:"./cart-white.svg",alt:"Добавить в корзину"})}),s.jsxs("div",{className:a.rating,children:[e.rating,s.jsx("img",{src:"./star.svg",alt:"звездочка"})]})]}),s.jsxs("div",{className:a.footer,children:[s.jsx("div",{className:a.title,children:e.name}),s.jsx("div",{className:a.desc,children:e.description})]})]})})}const R="_wrapper_1j8oi_1",D={wrapper:R};function H({products:e}){return s.jsx("div",{className:D.wrapper,children:e.map(t=>s.jsx(M,{id:t.id,image:t.image,rating:t.rating,price:t.price,name:t.name,description:t.ingredients.join(", ")},t.id))})}function B(){const[e,t]=c.useState([]),[r,n]=c.useState(!1),[d,g]=c.useState(),[u,_]=c.useState();c.useEffect(()=>{h(u)},[u]);const h=async l=>{try{n(!0);const{data:i}=await v.get(`${q}/products`,{params:{name:l}});t(i),n(!1)}catch(i){console.error(i),i instanceof N&&g(i.message),n(!1);return}},m=l=>{_(l.target.value)};return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:$.head,children:[s.jsx(w,{children:"Меню"}),s.jsx(k,{onChange:m})]}),s.jsxs("div",{children:[!r&&e.length>0&&s.jsx(H,{products:e}),r&&s.jsx(s.Fragment,{children:"Готовим пиццу..."}),!r&&e.length<=0&&s.jsx(s.Fragment,{children:"Ничего не найдено =("}),d&&s.jsx(s.Fragment,{children:d})]})]})}export{B as Menu,B as default};