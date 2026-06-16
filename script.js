// Service card image reveal on scroll — MOBILE ONLY (viewport < 768px, the site's md: breakpoint).
// Desktop keeps the hover / focus reveal, which is handled purely in CSS.
(function () {
  if (!('IntersectionObserver' in window)) return;
  var mobile = matchMedia('(max-width: 767px)');
  var cards = document.querySelectorAll('.service-card');
  var io = null;

  function enable() {
    if (io) return;
    document.documentElement.classList.add('mobile-reveal'); // single source of truth for CSS
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('card-in-view', entry.isIntersecting);
      });
    }, { threshold: 0.35 });
    cards.forEach(function (card) { io.observe(card); });
  }

  function disable() {
    if (!io) return;
    io.disconnect();
    io = null;
    document.documentElement.classList.remove('mobile-reveal');
    cards.forEach(function (card) { card.classList.remove('card-in-view'); });
  }

  function update() { if (mobile.matches) enable(); else disable(); }
  update();
  mobile.addEventListener('change', update); // re-evaluate when crossing the breakpoint / rotating
})();

// Mobile menu toggle
(function () {
  var btn = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  function closeMenu() {
    menu.classList.remove('is-open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

// Termos modal
(function () {
  var modal = document.getElementById('termos-modal');
  var backdrop = document.getElementById('termos-backdrop');
  var openBtn = document.getElementById('open-termos');
  var closeBtn = document.getElementById('close-termos');
  if (!modal || !openBtn) return;
  function openModal(e) {
    e.preventDefault();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
  });
})();

// Privacy modal
(function () {
  var modal = document.getElementById('privacy-modal');
  var backdrop = document.getElementById('privacy-backdrop');
  var openBtn = document.getElementById('open-privacy');
  var closeBtn = document.getElementById('close-privacy');
  if (!modal || !openBtn) return;
  function openModal(e) {
    e.preventDefault();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
  });
})();

// Contact form (front-end only)
(function () {
  var form = document.getElementById('contact-form');
  var success = document.getElementById('contact-success');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    ['nome', 'email', 'mensagem'].forEach(function (id) {
      var f = document.getElementById(id);
      var ok = f.value.trim() !== '' && (id !== 'email' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
      f.style.borderColor = ok ? '' : 'var(--accent)';
      if (!ok) valid = false;
    });
    if (!valid) return;
    form.classList.add('hidden');
    success.classList.remove('hidden');
  });
})();

// Scroll/load reveal
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('anim-ready')) return;
  var els = document.querySelectorAll('.reveal');
  function showAll() { els.forEach(function (el) { el.classList.add('is-visible'); }); }
  if (!('IntersectionObserver' in window)) { showAll(); return; }
  try {
    var io = new IntersectionObserver(function (entries) {
      var i = 0;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i++ * 70) + 'ms';
          entry.target.classList.add('is-visible');
        } else {
          entry.target.style.transitionDelay = '0ms';
          entry.target.classList.remove('is-visible');
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } catch (e) { showAll(); }
})();

