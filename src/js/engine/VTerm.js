/* Terminal interface which solve completion problem */

function commonprefix(array) {
  //https://stackoverflow.com/questions/1916218/find-the-longest-common-starting-substring-in-a-set-of-strings/1917041#1917041
  var A= array.concat().sort(), 
    a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
  while(i<L && a1.charAt(i)=== a2.charAt(i)) i++;
  return a1.substring(0, i);
}
function addspace(i){return i+' ';}

function VTerm(container_id, img_dir,  img_id, context){
  var t=this;
  /* non dom properties */
  t.context = context;
  t.img_dir=(img_dir ? img_dir : './img/'); // shall contains last slash './img/'
  t.imgs=[];
  t.history=[];
  t.histchecking=false;
  t.histindex=0;
  // live properties
  t.scrolling=0;
  /* dom properties (view) */
  t.container = dom.Id(container_id);
  t.monitor = addEl(t.container,'div','monitor');
  t.cmdline = addEl(t.container,'p','input');
//  t.input = addAttrs(addEl(t.cmdline,'input'),{autofocus:'autofocus',size:80});
  t.input = addAttrs(addEl(t.cmdline,'input'),{size:80});
  var b=addEl(t.container,'div','belt');
  var k=addEl(b,'div','keys');
  t.suggestions= addEl(b,'div','suggest');
  // buttons
  addEl(k,'button','key','✗','Ctrl-U',function(e){ t.set_line(''); t.show_suggestions(t.context.commands.map(addspace)); });
  addEl(k,'button','key','↹','Tab',function(e){t.make_suggestions();});
  addEl(k,'button','key','↵','Enter',function(e){t.enter();});
  // img element if exist
  t.img_element= (img_id ? dom.Id(img_id) : null );
}
VTerm.prototype={
  start: function(ctx){
    this.setContext(ctx);
    this.behave();
  },
  setContext: function(ctx){
    this.context=ctx;
    this.show_suggestions(this.context.commands.map(addspace));
  },
  push_img: function(img){
    this.imgs.push(img);
    return this;
  },
  epic_img_enter: function(i, clss, scrl_timeout, scrl_period, scrl_inc){
    var t=this;
    var timeout=d(scrl_timeout,1000);
    var period=d(scrl_period,1000);
    if (t.img_element){
      addAttrs(t.img_element, {src: t.img_dir + i.src, alt:i.alt, title:i.title});
    } else {
      var c = addEl(t.monitor,'div', "img-container "+clss);
      addAttrs(addEl(c,'img'),{src:t.img_dir + i.src,title:i.title,alt:i.alt})
        .onload=function(){
          c.className+=' loaded';
          setTimeout(function(){ 
            t.scrl(period,scrl_inc); 
          },timeout);
        };
    }
  },
  show_img: function(){
    var t=this;
    if (t.imgs.length>0) {
      if (t.img_element){
        var i=t.imgs.pop();
        if (i.hasOwnProperty('src')){
          addAttrs(t.img_element, {src: t.img_dir + i.src, alt:i.alt, title:i.title});
        } else {
          //Always show blank image when moving into a room
          addAttrs(t.img_element, {src: t.img_dir + img.room_none.src, alt:img.room_none.alt, title:img.room_none.title});
        }
      } else {
        var c = addEl(t.monitor,'div', "img-container");
        for (var i in t.imgs) {
          if (t.imgs.hasOwnProperty(i)){
            var im=t.imgs[i];
            if (im && im.alt.length > 0){
              addAttrs(addEl(c,'img'),{src:t.img_dir + im.src,title:im.title,alt:im.alt})
                .
                //                onload=t.scrl;
                onload=function(){
                  //                  setTimeout(function() {
                  t.scrl();
                  //                  },200); 
                };
            }
          }
        }
      }
      this.imgs=[];
    } 
  },
  show_previous_prompt: function (txt){
    addEl(this.monitor,'p','input').innerText = txt;
  },

  get_line:function(){
    return this.input.value.replace(/\s+/," ");
  },
  set_line:function(val){
    this.input.value = val;
  },
  show_msg: function (txt){
    addEl(this.monitor,'p','msg').innerText = txt;
  },
  make_suggestions: function (autocomplete){
    var t=this;    
    var ac=d(autocomplete,true);
    t.suggestions.innerHTML = '';
    var l=t.get_line();
    args=l.split(' ');
    if (args.length > 0) {
      var tocomplete;
      var match=[];
//      console.log('suggestions',ac,l,args);
      if (args.length > 1) {
        tocomplete=args.pop();
        match=t.context._completeArgs(args[0],tocomplete);
      } else if (args[0].length>0){
        if (t.context.commands.indexOf(args[0])>-1) {
        tocomplete="";
        t.set_line(l+' ');
        match=t.context._completeArgs(args[0],tocomplete);
        } else {
          tocomplete=args.pop();
          for(var i = 0; i<t.context.commands.length; i++){
            if(t.context.commands[i].match("^"+tocomplete)){
                match.push(t.context.commands[i]);
            }
          }
        }
      } else {
        tocomplete="";
        match=t.context.commands.map(addspace);
      }
      if (match.length == 0){
        t.set_line(l+'?');
        setTimeout(function(){t.set_line(l+'??');},100)
        setTimeout(function(){t.set_line(l);},200)
      }
      else if (match.length == 1 ){
        if (ac) {
          var lb=tocomplete.split('/');
          lb.pop();
          lb.push(match[0]);
          args.push(lb.join('/'));
          t.set_line(args.join(" "));
        } else {
          if (match[0] == tocomplete) {
            t.set_line(l+' ');
          }
          t.show_suggestions(match);
        }
      } else {
        var lcp=commonprefix(match);
        t.show_suggestions(match);
        if (match.indexOf(lcp)>-1){
          t.set_line(l+' ');
        }
        if (lcp.length > 0 && ac){
          args.push(lcp);
          t.set_line(args.join(" "));
        }
      }
    }
  },
  show_suggestions: function (list){
    this.suggestions.innerHTML = '';
    for (var i=0;i<list.length; i++){
      this.show_suggestion(list[i]);
    }
  },
  show_suggestion: function (txt){
    var m=dom.El('button'); m.innerHTML='<span>'+txt+'</span>';
    var t=this;
    t.histindex=0;
    m.onclick =function (e){
      var l=t.get_line();
      var newl=l+txt;
      t.set_line(newl);
      //      t.hide_suggestions();
      if (t.argsValid(newl.replace(/\s+$/,"").split(" "))){
        t.enter();
      } else {
        t.make_suggestions(false);
      }
    }
    t.suggestions.appendChild(m);
    t.scrl();
  },
  hide_suggestions: function (){
    this.suggestions.innerHTML = '';
  },
  argsValid: function(args){
    return this.context._validArgs(args.shift(),args);
  },
  enter : function(){
    var t=this;   
    var pr=t.input;
    var mon=t.monitor;
    t.monitor = addEl(mon,'div','screen');
    t.histindex=0;
    // Enter -> exec command
    args=t.get_line().replace(/\s+$/,"").split(' ');
    echo=t.context.exec(t, args);
    t.show_previous_prompt(pr.value);
    t.history.push(pr.value);
    t.show_img();
    t.show_msg(echo);
    t.set_line('');
    t.hide_suggestions();
    t.show_suggestions(this.context.commands.map(addspace));
    t.monitor = mon;
  },
  scrl : function(period,increment){
    // we want to scroll to the bottom
    var c=this.container;
    var increment = d(increment,4), time = d(period,1);
    var t=this;
    this.scrolling++;
    function scroller() {
      if (this.scrolling>1){
        this.scrooling--;
      } else {
        var diff= c.offsetTop + c.offsetHeight - window.pageYOffset - window.innerHeight;
        if ( diff > 0){
          window.scrollBy( 0,increment );
          setTimeout(scroller, time);
        } else {
          this.scrolling--;
        }
      }
    }
    scroller();
  }, 
  behave: function (){
    // behavior 
    var args;
    var t=this;
    var pr=t.input;
    //    var cmd=this.cmdspan;

    dom.body.onkeydown = function (e) {
      e = e || window.event;//Get event
      var k=e.which;
      if (k === 33 || k  === 34 || k === 38 || k  === 40) {
        if (e.shiftKey){
          e.preventDefault(); 
        }
      } else {
        var focused = d.activeElement;
        if ( !focused || focused != pr) {
          pr.focus();t.scrl();
        }
        pr.onkeydown(e);
      }
    }
    var scrollenable=function (e) {
      t.scrolling=true;
    };

    t.container.onscroll=scrollenable;
    t.container.onclick=scrollenable;
    window.onbeforeunload = function(e) {
      return 'Quit the game ?';
    }
    pr.onkeydown = function (e) {
      var k=e.which;
      var overide=false;
      if ( k === 9 || k == 13 ) { // TAB - ENTER
        overide=true;
      } else if ( e.ctrlKey ) {
        if (k === 67  || k === 88 || k === 86 || k === 89 || k === 90  ) { 
          // CTRL+C - CTRL+X - CTRL+V - CTRL+Y -CTRL+Z
          overide=true;
        }
      } else if (k === 33 || k  === 34 ){
        window.focus();
        pr.blur();
      }
      if ( k === 38 || k  === 40) {
        overide=true;
      }
      if (overide) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
    pr.onkeyup = function (e) {
      var k=e.which;
      var echo="";
      var overide=false;
      t.hide_suggestions();
      if (k === 13) { // ENTER
        overide=true;
        t.enter();t.scrl();
      } else if (e.which === 9 && !(e.ctrlKey || e.altKey)) { // TAB
        overide=true;
        t.make_suggestions();t.scrl();
      } else if (e.ctrlKey){
        if (k === 67) { // CTRL+C - clear
          overide=true;
          t.show_previous_prompt(t.get_line() + '^C');
          t.set_line('');
        } else if (k === 85) { // CTRL+U - clear line
          overide=true;
          t.set_line('');
        } else if ( k === 88 || k === 86 || k === 89 || k === 90  ) {
          // CTRL + X - CTRL + V - CTRL + Z - CTRL + Y
          // replace CTRL + W - remove last component
          overide=true;
          var line=t.get_line();
          line=line.replace(/\/$/,"");
          var lineparts=line.split(' ');
          var lastarg=lineparts.pop().split('/');
          lastarg.pop();
          if (lastarg.length > 1) {
            lastarg.push('');
          }
          lineparts.push(lastarg.join('/'));
          t.set_line(lineparts.join(' '));
        }
      } else if (k === 33 || k  === 34) {
        // pgup / pgdn / up / down
        window.focus();
        // Remove focus from any focused element
        pr.blur();
      } else if (k  === 40) {//down
        if (t.histindex>0){
          t.histindex--;
          t.set_line(t.history[t.history.length-1-t.histindex]);
        } 
      } else if ( k === 38) {//up
        //        console.log(t.histindex, t.history);
        if (t.histindex < t.history.length){
          var prev=t.history[t.history.length-1-t.histindex];
          if (t.histindex==0){
            var txt=t.get_line();
            if (txt.length>0 && txt !== prev ){
              t.history.push(txt);
            }
          }
          t.set_line(prev);
          t.histindex++;
        }
      } else {

      }
      //      console.log(k);
      //    cmdspan.innerText=pr.value;
      if (overide) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    }
  }
}



