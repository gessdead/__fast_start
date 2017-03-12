# __fast_start 2.0.2
you need these before installation: 
- node.js
- gulp
- npm && bower (global)

to install: 
- clone this repo 
- use npm i && bower i

to work: 
- 'gulp watch' or 'gulp build'
- 'gulp watch --dev' open path '/html/index.html'

to use svg sprite: 
- put name.svg to '/src/svg'
- write '+svg("name")' in template(pug) 
- if you want to modify svg icon, write '+svg("name" , "modify")'
- for example: '+svg('camera', '_color_red')'

i use bower for js libs && requirejs

# changelog: 
+ add pug;
+ change structure;
+ add yargs
+ add normalize
+ add svg-sprite
+ add requirejs