// Hero ASCII "gif" — twinkle a few glyphs back and forth for subtle movement
var HERO_ASCII = `                                                                                                                                                                                                           =#
                                                                                                                                                                                                           =#
    ......                                                                                                 ..                                                                                   .-                    ::
+%##############.                                                                                      :#%%%%%%#-                                                                                =%:   =#%%%%#%%#-   *#.
*#           ##*##                                                                                    *#%%%%%%%%%#                                                                                  :*%*.       -#%*
*#           #%  #%*                                                                                 +%%%%%%%%%%%%*                                                                                =%*         :  :##.
*%           #%+==*%%*                                                                               #%%%%%%%%%%%%%                                                                               :%+         *##*  %%
*%            =++++*#%                                                                               =%%#%%#%##%%%*                                                                               %%           ::   .%=
*%                  %%                                                                           .+%%#%%%%#%%%#%%##%%#:                                                                      ###: ##    .   .        #* +%%*
*#   +**********+   %%      =#%##-                                                            :*##*:-%%*%#####%*#%-  =###*:                                                          =%%%#:       ##   -%%%%#%#%*   :%=
*#   :::::------:   #%    :##%%%%%#                                                       :+%%#-  =#%= ##        +%*    .+%%%+:                                                    :#%%%%%%%.      #*   =#    =#   .%%
*#    ....::::::    ##    *%%#%%%%%*                                                  :*#%%=    =##-  #%:         :##:      .*%%#+.                                                %%%##%#%%=      :%#   #*   %-  :#*
*#   #%%%%%%%####   %%    +#%%%%#%###*:                                            +#%%*:     +%%-   +%=            *%*         :*##*=                                         .*#%%%%%%%#%%:        #%: .#. =%  #%=
*#                  %%     +%%%%%#=  +%%%#:                                   :#%##*        *%%.    =#*              :%%            :#%%%=                                 =%##%*   *#%%%%#.     *%   ##: #- %+ *%.  *%=
*%  :%%%%###%%%%%: .%%        .:#%:      =*%%#=          :*%%%*:          =%%%#+.         *%#:     :%*                 *%*              =#%%#-       =#%%%*:           +%%%*=        *#*         :     ##*##+#**#+     :
*%                  #%           *%+         =*%%#-    +%%%####%%*   :+###*-            *%#:       ##                   -%#:                -*###-.*%%##%#%%%*    :*###+:           #%-                ::::::::::
*#                 .##            =%#            :*%%##%%%%%%%%#%#%%%#=:              *#*         #%.                     *#+                   :*###%%%#%%%%%*#%%#=              :##.                 =%%%%%%%%#
*#**********+*******%#              #%-              =%%%##%%%%%#%%-                *%*.         *%-                       :%#.                  -%%#%%#%#%#%%#=                 +%*                   :++******+
 .::.:....:::::::...                 *%*             .%#%%#%%#%%%%%:             .#%*           =%*                          *%*              -**#%%%#%%#%##%##                .#%-                     .+#%%%%-
                                      -%#             *##%#%%##%%%*     *###*: .#%*            :%*                            -%%:     .+##%%%%+. #%%%%#%%%%%#=               :%%.                        =###
                                        *#=            -#%%%%%###*#%*=%%%###%%%#*              ##      -%#%#%#%%=              .#%%%%%#*+:        ######%%%%#:               *#*
                                         =##.             =***=    .#%%%%%%%%%###.            %%:     #%%%#%%%%%%#      :-+#%%%%*+#%=           -%#. .=+*+-                :%%:
                                          :%%-                     :###%%#%%##%#%+--:::::::::*#=::...+#%##%%%##%##**#%%%#*=:.      -##:        *%*                        =%#.                             :#
                                            *%*                    :###%%#%%#%#%%***********%%#**####%%##%%%#####%%:                 +%#.    .##:                        #%=                               -%
.*############*:                             -##.                   *%%%####%%%%%.         =%*       =%%%%%#%%%%%%%*=                 .#%+  +%*                        -##.                      .
*#           ####                              *#+                  *%%%%%%#%%%%#*        :#*         *%%####%%%%%--#%%%#-              .%%##-                        #%+                        *#    :#%%###%#*.   #%-
*#           ##.*##                             =%%               :%#.  +###*: *#%%*     :%%        :#%=*#%####* =#%*   =#%%%*:          +%%%:                      -%%:                             *##=       =%%=
*#           %#   *%*                            .#%=            #%+            *%#%#-   ##       .#%+             :*%#.     =*#%%*:   .##- +%#                    #%+                             :%#            :##
*%           *#%%%%%%#                             =%#    :===-=%#.              *%==##:*%-      *#*                  =%%=       .=*%%%##     *%+     -=+=:      =#*                              .#*         =%#-  ##
*%                  ##       =++-                   .%%+###%%%%%#-                *#: +%%=     *%*                      :##*        =##=####+: :##==#%%%#####: :%%:                  .=+=:        ##.          =:   :%=
*#                  #%     *##%%##*                   #####%%#%%%%*                #%:*%##*  =#%:                         .*%#:   :##-      =%%#*####%%#%%######*                   ###%%%%* *##. #%                 %* =**+
*#  :%####%%%%%##  .%%    +%%###%%%*=======++++=======##%%%%#%###%#:                #%%= .###%=                              =%#=#%+            :*%%%%#%%%%%##%+=========+++=======#%###%%%%-     %%.  -#%*####%#   :%=
*#                  %%    *##%%%%%#****************+**%%%%##%%%#%%#:                *##  :%%#%:                               :%%%+              :%%#%##%##%%%%********************#%%%%##%%-     :%+   =#    =%    ##
*#  .#%%%%%%%%%%%   %%    .##%%###*                   ##%%#%%%%%#%#                +%*%%#%*  =%%.                           =%#+ -##=       .=###%%####%%%##%%%%-                  .%%%%%##*       -#*   #*   #-  :%#
*#                  %%      .=++=                    =##%%#%##%%#*                =#= *%%.     *%*                        *%%-     :##= -*%%#*-.*%+#%%#%%%%##* =%#.                  .=++-           #%: :#. =%  *%+
*#   +++++++++++=   ##                              *%= .+##%%%##=               +#**%#=%+       *#+                   -%%*.       :+##%#:    *%*   .=#%%#*=     ##=                             +%.  #%: #: %+ +#:  *#:
*%   ::::::::::::  .%#                            -%#           :##:            *%%%#.  *%+       .#%=               *##-     -*%%%*-. =##: =%#.                  =##                           .=     ##+%*+#**%*     -
*#                  %%                           #%=              *%*  +##%%#*:*%%%-     *%:        -##:=#%%%##=  =%%*   :*#%%#=         *%%%:                      #%=                                .========-
*#                  %%                         :%%                 .#%%%######%%%=        ##.         *%%%###%%%%##::#%%%%=             :%###=                       +%#                               *%%##%%%%%
:*###%%%%######%%%###:                        *#+                   #%%%%%##%%%%%:         #%.       -%%#%%%#%%%%%##*=                 %%=  =%#                       .##:                             .====+===-
                                            :%#.                   :#%#%%%%%%%#%%#*********#%#*******####%%%%###%%%                  *%*     .#%-                       +#*                             =*%%%%%*-
                                           *%*                      ######%%%#%#%+-----:::::=##----::*#%%%#%%%#%#%%%#+-:           =#*:        =#*                       :##:                             +%%#-
                                          #%-                       *%#%%%%%#%%%%            =%+      #%%%###%%%##. :-*%####+-   :#%-           :%%:                       *%+
                                        =#*              =*###*=  *%#:#%%%####%+##-           *%=      =###%%##%*          :=#%%%%#*=             *#+=*###*-                -#*
                                      .%%=             *#%%%%%#%%%#.     -==:    =%%.          *#:        .-=.                +%% .=#%%%##*:       ######%%%%*                ##-                          =%
  :::......:::.                      =%%.             ######%%#%%%#                *##.         #%                           ##=         :*#%%%#*=%##%%%%%##%#*                *%*                         =#
*%***********###=                   *%+              .%%%%%##%%#%#%=                 *%#.        ##                        +%*                  -*###%%#%%#####.                :%#.            :*.       ..:         =+
*#           ##=%%:               :##:               :%%#%%%%##%#%%-                   #%*       :#*                     .#%-                    -%%%%##%%%%%%%=.                 *#=            :#.  .*%%#**#%%%+   **
*#           ##. =%#-            *%*           .-+##%#*####%%%%%#####+:                  *#*      =%+                   *#*                     .+%%%%#%##%%%%+*%%%#+-             =%*              :##=        :*%*
*#           ##****%%*        -=#%=        =*%%%#=     -%%###%%%%=  .*###+.               .##=     *%=                :#%-                   :*%%#:*%%###%#%#:      -#%%%#*:        :%#=:          *%*         -.  *%:
*#            ::::::##.    *#%%%%%*  .+#####-             =*#*=         .*##%+              -##=    *#:              +%#                 .####=       =#%*-              :*%####=   *###%%%:      =#=         *%#+  #%.
*%                  %%.   +%%#%%%%%%%#*:                                    :*%%%=            =%%:   ##:           .%%=               *%%#+                                    -*#%%%%%%%#%%:     ##           .    :#+
*#   #%##%%%%%%%%:  ##    *%%#####%#                                            -*###=          +%#. .##.         :%#.           .=#%#*.                                          .%%%%#%%##=###: %#    :. :=   .   .#* =%%+
*#    .  ..         ##    .%%%%%###                                                 :+###=.       *#*..#*        *#*         .=###+:                                               :%%###%%*      #%.  -%%%#+%%%*   =#-
*#   -===========   ##      -*%%*:                                                      :*%%#=      *#*=%%%%%%%*#%:       =*%%*:                                                     =*##+:       .%#   -#    *#   :%#
*#   =++++++++++=   %%                                                                      :*##*=   .#%%%#%%###%#    -*#%#-                                                                       .##:  *#  .%-  =%*
*#                  %%                                                                          :####*%%%#%%#####%**%##=                                                                             *%=  #. +#  %%-
*#  :%%%%%%###%%%:  %%                                                                              -%#%%#%%%%%%%%%=                                                                             ##.  *%- #- #= *%:  =%=
*#                  ##.                                                                              *%%###%%%%%%%*                                                                                    #######%%%*
*#                  ##                                                                               .#########%%%.                                                                                     ::::::..
+%##################%#                                                                                 =#%%####%=                                                                                      -**####***
  ...      .:::...                                                                                        ::::                                                                                         -########*
                                                                                                                                                                                                         =%%#%#:
                                                                                                                                                                                                           +#=`;

(function () {
  var pre = document.getElementById('hero-ascii');
  if (!pre) return;
  pre.textContent = HERO_ASCII;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var alt = { '#':'%', '%':'#', '*':'+', '+':'*', '=':'-', '-':'=', ':':'.', '.':':' };
  var base = pre.textContent;
  var arr = base.split('');
  var pool = [];
  for (var i = 0; i < base.length; i++) { if (alt[base[i]]) pool.push(i); }
  if (!pool.length) return;
  var active = [];
  var count = Math.max(1, Math.round(pool.length * 0.1));
  function tick() {
    if (document.hidden) return;
    for (var k = 0; k < active.length; k++) { arr[active[k]] = base[active[k]]; }
    active.length = 0;
    for (var j = 0; j < count; j++) {
      var p = pool[(Math.random() * pool.length) | 0];
      arr[p] = alt[base[p]];
      active.push(p);
    }
    pre.textContent = arr.join('');
  }
  setInterval(tick, 130);
})();
