import Vue from 'vue'

const scrollHandlers = new WeakMap()

Vue.directive('scroll', {
    inserted: function (el, binding, vnode, oldVnode) {
        let w = el.offsetHeight,
            isLoading = false,
            cb_name = binding.expression,
            cb = vnode.context[cb_name]
        const handler = async () => {
            if (w + el.scrollTop + 10 >= el.firstChild.clientHeight && !isLoading) {
                isLoading = true
                try {
                    cb && await cb()
                }catch(e) {
                    console.error(e)
                }
                isLoading = false
            }
        }
        scrollHandlers.set(el, handler)
        el.addEventListener('scroll', handler)
    },
    unbind: function (el) {
        const handler = scrollHandlers.get(el)
        if (!handler) return
        el.removeEventListener('scroll', handler)
        scrollHandlers.delete(el)
    }
})