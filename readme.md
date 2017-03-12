# __fast_start 2.0.1
you need these before installation: 
- node.js
- gulp

to install: 
- clone this repo 
- use npm i 

to work: 
- 'gulp watch' or 'gulp build'
- 'gulp watch --dev' open path '/html/index.html'

to use svg sprite: 
- put name.svg to '/src/svg'
- write '+svg("name")' in template(pug) 
- if you want to modify svg icon, write '+svg("name" , "modify")'
- for example: '+svg('camera', '_color_red')'

to use svg-sprite

# changelog: 
+ add pug;
+ change structure;
+ add yargs
+ add normalize
+ add svg-sprite
