<template>
  <div @click="lockScreen" class="lock-screen-btn-con">
    <Tooltip content="锁屏" placement="bottom">
      <Icon type="locked" :size="20"></Icon>
    </Tooltip>
  </div>
</template>

<script>
const setLockBackSize = () => {
    let x = document.body.clientWidth;
    let y = document.body.clientHeight;
    let r = Math.sqrt(x * x + y * y);
    return parseInt(r);
};
export default {
    name: 'lockScreen',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    }
};
</script>