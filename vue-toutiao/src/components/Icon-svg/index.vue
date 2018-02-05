<template>
<svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
</svg>
</template>

<script>
    export default {
        name: "icon-svg",
        props: {
            name: {
                type: String,
                required: true
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.name}`;
            }
        }
    };
</script>
