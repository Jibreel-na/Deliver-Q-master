(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{GKiA:function(t,i,e){"use strict";e.r(i),e.d(i,"NotificationsModule",(function(){return m}));var n=e("Ip0R"),o=e("Pe/6"),r=e("F5nt"),c=e("lbN8"),s=e("d5t/"),a=e("CcnG"),l=e("gIcY"),f=e("EApP"),b=e("dU8u");function p(t,i){if(1&t){var e=a.Wb();a.Tb(0),a.Vb(1,"div",3),a.dc("click",(function(){a.xc(e);var t=i.$implicit;return a.hc().restService.updateNotification(t)})),a.Vb(2,"div",4),a.Vb(3,"div",5),a.Qb(4,"i",6),a.Ub(),a.Vb(5,"div",7),a.Vb(6,"h6"),a.Fc(7),a.Ub(),a.Vb(8,"p"),a.Fc(9),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Sb()}if(2&t){var n=i.$implicit;a.Cb(2),a.nc("ngClass",n.read?"border-secondary bg-white read":"border-primary bg-light notifications"),a.Cb(2),a.nc("ngClass",n.read?"text-secondary":"text-primary"),a.Cb(3),a.Gc(n.title),a.Cb(2),a.Gc(n.description)}}var u=function(){function t(t,i,e,n,o){this.restService=t,this.fb=i,this.fuseSplashScreenService=e,this.appService=n,this.toastr=o,this.filter=new c.a,this.notifications=[]}return t.prototype.ngOnInit=function(){scrollTo(0,0),this.filter.page=0,window.scroll(0,0),this.fuseSplashScreenService.hide()},t.\u0275fac=function(i){return new(i||t)(a.Pb(o.a),a.Pb(l.c),a.Pb(s.a),a.Pb(r.a),a.Pb(f.b))},t.\u0275cmp=a.Jb({type:t,selectors:[["app-notification"]],decls:3,vars:3,consts:[[1,"container","p-5"],["infiniteScroll","",1,"row",3,"infiniteScrollDistance","infiniteScrollThrottle","scrolled"],[4,"ngFor","ngForOf"],[1,"col-md-12",3,"click"],[1,"d-flex","justify-content-start","my-3","p-3","border-left",3,"ngClass"],[1,"my-auto"],["aria-hidden","true",1,"fa","fa","fa-bell-o","mx-1",3,"ngClass"],[1,"mx-5","text-left"]],template:function(t,i){1&t&&(a.Vb(0,"div",0),a.Vb(1,"div",1),a.dc("scrolled",(function(){return i.restService.notifications.length>=20&&(i.filter.page=i.filter.page+1),i.restService.notifications.length>=20&&i.restService.getNotifications(i.filter.page)})),a.Ec(2,p,10,4,"ng-container",2),a.Ub(),a.Ub()),2&t&&(a.Cb(1),a.nc("infiniteScrollDistance",0)("infiniteScrollThrottle",300),a.Cb(1),a.nc("ngForOf",i.restService.allNotifications))},directives:[b.a,n.j,n.i],styles:[".notifications[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:4rem!important}.notifications[_ngcontent-%COMP%]{box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);border-width:5px!important;cursor:pointer}.notifications[_ngcontent-%COMP%]   .fa-bell-o[_ngcontent-%COMP%]{font-size:2rem}.read[_ngcontent-%COMP%]{border:1px solid}.read[_ngcontent-%COMP%]   .fa-bell-o[_ngcontent-%COMP%]{font-size:2rem}"]}),t}(),d=e("ZYCi"),h=e("A7o+"),g=[{path:"notifications",component:u}],m=function(){function t(){}return t.\u0275mod=a.Nb({type:t}),t.\u0275inj=a.Mb({factory:function(i){return new(i||t)},imports:[[n.b,d.h.forChild(g),h.b,b.b]]}),t}()},"d5t/":function(t,i,e){"use strict";e.d(i,"a",(function(){return l}));var n=e("Ip0R"),o=e("ihYY"),r=e("ZYCi"),c=e("VnD/"),s=e("t9fZ"),a=e("CcnG"),l=function(){function t(t,i,e){this._animationBuilder=t,this._document=i,this._router=e,this._init()}return t.prototype.show=function(){var t=this;this.player=this._animationBuilder.build([Object(o.k)({opacity:"0",zIndex:"99999"}),Object(o.e)("400ms ease",Object(o.k)({opacity:"1"}))]).create(this.splashScreenEl),setTimeout((function(){t.player.play()}),0)},t.prototype.hide=function(){var t=this;this.player=this._animationBuilder.build([Object(o.k)({opacity:"1"}),Object(o.e)("400ms ease",Object(o.k)({opacity:"0",zIndex:"-10"}))]).create(this.splashScreenEl),setTimeout((function(){t.player.play()}),0)},t.prototype._init=function(){this.splashScreenEl=this._document.body.querySelector("#fuse-splash-screen"),this.splashScreenEl&&this._router.events.pipe(Object(c.a)((function(t){return t instanceof r.b})),Object(s.a)(1)).subscribe((function(){setTimeout((function(){}),5e3)}))},t.\u0275fac=function(i){return new(i||t)(a.Zb(o.b),a.Zb(n.c),a.Zb(r.d))},t.\u0275prov=a.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}]);