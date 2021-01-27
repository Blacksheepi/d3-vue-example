<template>
  <div class="home">
    <router-link to="/rose">南丁格尔玫瑰图</router-link>
    <router-link to="/selected-pie">选中状态的饼图</router-link>
    <router-link to="/tidy-tree">tidy tree</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
};
</script>
