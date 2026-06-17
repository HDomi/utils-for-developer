<template>
  <div class="footer-wrap">
    <div class="footer-title">Utils For Developer</div>
    <div class="footer-title">Copyrightⓒ2023.Domi.All rights reserved.</div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  mixins: [],
  props: {
    dummy: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  presets: {},
  watch: {
    $route(to: any, from: any) {},
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.footer-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 5px 30px;
  z-index: 997;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}
.footer-title {
  color: var(--text-secondary);
  font-size: 13px;
}
@media (max-width: 510px) {
  .footer-wrap {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 20px;
    height: auto;
    gap: 4px;
  }
  .footer-title {
    font-size: 12px;
    text-align: left;
  }
}
</style>
