# Changelog

## [1.0.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.10.0...space-for-you-v1.0.0) (2026-10-26)


### Features

* **audio:** implement 60s voice note recorder and cassette keepsake ([629d0ff](https://github.com/yohanvillarp/space-for-you/commit/629d0ff7a8af577eb080ec850375f20b82ae8abe))
* **audio:** upload recorded voice notes to space-assets bucket ([9ba64d9](https://github.com/yohanvillarp/space-for-you/commit/9ba64d9ac7b7e2a9986157e7a31cdf91dc9e7e2f))
* **auth:** require authentication for space creation and studio editing ([62f62fd](https://github.com/yohanvillarp/space-for-you/commit/62f62fdd4eabbf7e05a4561eebf1d57fee183bb8))
* **canvas:** add scale for laptops and mobile landscape ([a47c6e7](https://github.com/yohanvillarp/space-for-you/commit/a47c6e7c50717b3aaac236d0c4febb263baceb6c))
* **copy:** align editorial voice to dedicated spaces ([fa0fcc8](https://github.com/yohanvillarp/space-for-you/commit/fa0fcc8d7b3e1347440e52744365fa4dd4358708))
* **dashboard:** implement space lifecycle management and sync engine ([721c730](https://github.com/yohanvillarp/space-for-you/commit/721c73024f63c139a7c6a5f571f4c48355aff57e))
* **editor:** implement 25-step bounded undo and redo control ([575fdb5](https://github.com/yohanvillarp/space-for-you/commit/575fdb5eaccd3956bfedea39c5617cece5be0277))
* **editor:** implement sanctuary cloud publishing and preflight flow ([112a2c8](https://github.com/yohanvillarp/space-for-you/commit/112a2c8f13ee498cf084eaaf9a97920e9a1e8946))
* **editor:** implement sanctuary cloud publishing and preflight flow ([6fefd02](https://github.com/yohanvillarp/space-for-you/commit/6fefd026ba0fdfcfe1d46a5b0845e8f84db6be61))
* **hub:** add scheduled date unlock and teaser countdown for scenes ([97888a3](https://github.com/yohanvillarp/space-for-you/commit/97888a3bd6d012f8c8cff0af71e6015d4d89999a))
* **hub:** apply template universe surface and accent styles ([02a4edc](https://github.com/yohanvillarp/space-for-you/commit/02a4edc13e2623153a5084f89d7a3d1183d1bb46))
* **hub:** redesign scene cards with unique layouts and themes ([24a0722](https://github.com/yohanvillarp/space-for-you/commit/24a0722554af6b7a07742666dd32a600aad28c5d))
* **hub:** scheduled scene unlock, hub redesign and canvas history ([106e0bc](https://github.com/yohanvillarp/space-for-you/commit/106e0bc492cdb7d9a9df11c59fbd435f674227eb))
* **hub:** tailor card copy and hide item counts in public view ([8481e45](https://github.com/yohanvillarp/space-for-you/commit/8481e45d7ef44747c172883236dd0eb77ba85cf5))
* **lock:** add backdrop selector defaulting to first theme in editor ([7151eeb](https://github.com/yohanvillarp/space-for-you/commit/7151eebc7c7c3d7951c25dd3ae5a733505cbc79d))
* **lock:** make lock gate responsive and remove arbitrary vault drag ([26316b1](https://github.com/yohanvillarp/space-for-you/commit/26316b1b2f6918d5f03784ac7fcdf5f1c6345f46))
* **publish:** add content fingerprinting and 10 daily updates limit ([094c81d](https://github.com/yohanvillarp/space-for-you/commit/094c81d11029a1043b5c0f1fbf5b9fb86b83e6ac))
* **security:** harden lock gate and quotas with cloud functions ([b5b3641](https://github.com/yohanvillarp/space-for-you/commit/b5b36412926b2ebec565a38a19c9efa5f67612ce))
* **security:** link cloud function ids to environment config ([cbf88cd](https://github.com/yohanvillarp/space-for-you/commit/cbf88cdf4d7ec1a61cd9dd9a72421184f3040615))
* **share:** implement foldable keepsake card and 1-click sharing ([4f59bd8](https://github.com/yohanvillarp/space-for-you/commit/4f59bd801b4736b376ca7a8c86f2e317aa3a9e00))
* **share:** improve draft flow and unpublished updates alert ([52449f0](https://github.com/yohanvillarp/space-for-you/commit/52449f08a2ec72592403a8ecac33098fc5b46970))
* **storage:** add delete file cleanup on item deletion ([7edb57b](https://github.com/yohanvillarp/space-for-you/commit/7edb57b4f88c5bd1c98598f55c6e6f574b4361bf))
* **storage:** link space-assets bucket and sample voice note ([cc5f7dc](https://github.com/yohanvillarp/space-for-you/commit/cc5f7dc8ac42138349883f9a592e7d22f2140c18))
* **theme:** add friendship radio, fix cork contrast and sidebar ([57d1ec6](https://github.com/yohanvillarp/space-for-you/commit/57d1ec6884db20b98777b7cda189244a3e9c8fea))
* **themes:** apply template universe surfaces across all scenes ([93b46c8](https://github.com/yohanvillarp/space-for-you/commit/93b46c8937c9cb4531a8e72f0742ca05150a867a))
* **viewer:** add one-time welcome context screen before space hub ([bbb07e9](https://github.com/yohanvillarp/space-for-you/commit/bbb07e92971e18cf5a75ddd51f016bcadf179250))
* **viewer:** add theme unboxing ceremonies and bloom transitions ([f048dda](https://github.com/yohanvillarp/space-for-you/commit/f048dda5147c2002c0f6d68104117b1600bae8ed))
* **viewer:** filter empty scenes in public sanctuary viewer ([fd03e13](https://github.com/yohanvillarp/space-for-you/commit/fd03e131632fc9fcc9f31828db0653c9ada8a57a))
* **viewer:** present space hub scene as primary public view ([f2682f1](https://github.com/yohanvillarp/space-for-you/commit/f2682f15d01e11848a9af10d18ad741aa8f9c1af))


### Bug Fixes

* **audio:** decouple voice notes from ambient soundtrack limit ([802e7b4](https://github.com/yohanvillarp/space-for-you/commit/802e7b4003158d29c19c8f0e1549ce457be2f2d3))
* **dock:** resolve clipping and padding issues in scene selector dock ([fa59117](https://github.com/yohanvillarp/space-for-you/commit/fa591175ca83e8ca8821cde214bc7128a5a288f9))
* **editor:** open sidebar by default on desktop viewports ([cc59ca7](https://github.com/yohanvillarp/space-for-you/commit/cc59ca7bbcd7f33b413a50266ec954af83009fad))
* **editor:** restrict undo and redo exclusively to free canvas ([d01523a](https://github.com/yohanvillarp/space-for-you/commit/d01523afc8c3ccb360bbc5dff8c2116f69b1a726))
* **functions:** add index.js re-export entrypoint for appwrite runtime ([6b9e032](https://github.com/yohanvillarp/space-for-you/commit/6b9e03263ecb816b673a3b74995ce54bfb470bdb))
* **lock:** remove redundant floating backdrop selector from stage ([2cc731c](https://github.com/yohanvillarp/space-for-you/commit/2cc731cc3a93717d7492e855cc857801d487c497))
* **lock:** synchronize passcode length between editor and public viewer ([734a2e4](https://github.com/yohanvillarp/space-for-you/commit/734a2e4a8f235dfa4a859bd4353fe92c5065ef82))
* **navigation:** prevent duplicate space creation on browser back ([55b9c62](https://github.com/yohanvillarp/space-for-you/commit/55b9c622e52df0847502af45cf8bea31376c7ec0))
* **share:** unify canonical slug resolution and share hub status ([8b6a1b8](https://github.com/yohanvillarp/space-for-you/commit/8b6a1b8b912f388ef5de001dd4d90742549f6666))
* **stage:** restrict empty stage cue exclusively to editor mode ([96efa18](https://github.com/yohanvillarp/space-for-you/commit/96efa1846a01cf5e154e108dc2f3891d21b8c024))
* **status:** enforce draft lifecycle and protect unpublished spaces ([a99763d](https://github.com/yohanvillarp/space-for-you/commit/a99763dd6dde34e37b6e4498a6c71397f03754fb))
* **status:** enforce draft lifecycle and protect unpublished spaces ([ccb6d08](https://github.com/yohanvillarp/space-for-you/commit/ccb6d087cd088a866c6202d189fb4b8bdac99fb0))
* **sync:** implement differential scenes sync and keypad animations ([f43e3aa](https://github.com/yohanvillarp/space-for-you/commit/f43e3aa922e2b9d7ba1cee36dc6abf5fd8fec7ed))
* **toolbox:** make voice note cassette universal across all templates ([db961de](https://github.com/yohanvillarp/space-for-you/commit/db961de5bd1bbcfa51e0228947a98c078686bc81))
* **viewer:** hide scene dock on open letter and fix auto audio play ([9c64316](https://github.com/yohanvillarp/space-for-you/commit/9c6431688474fdc6ac09a1e3bb7c729fcfd0ad47))


### Miscellaneous Chores

* graduate to official v1.0.0 release ([58a1903](https://github.com/yohanvillarp/space-for-you/commit/58a19033a1bc7f3fdc7e3233c9bd1b323b11edf6))

## [0.10.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.9.0...space-for-you-v0.10.0) (2026-10-25)


### Features

* **share:** add short route /s/:slug and resilient url shortener ([cd1588f](https://github.com/yohanvillarp/space-for-you/commit/cd1588f901d8d9737579fba623937e090497b6f5))
* **viewer:** add ambient audio entry prompt and responsive dock ([20463d0](https://github.com/yohanvillarp/space-for-you/commit/20463d01b116b13735894bc05384fdcd0f861ca1))
* **viewer:** add local storage fallback and public read permissions ([7a0d43e](https://github.com/yohanvillarp/space-for-you/commit/7a0d43e6b2a1e375095f956cd2083ea32cece3b8))
* **viewer:** add read-only public viewer and resilient url shortener ([4e5b08f](https://github.com/yohanvillarp/space-for-you/commit/4e5b08f08dac13cf3e8818e5d9a1dc55fea5b130))
* **viewer:** implement read-only public sanctuary viewer and stage ([91abef2](https://github.com/yohanvillarp/space-for-you/commit/91abef2fd3507ce5cdabd61df3f9378164de76c3))

## [0.9.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.8.0...space-for-you-v0.9.0) (2026-10-25)


### Features

* **appwrite:** export databases client and configure environment ([014f1ea](https://github.com/yohanvillarp/space-for-you/commit/014f1ea79097fa24262858e273842582c7a2a919))
* **db:** add automated database provisioning script ([a5edb38](https://github.com/yohanvillarp/space-for-you/commit/a5edb385439d4fbf1aff2288bf22677b4052338f))
* **db:** integrate appwrite databases, provisioning script and public sanctuary resolution ([db0fa6e](https://github.com/yohanvillarp/space-for-you/commit/db0fa6e2fc063dfcfa0076c4a964f514aa704095))
* **docs:** setup typedoc and markdown documentation generator ([0855b24](https://github.com/yohanvillarp/space-for-you/commit/0855b24e7db473ef1fecf68fb629a4f292328225))
* enhance spatial studio, mobile canvas, space cards and fix oauth ([c188216](https://github.com/yohanvillarp/space-for-you/commit/c188216477aa5c70a1ae78fb278bde2a7cabf02a))
* **mobile:** add virtual canvas scaling and mobile overlay drawer ([7738ed0](https://github.com/yohanvillarp/space-for-you/commit/7738ed0199f31240d40e2dd909473641c49432cf))
* **security:** implement client-side zero-knowledge passcode protection ([aea892e](https://github.com/yohanvillarp/space-for-you/commit/aea892e4474cce1fc03fe259c7091a216db0c4d0))
* **share:** add dedicated keepsake scene with inline customizer ([c6cf96e](https://github.com/yohanvillarp/space-for-you/commit/c6cf96e43253e63300c566600934b88cd5db2913))
* **share:** route space card share button to studio share scene ([d1ef601](https://github.com/yohanvillarp/space-for-you/commit/d1ef6019fbfeba35da2dd34d6599611538fea696))
* **share:** wire public space page to query database by slug or id ([3b59ad8](https://github.com/yohanvillarp/space-for-you/commit/3b59ad855a119fe6cb34f9708a95cbd5d0c355e8))
* **spaces:** add appwrite database service and data access layer ([fcce52d](https://github.com/yohanvillarp/space-for-you/commit/fcce52dffd57361f2ef5e18653b4b06c29fce04a))
* **spaces:** add space card component with direct studio actions ([61b18ec](https://github.com/yohanvillarp/space-for-you/commit/61b18ecec83eb5c84353bb385840df1a66e28a7f))
* **spaces:** add tier limits, sanctuary protection, and share studio flow ([24fd29b](https://github.com/yohanvillarp/space-for-you/commit/24fd29beb8c266d81ee101ddb08fe0906e731e1f))
* **spaces:** enforce plan tier limits and isolate scene canvas stages ([69e7bde](https://github.com/yohanvillarp/space-for-you/commit/69e7bdece8febae53f6087578ae2cdbdb048ac8a))
* **studio:** add drag-and-drop reordering for letters and scenes ([d2565aa](https://github.com/yohanvillarp/space-for-you/commit/d2565aaab8e6d8b4773f7ee7f423c76b48e56b35))
* **studio:** connect studio save and user spaces with appwrite cloud ([5c434c6](https://github.com/yohanvillarp/space-for-you/commit/5c434c6b8325c1e7721e33d48736db079a647da5))


### Bug Fixes

* **auth:** fix oauth session race condition in callback ([87a42ef](https://github.com/yohanvillarp/space-for-you/commit/87a42ef7f0aa74282300a9953eccd3986f71ec37))
* **auth:** use oauth token to fix localhost session in firefox ([970b6aa](https://github.com/yohanvillarp/space-for-you/commit/970b6aad3a4c600671678fbeacae2cfef28f0613))
* **db:** avoid default on required attributes and await availability ([6ac43e5](https://github.com/yohanvillarp/space-for-you/commit/6ac43e5873aaeb772b7f2bba8208e4197971a20e))
* **spaces:** close card options menu on click outside and escape ([25b6f82](https://github.com/yohanvillarp/space-for-you/commit/25b6f82fc37f28c0aebe8a9aca34d3ab1f6f9f17))
* **spaces:** elevate options menu stacking context and modularize menu ([0058c0c](https://github.com/yohanvillarp/space-for-you/commit/0058c0c2c28550da39b52569f1ed872d1411fec8))

## [0.8.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.7.0...space-for-you-v0.8.0) (2026-10-24)


### Features

* **editor:** persist active scene and drafts across page reloads ([222548c](https://github.com/yohanvillarp/space-for-you/commit/222548cf8caf0ccbc24a29283f4a4033f18f6f99))
* **editor:** persist active scene and drafts across page reloads ([fac925e](https://github.com/yohanvillarp/space-for-you/commit/fac925e42b3cbaa66aca53659837ab6ba6b1d60e))
* **letters:** expand typography studio and remove presets ([f8e649b](https://github.com/yohanvillarp/space-for-you/commit/f8e649bee758e2a88e8d4dbd31ed0e2e93db0928))
* **letters:** expand typography studio and remove presets ([a7735ea](https://github.com/yohanvillarp/space-for-you/commit/a7735ea2b7a4466feeaf75cf41e01aa5798ce818))
* **letters:** open envelope when pressing an already selected letter ([b594dd4](https://github.com/yohanvillarp/space-for-you/commit/b594dd4ac295d6644a7e502ac10489e7bd28c8ec))
* **letters:** open envelope when pressing an already selected letter ([967699f](https://github.com/yohanvillarp/space-for-you/commit/967699fe60175ba3276292aab0b1726ee1dd8d9b))
* **letters:** separate proportion and alignment into spacious rows ([7f90c2e](https://github.com/yohanvillarp/space-for-you/commit/7f90c2ec862686e6f578a7f2eef62e952c8daccf))
* **letters:** separate proportion and alignment into spacious rows ([3a769c8](https://github.com/yohanvillarp/space-for-you/commit/3a769c8cf58d045475ef1038875250728547a330))
* **router:** unify spatial studio route to /spaces/studio ([86aadf2](https://github.com/yohanvillarp/space-for-you/commit/86aadf2420c740afd7a9e89ddc2e21e5e1f3bc49))
* **router:** unify spatial studio route to /spaces/studio ([afd07b4](https://github.com/yohanvillarp/space-for-you/commit/afd07b463f6eaf1d8abff6a506ab6ae9884a582a))
* **ui:** add Swal2-style animated alert modal and wire to reset ([faf9136](https://github.com/yohanvillarp/space-for-you/commit/faf9136907d374281759fcdc95ccb1821a71e38a))
* **ui:** add Swal2-style animated alert modal and wire to reset ([02e6ad4](https://github.com/yohanvillarp/space-for-you/commit/02e6ad4cdcc78586d2454d37bdf43afc134c45da))


### Bug Fixes

* **ui:** improve responsive layout for header and scene grids ([6a05185](https://github.com/yohanvillarp/space-for-you/commit/6a05185085540b50778cb4dd9bff14af070e19f9))
* **ui:** improve responsive layout for header and scene grids ([43ef570](https://github.com/yohanvillarp/space-for-you/commit/43ef570dd8beb4a04243581a3f1271636d6b490e))

## [0.7.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.6.0...space-for-you-v0.7.0) (2026-10-24)


### Features

* **dock:** add bottom dock scene management and context menu ([c042746](https://github.com/yohanvillarp/space-for-you/commit/c042746f4734453dfde4ddac1fae64cf7ae7e516))
* **domain:** introduce space scene entity collection and models ([8470e6e](https://github.com/yohanvillarp/space-for-you/commit/8470e6eea122fc0e34a5d356b0329d9489074bb4))
* **editor:** decompose stage viewport and add multi-scene state ([9f53650](https://github.com/yohanvillarp/space-for-you/commit/9f5365054c98346b132128781f78119eecd2c017))
* **editor:** integrate studio behavior provider and scene viewport ([26cfd03](https://github.com/yohanvillarp/space-for-you/commit/26cfd03480a96acc6a1fde471023605355a25579))
* **hub:** add space hub scene, hero editor, and specimen sidebar ([eb6f20d](https://github.com/yohanvillarp/space-for-you/commit/eb6f20de932a0f94a4c1a7f723f78da47119eba7))
* **hub:** multi-scene architecture, space hub, and bottom dock ([7e721b3](https://github.com/yohanvillarp/space-for-you/commit/7e721b3dfe84bd5dbc94d6b046cc84798feb3533))
* **letters:** add letters desk, reader modal, and customization toolbox ([2cc9afb](https://github.com/yohanvillarp/space-for-you/commit/2cc9afb5177f48778be5314c72e41f106b1a82be))
* **letters:** studio behavior mode, letters workshop, and reading experience ([76ea18e](https://github.com/yohanvillarp/space-for-you/commit/76ea18e601036758b714bb4c5bd5bec06f7791c3))
* **shortcuts:** add universal Ctrl+K / Cmd+K search focus and platform detection ([144f05c](https://github.com/yohanvillarp/space-for-you/commit/144f05c5558acd57cb66da78ca177ce7701aca0b))
* **shortcuts:** add universal search shortcut and mac detection ([c84dbdc](https://github.com/yohanvillarp/space-for-you/commit/c84dbdc8c6ca7ef015feceaede78d06f8ef0be4c))
* **studio:** add global studio behavior mode and header switcher ([7ea381f](https://github.com/yohanvillarp/space-for-you/commit/7ea381f48671061267123a100712a875e9d900cd))

## [0.6.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.5.0...space-for-you-v0.6.0) (2026-10-24)


### Features

* **lock:** add 4 selectable entrance atmospheres ([8e01723](https://github.com/yohanvillarp/space-for-you/commit/8e017239f28ad368d80d5201b7c05053b9502905))
* **lock:** add 5 tactile keypad design objects including classic style ([19817e6](https://github.com/yohanvillarp/space-for-you/commit/19817e6d0e54038893cd969467c10f78b60e81e8))
* **lock:** add collapsible passcode section and clean sidebar header ([d5a0ea2](https://github.com/yohanvillarp/space-for-you/commit/d5a0ea292f9c393f943c556dbcb945b1d3d8367d))
* **lock:** add segmented category switcher and search in sidebar ([2e9fbd1](https://github.com/yohanvillarp/space-for-you/commit/2e9fbd1dbea4ac7b28ff3ef0b902585d5e22b4b3))
* **lock:** entrance lock gate scene and scene switcher ([f1cb73e](https://github.com/yohanvillarp/space-for-you/commit/f1cb73ec8a3c9a5aecf0a0d8a25f3288b76a1296))
* **lock:** integrate spatial vault objects and object-style grid ([464fb1c](https://github.com/yohanvillarp/space-for-you/commit/464fb1c2b62678c4eaf406018a9fde75f49c6158))
* **lock:** make gate scene generic and editable on canvas ([e116274](https://github.com/yohanvillarp/space-for-you/commit/e1162747bb5e5b106839dd948ea184577dab9627))
* **studio:** add fluid rotation handle with magnetic snap and angle badge ([9a16ce7](https://github.com/yohanvillarp/space-for-you/commit/9a16ce78855eba465e36db2b69aad654e2691f9a))
* **studio:** add fluid rotation handle with magnetic snap and badge ([cdc12ee](https://github.com/yohanvillarp/space-for-you/commit/cdc12eee38a1ff4837e5eddc1737d970a97e6115))


### Bug Fixes

* **lock:** ignore keyboard events while typing in form inputs ([b0d36d7](https://github.com/yohanvillarp/space-for-you/commit/b0d36d7dfb7170a714265c9f1a702338e2b89091))

## [0.5.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.4.0...space-for-you-v0.5.0) (2026-10-24)


### Features

* **audio:** add web audio synthesizer and spatial sound effects ([ede5846](https://github.com/yohanvillarp/space-for-you/commit/ede5846ecac0b2a74b9d845db9f40278d26ddcb5))
* **editor:** sequence duplicate and pasted items with letters A..Z ([c912911](https://github.com/yohanvillarp/space-for-you/commit/c91291194b4df719b74ff124e208f761de63a443))
* **pages:** add dedicated attributions route and page ([af0b0b8](https://github.com/yohanvillarp/space-for-you/commit/af0b0b8d5df0e8cf4a6f296d1efbaec40daddfda))
* **space-themes:** add animated music box and interactive sfx ([b4088ea](https://github.com/yohanvillarp/space-for-you/commit/b4088ead4353f64865bbe57561ee86a89ef82a6a))
* **spaces:** add birthday music box, interactive sfx, and modular studio sidebar ([d1e8203](https://github.com/yohanvillarp/space-for-you/commit/d1e8203ffd9e59be4972eb50cefb2102bd7bfbcc))
* **spaces:** add fullscreen spatial studio and atelier creative library ([0584e97](https://github.com/yohanvillarp/space-for-you/commit/0584e9736227d7f167b7940100803a2e0560cae3))
* **spaces:** add stage preview panel and fullscreen spatial editor ([a85cf64](https://github.com/yohanvillarp/space-for-you/commit/a85cf641655aafadd19a5c5f7d3b016137c6fee1))
* **spatial-stage:** add atelier library sidebar with svg search ([5d34f7b](https://github.com/yohanvillarp/space-for-you/commit/5d34f7be072a61f60b7bdfa7a6b44a098159ef6a))
* **spatial-stage:** add data models and default stage configurations ([0997370](https://github.com/yohanvillarp/space-for-you/commit/0997370d15562188682cd6b2f16db9261d1c4d97))
* **spatial-stage:** implement drag drop canvas and specimen renderer ([a69e2ab](https://github.com/yohanvillarp/space-for-you/commit/a69e2ab9387e0650e0b8039ec1d1a9aef7993acc))
* **studio:** add resizable sidebar and contextual music selector ([0a8820a](https://github.com/yohanvillarp/space-for-you/commit/0a8820a3989080238fde0f33c3ab4c50e41dba31))
* **studio:** add right-click context menu for objects and canvas ([2601442](https://github.com/yohanvillarp/space-for-you/commit/260144234a9f95cb2cc30ebf87d39c73e24d4179))
* **studio:** add sidebar photo workshop and 2-photo limit ([59eab96](https://github.com/yohanvillarp/space-for-you/commit/59eab9615a7bed23791a874ba2f0499c2a5b3458))
* **studio:** enhance spatial studio with photo workshop, attributions page, and UX refinements ([2c01d78](https://github.com/yohanvillarp/space-for-you/commit/2c01d78a51a541734efc3141b1cdedf3bca4a447))


### Bug Fixes

* **studio:** clear search query on category switch and object deselect ([d12551f](https://github.com/yohanvillarp/space-for-you/commit/d12551f0a84d6e97e42dc623d833b6aae8e99ad2))
* **studio:** coordinate single audio playback and fix track in-use match ([8ac7ea6](https://github.com/yohanvillarp/space-for-you/commit/8ac7ea66f16f9f7e19ace23077a26ded54f6ce32))
* **ui:** reset scroll on page change and remove procedural meta badges ([6b1b4a5](https://github.com/yohanvillarp/space-for-you/commit/6b1b4a51ced68208f2975816ddf593691af798f8))

## [0.4.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.3.0...space-for-you-v0.4.0) (2026-10-23)


### Features

* **create-space:** add qr code, keepsake card and studio layout ([3dcf968](https://github.com/yohanvillarp/space-for-you/commit/3dcf9687081ef2915b68be0dec186fb5e6b7249e))
* **shared:** add centered animated gift box keepsake loader ([30361aa](https://github.com/yohanvillarp/space-for-you/commit/30361aa59b07fe57dcd2ca56de8924fa34d69b68))
* **space-themes:** add tangible physical stages and theme registry ([65c1890](https://github.com/yohanvillarp/space-for-you/commit/65c1890b297661c37af48af5abe82d76869144ce))
* **spaces:** add standalone full-bleed stage preview route ([2412b40](https://github.com/yohanvillarp/space-for-you/commit/2412b40f2bcd9feaa9c17ae14e2299fa5438b90e))
* **spaces:** add tangible stage preview, qr keepsake card, and studio layout ([9c6dda2](https://github.com/yohanvillarp/space-for-you/commit/9c6dda212054f54b944fe303d0ffd2c8cb501727))

## [0.3.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.2.1...space-for-you-v0.3.0) (2026-10-23)


### Features

* **auth:** add email password auth and responsive editorial layout ([0767611](https://github.com/yohanvillarp/space-for-you/commit/0767611680259023f2cc66e747ec117c54db870c))
* enhance public header, email auth flow, and smart dashboard routing ([ebb7206](https://github.com/yohanvillarp/space-for-you/commit/ebb720656f3032feb65f010131bf44c0ff3dba54))
* **layout:** upgrade header with mobile drawer and isolate app views ([e5e0fc4](https://github.com/yohanvillarp/space-for-you/commit/e5e0fc46d752525a48e00f87446ce27110007bfd))
* **router:** register expansion pages and public navigation links ([d4c23a4](https://github.com/yohanvillarp/space-for-you/commit/d4c23a4f0b9a39a49ec7e10cad92200826b09360))
* **ui:** add input component modular animations and logo lockup ([c3f2a7c](https://github.com/yohanvillarp/space-for-you/commit/c3f2a7cb08c2dd1e474ed0584ed37d53e5543923))

## [0.2.1](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.2.0...space-for-you-v0.2.1) (2026-10-23)


### Bug Fixes

* **vercel:** remove cleanUrls to allow SPA rewrites to index.html ([8e3ec76](https://github.com/yohanvillarp/space-for-you/commit/8e3ec76f3d3ba049e7217e8fd9443eed4b3dc952))
* **vercel:** resolve 404 on SPA client-side routes ([fffa2af](https://github.com/yohanvillarp/space-for-you/commit/fffa2af9c3fc056153efd3a8951b230bc5297499))

## [0.2.0](https://github.com/yohanvillarp/space-for-you/compare/space-for-you-v0.1.0...space-for-you-v0.2.0) (2026-10-23)


### Features

* **api:** initialize appwrite client and oauth2 token flow ([e6cf436](https://github.com/yohanvillarp/space-for-you/commit/e6cf43634d316ce835ab5b97ea06661fc8751277))
* **assets:** add brand logomark, vector graphics, and open graph image ([8c11671](https://github.com/yohanvillarp/space-for-you/commit/8c11671bef5fe96b2b0761d748ea4a0eab2d2a1c))
* **auth:** implement google sign in button and route guards ([3353579](https://github.com/yohanvillarp/space-for-you/commit/3353579d8d332ba88e637b535b1f5ae6b74a2ee2))
* **auth:** integrate appwrite google oauth2 and user dashboard ([475d091](https://github.com/yohanvillarp/space-for-you/commit/475d0910cb771dcd338243aea689e025cb75c568))
* **layout:** implement navigation shell, root layout, and router ([6e11ca4](https://github.com/yohanvillarp/space-for-you/commit/6e11ca4e4397cb592a5c0671aacb0e6177d0314d))
* **pages:** add auth flows, dashboard page, and route navigation ([620d467](https://github.com/yohanvillarp/space-for-you/commit/620d467c0f3241f626a38413dbd2fce500151c53))
* **release:** configure google release please and changesets ([03fe0a6](https://github.com/yohanvillarp/space-for-you/commit/03fe0a6b9d934ef594e6050c6c9867a1ab8d0d6a))
* **ui:** implement design tokens, theme engine, and atomic components ([cbf435e](https://github.com/yohanvillarp/space-for-you/commit/cbf435ed85704f78492f51f93d979221be744ef5))
* **web:** build editorial landing page and configure metadata ([b5cdf6d](https://github.com/yohanvillarp/space-for-you/commit/b5cdf6d04ae84f71a20cc4473bb37969ecb15f49))
* **web:** initial setup, tooling, and editorial landing page ([63c5da4](https://github.com/yohanvillarp/space-for-you/commit/63c5da4519ba896e86f0e4c9a61bd763ebb48e28))


### Bug Fixes

* **ci:** bump node to 22 and sync package-lock versions for npm ci ([a1320cf](https://github.com/yohanvillarp/space-for-you/commit/a1320cfb63ba643ca4208b9268fa682b515a4205))
* **seo:** add raster favicons and webmanifest for firefox and vercel ([8286927](https://github.com/yohanvillarp/space-for-you/commit/8286927e230a4a02b91725ac810d528dec1274c7))
