(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"f+ep":function(n,l,o){"use strict";o.r(l);var t=o("CcnG"),i=o("WDKR"),e=function(){function n(n,l,o){this.matDialog=n,this.router=l,this.userService=o}return n.prototype.ngOnInit=function(){},n.prototype.ngAfterViewInit=function(){var n=this;setTimeout(function(){n._dialogRef=n.matDialog.open(n.loginDialog),n._dialogRef.afterClosed().subscribe(function(){n.router.navigate([""])})})},n.prototype.closeLoginDialog=function(){this._dialogRef.close()},n.prototype.loginOrLogout=function(){this.userService.authenticated?this.userService.logout():this.userService.login(),this.closeLoginDialog()},n.prototype.buttonInfo=function(){return this.userService.authenticated?{buttonText:this.userService.currentUser.displayName+", deseja sair?",buttonImageUrl:this.userService.currentUser.photoURL}:{buttonText:"Login com google",buttonImageUrl:"assets/images/google-icon.svg"}},n.prototype.isAnyUser=function(){return this.userService.authenticated},n}(),u=o("o3x0"),r=o("UodH"),a=function(){return function(){}}(),g=o("t68o"),c=o("pMnS"),b=o("bujt"),s=o("dWZg"),d=o("lLAP"),f=o("wFw1"),p=o("ZYCi"),m=t.pb({encapsulation:0,styles:[[".login-dialog[_ngcontent-%COMP%]{display:flex;flex-direction:column}.login-dialog__line[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:1rem 0}.login-dialog__line[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}.login-dialog__line[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{text-align:center;font-size:12px;display:flex;justify-content:center;align-items:center}.login-dialog__line[_ngcontent-%COMP%]   .google-login[_ngcontent-%COMP%]{display:flex}.login-dialog__line[_ngcontent-%COMP%]   .google-login-text[_ngcontent-%COMP%]{margin-left:1rem;white-space:normal;line-height:1.2rem}.login-dialog__line[_ngcontent-%COMP%]   .google-login[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:4rem;border-radius:2px;margin:1rem}"]],data:{}});function y(n){return t.Hb(0,[(n()(),t.rb(0,0,null,null,12,"div",[["class","login-dialog"]],null,null,null,null,null)),(n()(),t.rb(1,0,null,null,6,"div",[["class","login-dialog__line"]],null,null,null,null,null)),(n()(),t.rb(2,0,null,null,5,"button",[["mat-raised-button",""]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(n,l,o){var t=!0;return"click"===l&&(t=!1!==n.component.loginOrLogout()&&t),t},b.b,b.a)),t.qb(3,180224,null,0,r.b,[t.k,s.a,d.f,[2,f.a]],{color:[0,"color"]},null),(n()(),t.rb(4,0,null,0,3,"div",[["class","google-login"]],null,null,null,null,null)),(n()(),t.rb(5,0,null,null,0,"img",[["alt","Angular Logo"]],[[8,"src",4]],null,null,null,null)),(n()(),t.rb(6,0,null,null,1,"strong",[["class","google-login-text"]],null,null,null,null,null)),(n()(),t.Gb(7,null,[" "," "])),(n()(),t.rb(8,0,null,null,4,"div",[["class","login-dialog__line"]],null,null,null,null,null)),(n()(),t.rb(9,0,null,null,3,"button",[["mat-raised-button",""]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(n,l,o){var t=!0;return"click"===l&&(t=!1!==n.component.closeLoginDialog()&&t),t},b.b,b.a)),t.qb(10,180224,null,0,r.b,[t.k,s.a,d.f,[2,f.a]],{color:[0,"color"]},null),(n()(),t.rb(11,0,null,0,1,"strong",[],null,null,null,null,null)),(n()(),t.Gb(-1,null,["Agora n\xe3o"]))],function(n,l){var o=l.component;n(l,3,0,o.isAnyUser()?"accent":null),n(l,10,0,o.isAnyUser()?null:"primary")},function(n,l){var o=l.component;n(l,2,0,t.Ab(l,3).disabled||null,"NoopAnimations"===t.Ab(l,3)._animationMode),n(l,5,0,o.buttonInfo().buttonImageUrl),n(l,7,0,o.buttonInfo().buttonText),n(l,9,0,t.Ab(l,10).disabled||null,"NoopAnimations"===t.Ab(l,10)._animationMode)})}function _(n){return t.Hb(0,[t.Eb(402653184,1,{loginDialog:0}),(n()(),t.ib(0,[[1,2],["loginDialog",2]],null,0,null,y))],null,null)}function h(n){return t.Hb(0,[(n()(),t.rb(0,0,null,null,1,"app-login",[],null,null,null,_,m)),t.qb(1,4308992,null,0,e,[u.d,p.k,i.a],null,null)],function(n,l){n(l,1,0)},null)}var v=t.nb("app-login",e,h,{},{},[]),M=o("Ip0R"),x=o("eDkP"),C=o("Fzqc"),O=o("4c35"),A=o("qAlS"),P=o("Wf4p"),k=o("ZYjt");o.d(l,"LoginModuleNgFactory",function(){return w});var w=t.ob(a,[],function(n){return t.xb([t.yb(512,t.j,t.db,[[8,[g.a,c.a,v]],[3,t.j],t.y]),t.yb(4608,M.l,M.k,[t.v,[2,M.v]]),t.yb(4608,x.a,x.a,[x.g,x.c,t.j,x.f,x.d,t.r,t.A,M.c,C.b,[2,M.f]]),t.yb(5120,x.h,x.i,[x.a]),t.yb(5120,u.b,u.c,[x.a]),t.yb(135680,u.d,u.d,[x.a,t.r,[2,M.f],[2,u.a],u.b,[3,u.d],x.c]),t.yb(1073742336,M.b,M.b,[]),t.yb(1073742336,C.a,C.a,[]),t.yb(1073742336,O.f,O.f,[]),t.yb(1073742336,s.b,s.b,[]),t.yb(1073742336,A.b,A.b,[]),t.yb(1073742336,x.e,x.e,[]),t.yb(1073742336,P.g,P.g,[[2,P.c],[2,k.g]]),t.yb(1073742336,u.g,u.g,[]),t.yb(1073742336,P.i,P.i,[]),t.yb(1073742336,r.c,r.c,[]),t.yb(1073742336,p.m,p.m,[[2,p.s],[2,p.k]]),t.yb(1073742336,a,a,[]),t.yb(1024,p.i,function(){return[[{path:"",component:e}]]},[])])})}}]);