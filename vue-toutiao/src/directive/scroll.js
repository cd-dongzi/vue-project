import Vue from 'vue'


Vue.directive('scroll', {
    inserted: function (el, binding, vnode, oldVnode) {
        let w = el.offsetHeight,
            isLoading = false,
            cb_name = binding.expression,
            cb = vnode.context[cb_name]
        el.addEventListener('scroll', async () => {
            if (w + el.scrollTop + 10 >= el.firstChild.clientHeight && !isLoading) {
                isLoading = true
                try {
                    cb && await cb()
                }catch(e) {
                    console.error(e)
                }
                isLoading = false
            }
        })
    }
})