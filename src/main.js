import { createApp } from 'vue'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import App from './App.vue'
import router from './router'
import store from './store'
import components from "@/components/UI";
import directives from "@/directives";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component);
})

directives.forEach(directive => {
    app.directive(directive.name, directive);
})

app
    .use(store)
    .use(router)
    .use(BootstrapIconsPlugin)
    .use(ElementPlus)
    .mount('#app')
