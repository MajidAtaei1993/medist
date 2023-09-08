import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head

    head: {
        titleTemplate: 'مدیست',
        title: 'Pezeshk',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/style.css',
        '@/assets/css/user.css',
        '@/assets/css/admin.css',
        '@/assets/css/public.css',
        '@/assets/css/responsive.css',
        '@/assets/css/doctor.css',
        '@/assets/font/font.css',
        'video.js/dist/video-js.css',
        'vue-slick-carousel/dist/vue-slick-carousel.css',
        'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: ['vuetify/lib', "tiptap-vuetify"]
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/TiptapVuetify', mode: 'client' },
        { src: '~/plugins/video-player.js', ssr: 'false' },
        { src: '~/plugins/vue-slick-carousel.client.js', ssr: false },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        rtl: true,
        customVariables: ['~/assets/variables.scss'],
        treeShake: true,
        options: {
            customProperties: true,
            rtl: true
        },
        theme: {
            light: true,
            themes: {
                light: {
                    primary: "#835ADE",
                    secondary: "#10BE79",
                    accent: "#f6f6f6",
                    accent1: "#e2e2e2",
                    icon: "#818181",
                    hover: "#d51414",
                    info: "#949797",
                    warning: "#ffc107",
                    error: "#ff7272",
                    success: "#00e676",
                    azerColor: "#ff4040"
                },
            },
        },
    },


}