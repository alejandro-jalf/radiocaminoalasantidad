var app = new Vue({
    el: '#app',
    data() {
        return {
            range: 100,
            volumeActual: 1,
            isLoadSource: false,
            loadedPage: false,
        }
    },
    mounted() {
        this.loadedPage = true;
    },
    computed: {

    },
    methods: {
        loadedFrame() {
            const iframe = this.$refs.dataRef;
            const iframe2 = document.querySelector('#idIframe');
            console.log(iframe);
            iframe2.contentWindow.postMessage('data', '*');
            const frameC = $('#frameID').contents();
            console.log(frameC);
        },
    },
});
