<template>
  <div class="page-wrap overHidden">
    <p class="main-tit">About</p>
    <div class="about-box shadowBox">
      <p class="sub-tit">출처링크</p>

      <a
        href="https://kr.freepik.com/free-vector/round-background-with-person-filling-out-a-form_1078424.htm#query=%EC%8B%9C%ED%97%98&position=40&from_view=search&track=sph"
        >Freepik</a
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  min-height: min-content !important;
  .about-box {
    width: 100%;
    background: var(--bg-panel);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    a {
      color: var(--accent-primary);
      font-weight: 600;
      transition: all 0.2s ease;
      &:hover {
        text-decoration: underline;
        color: var(--accent-secondary);
      }
    }
  }
}
</style>
