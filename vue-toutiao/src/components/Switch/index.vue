<template>
    <div class="switch-wrapper">
        <label><input class="mui-switch mui-switch-anim" type="checkbox" ref="obj" @click="toggle"></label>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                val: this.value
            }
        },
        mounted () {
            this.$refs.obj.checked = this.val
        },
        methods: {
            toggle () {
                this.$emit('input', this.$refs.obj.checked)
            }
        },
        computed: {
            switchSize () {

            }
        }
    }
</script>
<style lang="less" scoped>

.borderRadius(@radius: 0.2rem) {
  border-radius: @radius;
  border-top-left-radius: @radius;
  border-top-right-radius: @radius;
  border-bottom-left-radius: @radius;
  border-bottom-right-radius: @radius;
}
 
@duration: .4s;
@checkedColor: #64bd63;
.mui-switch {
  width: 0.52rem;
  height: 0.31rem;
  position: relative;
  border: 1px solid #dfdfdf;
  background-color: #fdfdfd;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  .borderRadius();
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
  &:before {
    content: '';
    width: 0.29rem;
    height: 0.29rem;
    position: absolute;
    top: 0;
    left: 0;
    .borderRadius();
    background-color: #fff;
    box-shadow: 0 0.01rem 0.03rem rgba(0, 0, 0, 0.4);
  }
  &:checked {
    border-color: @checkedColor;
    box-shadow: @checkedColor 0 0 0 0.16rem inset;
    background-color: @checkedColor;
    &:before {
      left: 0.21rem;
    }
  }
  &.mui-switch-animbg {
    transition: background-color ease @duration;
    &:before {
      transition: left 0.3s;
    }
    &:checked {
      box-shadow: #dfdfdf 0 0 0 0 inset;
      background-color: @checkedColor;
      transition: border-color @duration, background-color ease @duration;
      &:before {
        transition: left 0.3s;
      }
    }
 
  }
  &.mui-switch-anim {
    transition: border cubic-bezier(0, 0, 0, 1) @duration, box-shadow cubic-bezier(0, 0, 0, 1) @duration;
    &:before {
      transition: left 0.3s;
    }
    &:checked {
      box-shadow: @checkedColor 0 0 0 16px inset;
      background-color: @checkedColor;
      transition: border ease @duration, box-shadow ease @duration, background-color ease @duration*3;
      &:before {
        transition: left 0.3s;
      }
    }
 
  }
}

// .borderRadius(@radius: 0.2rem) {
//   border-radius: @radius;
//   border-top-left-radius: @radius;
//   border-top-right-radius: @radius;
//   border-bottom-left-radius: @radius;
//   border-bottom-right-radius: @radius;
// }
 
// @duration: .4s;
// @checkedColor: #64bd63;
// .mui-switch {
//   width: 0.52rem;
//   height: 0.31rem;
//   position: relative;
//   border: 1px solid #dfdfdf;
//   background-color: #fdfdfd;
//   box-shadow: #dfdfdf 0 0 0 0 inset;
//   .borderRadius();
//   background-clip: content-box;
//   display: inline-block;
//   -webkit-appearance: none;
//   user-select: none;
//   outline: none;
//   &:before {
//     content: '';
//     width: 0.29rem;
//     height: 0.29rem;
//     position: absolute;
//     top: 0;
//     left: 0;
//     .borderRadius();
//     background-color: #fff;
//     box-shadow: 0 0.01rem 0.03rem rgba(0, 0, 0, 0.4);
//   }
//   &:checked {
//     border-color: @checkedColor;
//     box-shadow: @checkedColor 0 0 0 0.16rem inset;
//     background-color: @checkedColor;
//     &:before {
//       left: 0.21rem;
//     }
//   }
//   &.mui-switch-animbg {
//     transition: background-color ease @duration;
//     &:before {
//       transition: left 0.3s;
//     }
//     &:checked {
//       box-shadow: #dfdfdf 0 0 0 0 inset;
//       background-color: @checkedColor;
//       transition: border-color @duration, background-color ease @duration;
//       &:before {
//         transition: left 0.3s;
//       }
//     }
 
//   }
//   &.mui-switch-anim {
//     transition: border cubic-bezier(0, 0, 0, 1) @duration, box-shadow cubic-bezier(0, 0, 0, 1) @duration;
//     &:before {
//       transition: left 0.3s;
//     }
//     &:checked {
//       box-shadow: @checkedColor 0 0 0 16px inset;
//       background-color: @checkedColor;
//       transition: border ease @duration, box-shadow ease @duration, background-color ease @duration*3;
//       &:before {
//         transition: left 0.3s;
//       }
//     }
 
//   }
// }

</style>