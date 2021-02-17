(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["settings"],{"26d3":function(t,e,n){"use strict";n.r(e);var o=n("7a23"),s={class:"py-2 sticky-top bg-light-variant"},l={class:"flex-shrink-0"},a={class:"mb-3 py-3 container-lg"},c=Object(o["h"])("h2",null,"Settings",-1),r=Object(o["h"])("hr",null,null,-1),i=Object(o["h"])("h4",{class:"mb-3"},"General",-1),m={class:"card"},b={class:"list-group list-group-flush"},h={class:"list-group-item"},u=Object(o["h"])("h6",null,"Email",-1),d={class:"list-group-item"},p={class:"row g-2 align-items-center"},j={class:"col-lg"},O=Object(o["h"])("h6",null,"Display Name",-1),f={class:"col-lg-auto"},g={class:"mt-3 d-flex flex-column",action:"/api/auth/user/edit",method:"post"},w=Object(o["h"])("h6",null,"Change Display Name",-1),C=Object(o["h"])("button",{class:"mt-auto btn btn-sm btn-primary align-self-end",type:"submit"}," Submit ",-1),y={class:"list-group-item"},x={class:"row g-2 align-items-center"},v={class:"col-lg"},F=Object(o["h"])("h6",null,"Contact No",-1),$={class:"col-lg-auto"},k={class:"mt-3 d-flex flex-column",action:"/api/auth/user/edit",method:"post"},N=Object(o["h"])("h6",null,"Set Up / Change Contact No",-1),S=Object(o["h"])("button",{class:"mt-auto btn btn-sm btn-primary align-self-end",type:"submit"}," Submit ",-1),L=Object(o["h"])("hr",null,null,-1),M=Object(o["h"])("h4",null,"Authentication",-1),V={class:"card"},H={class:"list-group list-group-flush"},P={class:"list-group-item"},T={class:"row g-2 align-items-center"},U={class:"col-lg"},G=Object(o["h"])("h6",null,"Login Credentials",-1),q={class:"col-lg-auto"},E={key:0,class:"d-lg-flex"},_={class:"mt-3 flex-grow-1 d-flex flex-column",action:"api/auth/user/meta/edit",method:"post"},D=Object(o["h"])("h6",null,"Change Username",-1),I=Object(o["h"])("input",{class:"mb-3 form-control form-control-sm",type:"password",name:"passwordcurrent",placeholder:"Current Password"},null,-1),J=Object(o["h"])("button",{class:"mt-auto btn btn-sm btn-primary align-self-end",type:"submit"}," Submit ",-1),A=Object(o["h"])("div",{class:"mx-2"},null,-1),Q=Object(o["h"])("form",{class:"mt-3 flex-grow-1 d-flex flex-column",action:"api/auth/user/meta/edit",method:"post"},[Object(o["h"])("h6",null,"Change Password"),Object(o["h"])("input",{class:"mb-2 form-control form-control-sm",type:"password",name:"password",placeholder:"New Password"}),Object(o["h"])("input",{class:"mb-3 form-control form-control-sm",type:"password",name:"passwordconfirm",placeholder:"Confirm New Password"}),Object(o["h"])("input",{class:"mb-3 form-control form-control-sm",type:"password",name:"passwordcurrent",placeholder:"Current Password"}),Object(o["h"])("button",{class:"mt-auto btn btn-sm btn-primary align-self-end",type:"submit"}," Submit ")],-1),R={key:1,class:"mt-3 d-flex flex-column",action:"api/auth/user/meta/add",method:"post"},z=Object(o["h"])("h6",null,"Create Login Credentials",-1),B=Object(o["h"])("input",{class:"mb-3 form-control form-control-sm",type:"text",name:"username",placeholder:"Username"},null,-1),K=Object(o["h"])("input",{class:"mb-2 form-control form-control-sm",type:"password",name:"password",placeholder:"Password"},null,-1),W=Object(o["h"])("input",{class:"mb-3 form-control form-control-sm",type:"password",name:"passwordconfirm",placeholder:"Confirm Password"},null,-1),X=Object(o["h"])("button",{class:"mt-auto btn btn-sm btn-primary align-self-end",type:"submit"}," Submit ",-1),Y={class:"list-group-item"},Z={class:"row g-2 align-items-center"},tt=Object(o["h"])("div",{class:"col-lg"},[Object(o["h"])("h6",{class:"mb-0"},"Facebook")],-1),et={class:"col-lg-auto"},nt={class:"list-group-item"},ot={class:"row g-2 align-items-center"},st=Object(o["h"])("div",{class:"col-lg"},[Object(o["h"])("h6",{class:"mb-0"},"Google")],-1),lt={class:"col-lg-auto"},at={class:"mt-auto"};function ct(t,e,n,ct,rt,it){var mt=Object(o["w"])("nav-header"),bt=Object(o["w"])("collapse"),ht=Object(o["w"])("nav-footer"),ut=Object(o["w"])("sidenav");return Object(o["q"])(),Object(o["d"])(o["a"],null,[Object(o["h"])("div",s,[Object(o["h"])(mt,{onQueryInput:e[1]||(e[1]=function(e){return t.$router.push("/search?query="+encodeURIComponent(e))}),onMoreClick:e[2]||(e[2]=function(e){return t.$refs.sidenav.showSidenav()})})]),Object(o["h"])("div",l,[Object(o["h"])("div",a,[c,r,i,Object(o["h"])("div",m,[Object(o["h"])("ul",b,[Object(o["h"])("li",h,[u,Object(o["h"])("span",{textContent:Object(o["y"])(t.$store.state.auth&&t.$store.state.auth.email)},null,8,["textContent"])]),Object(o["h"])("li",d,[Object(o["h"])("div",p,[Object(o["h"])("div",j,[Object(o["h"])("div",{class:{"text-muted":t.showNameForm}},[O,Object(o["h"])("span",{textContent:Object(o["y"])(t.$store.state.auth&&t.$store.state.auth.firstName+" "+t.$store.state.auth.lastName)},null,8,["textContent"])],2)]),Object(o["h"])("div",f,[Object(o["h"])("button",{class:["btn btn-sm",t.showNameForm?"btn-light":"btn-primary"],type:"button",onClick:e[3]||(e[3]=function(e){return t.$refs.nameForm.toggle()})},[Object(o["h"])("span",{innerHTML:t.$octicons[t.showNameForm?"x":"pencil"].toSVG({width:16,height:16,class:"d-inline-block align-text-bottom"})},null,8,["innerHTML"]),Object(o["h"])("span",{class:"ms-1",textContent:Object(o["y"])(t.showNameForm?"Close":"Edit")},null,8,["textContent"])],2)])]),Object(o["h"])(bt,{ref:"nameForm",id:"nameForm",modelValue:t.showNameForm,"onUpdate:modelValue":e[4]||(e[4]=function(e){return t.showNameForm=e})},{default:Object(o["F"])((function(){return[Object(o["h"])("form",g,[w,Object(o["h"])("input",{class:"mb-2 form-control form-control-sm",type:"text",name:"firstname",placeholder:"First Name",value:t.$store.state.auth&&t.$store.state.auth.firstName},null,8,["value"]),Object(o["h"])("input",{class:"mb-3 form-control form-control-sm",type:"text",name:"lastname",placeholder:"Last Name",value:t.$store.state.auth&&t.$store.state.auth.lastName},null,8,["value"]),C])]})),_:1},8,["modelValue"])]),Object(o["h"])("li",y,[Object(o["h"])("div",x,[Object(o["h"])("div",v,[Object(o["h"])("div",{class:{"text-muted":t.showContactForm}},[F,Object(o["h"])("span",{textContent:Object(o["y"])(t.$store.state.auth&&t.$store.state.auth.contact||"Not Set")},null,8,["textContent"])],2)]),Object(o["h"])("div",$,[t.$store.state.auth&&t.$store.state.auth.contact?(Object(o["q"])(),Object(o["d"])("button",{key:0,class:["btn btn-sm",t.showContactForm?"btn-light":"btn-primary"],type:"button",onClick:e[5]||(e[5]=function(e){return t.$refs.contactForm.toggle()})},[Object(o["h"])("span",{innerHTML:t.$octicons[t.showContactForm?"x":"pencil"].toSVG({width:16,height:16,class:"d-inline-block align-text-bottom"})},null,8,["innerHTML"]),Object(o["h"])("span",{class:"ms-1",textContent:Object(o["y"])(t.showContactForm?"Close":"Edit")},null,8,["textContent"])],2)):(Object(o["q"])(),Object(o["d"])("button",{key:1,class:["btn btn-sm",t.showContactForm?"btn-light":"btn-primary"],type:"button",onClick:e[6]||(e[6]=function(e){return t.$refs.contactForm.toggle()})},[Object(o["h"])("span",{innerHTML:t.$octicons[t.showContactForm?"x":"plus"].toSVG({width:16,height:16,class:"d-inline-block align-text-bottom"})},null,8,["innerHTML"]),Object(o["h"])("span",{class:"ms-1",textContent:Object(o["y"])(t.showContactForm?"Close":"Set Up")},null,8,["textContent"])],2))])]),Object(o["h"])(bt,{ref:"contactForm",id:"contactForm",modelValue:t.showContactForm,"onUpdate:modelValue":e[7]||(e[7]=function(e){return t.showContactForm=e})},{default:Object(o["F"])((function(){return[Object(o["h"])("form",k,[N,Object(o["h"])("input",{class:"mb-3 form-control form-control-sm",type:"text",name:"contact",placeholder:"Contact No",value:t.$store.state.auth&&t.$store.state.auth.contact},null,8,["value"]),S])]})),_:1},8,["modelValue"])])])]),L,M,Object(o["h"])("div",V,[Object(o["h"])("ul",H,[Object(o["h"])("li",P,[Object(o["h"])("div",T,[Object(o["h"])("div",U,[Object(o["h"])("div",{class:{"text-muted":t.showCredentialForm}},[G,Object(o["h"])("span",{textContent:Object(o["y"])(t.meta&&t.meta.credentials&&"Username: "+t.meta.credentials.username||"Not Set")},null,8,["textContent"])],2)]),Object(o["h"])("div",q,[t.meta&&t.meta.credentials?(Object(o["q"])(),Object(o["d"])("button",{key:0,class:["btn btn-sm",t.showCredentialForm?"btn-light":"btn-primary"],type:"button",onClick:e[8]||(e[8]=function(e){return t.$refs.credentialForm.toggle()})},[Object(o["h"])("span",{innerHTML:t.$octicons[t.showCredentialForm?"x":"pencil"].toSVG({width:16,height:16,class:"d-inline-block align-text-bottom"})},null,8,["innerHTML"]),Object(o["h"])("span",{class:"ms-1",textContent:Object(o["y"])(t.showCredentialForm?"Close":"Edit")},null,8,["textContent"])],2)):(Object(o["q"])(),Object(o["d"])("button",{key:1,class:["btn btn-sm",t.showCredentialForm?"btn-light":"btn-primary"],type:"button",onClick:e[9]||(e[9]=function(e){return t.$refs.credentialForm.toggle()})},[Object(o["h"])("span",{innerHTML:t.$octicons[t.showCredentialForm?"x":"plus"].toSVG({width:16,height:16,class:"d-inline-block align-text-bottom"})},null,8,["innerHTML"]),Object(o["h"])("span",{class:"ms-1",textContent:Object(o["y"])(t.showCredentialForm?"Close":"Set Up")},null,8,["textContent"])],2))])]),Object(o["h"])(bt,{ref:"credentialForm",id:"credentialForm",modelValue:t.showCredentialForm,"onUpdate:modelValue":e[10]||(e[10]=function(e){return t.showCredentialForm=e})},{default:Object(o["F"])((function(){return[t.meta&&t.meta.credentials?(Object(o["q"])(),Object(o["d"])("div",E,[Object(o["h"])("form",_,[D,Object(o["h"])("input",{class:"mb-3 form-control form-control-sm",type:"text",name:"username",placeholder:"Username",value:t.meta&&t.meta.credentials&&t.meta.credentials.username},null,8,["value"]),I,J]),A,Q])):(Object(o["q"])(),Object(o["d"])("form",R,[z,B,K,W,X]))]})),_:1},8,["modelValue"])]),Object(o["h"])("li",Y,[Object(o["h"])("div",Z,[tt,Object(o["h"])("div",et,[Object(o["h"])("button",{class:["btn btn-sm",it.hasProvider("facebook")?"btn-light":"btn-primary"],type:"button",disabled:it.hasProvider("facebook")},[Object(o["h"])("span",{innerHTML:t.$octicons["plug"].toSVG({width:16,height:16,class:"d-inline-block align-text-bottom"})},null,8,["innerHTML"]),Object(o["h"])("span",{class:"ms-1",textContent:Object(o["y"])(it.hasProvider("facebook")?"Connected":"Connect")},null,8,["textContent"])],10,["disabled"])])])]),Object(o["h"])("li",nt,[Object(o["h"])("div",ot,[st,Object(o["h"])("div",lt,[Object(o["h"])("button",{class:["btn btn-sm",it.hasProvider("google")?"btn-light":"btn-primary"],type:"button",disabled:it.hasProvider("google")},[Object(o["h"])("span",{innerHTML:t.$octicons["plug"].toSVG({width:16,height:16,class:"d-inline-block align-text-bottom"})},null,8,["innerHTML"]),Object(o["h"])("span",{class:"ms-1",textContent:Object(o["y"])(it.hasProvider("google")?"Connected":"Connect")},null,8,["textContent"])],10,["disabled"])])])])])])])]),Object(o["h"])("div",at,[Object(o["h"])(ht)]),Object(o["h"])(ut,{ref:"sidenav"},null,512)],64)}n("7db0"),n("b0c0");var rt=n("cce9"),it=n("f48b"),mt=n("f091"),bt=n("21e0"),ht={name:"Settings",components:{NavHeader:rt["a"],Collapse:it["a"],NavFooter:mt["a"],Sidenav:bt["a"]},data:function(){return{meta:null,showNameForm:!1,showContactForm:!1,showCredentialForm:!1}},beforeMount:function(){this.$api.authUserMetaFind().then(function(t){this.meta=t.data}.bind(this)).catch(function(t){console.error(t),this.meta=null}.bind(this))},methods:{hasProvider:function(t){return this.meta&&this.meta.providers&&this.meta.providers.find((function(e){return e.name==t}))}}};ht.render=ct;e["default"]=ht}}]);
//# sourceMappingURL=settings.5cc56bce.js.map