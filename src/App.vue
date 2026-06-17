<template>
  <div class="App-wrap" ref="main">
    <div v-if="isLoading" class="loading-container">
      <div class="loading">
        <FadeLoader />
      </div>
    </div>
    <SideBar />
    <div class="sec-wrap">
      <MainHeader @searchUtil="searchUtil" />
      <router-view
        :utilSearchText="utilSearchText"
        @loadingHandler="loadingHandler"
      />
      <Footer />
    </div>
  </div>
</template>
<script lang="ts">
import MainHeader from "@/components/layout/MainHeader.vue";
import SideBar from "@/components/layout/SideBar.vue";
import Footer from "@/components/layout/Footer.vue";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";
export default {
  components: {
    MainHeader,
    Footer,
    SideBar,
    FadeLoader,
  },
  mixins: [],
  props: {},
  data() {
    return {
      utilSearchText: "",
      isLoading: false,
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {
    searchUtil(text: string) {
      this.utilSearchText = text;
    },
    loadingHandler(state: boolean) {
      this.isLoading = state;
    },
  },
};
</script>
<style lang="scss" scoped></style>
<style lang="scss">
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css");

:root {
  --bg-primary: #050b08;
  --bg-secondary: #0a1410;
  --bg-panel: rgba(10, 26, 20, 0.45);
  --border-color: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(16, 185, 129, 0.4);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent-primary: #10b981;
  --accent-secondary: #059669;
  --accent-success: #10b981;
  --accent-error: #ef4444;
  --accent-success-bg: rgba(16, 185, 129, 0.15);
  --accent-error-bg: rgba(239, 68, 68, 0.15);
  --accent-success-border: rgba(16, 185, 129, 0.4);
  --accent-error-border: rgba(239, 68, 68, 0.4);
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  margin: 0 auto;
  padding: 0;
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
*, *::before, *::after {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: var(--text-primary);
}
li {
  list-style: none;
}
p {
  margin: 0 auto;
  padding: 0;
}
input[type="text"], input[type="number"], textarea, select {
  outline: none;
  border: 1px solid var(--border-color);
  background: rgba(10, 20, 16, 0.6);
  color: var(--text-primary);
  border-radius: 8px;
  font-family: inherit;
  transition: all 0.2s ease;
  &:focus {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
  }
}
.hiddenScroll {
  overflow: hidden !important;
}
.flexRow {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flexColumn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.normal-desc {
  display: block;
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
}
.main-tit {
  color: var(--text-primary);
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 20px;
  display: inline-block;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.sub-tit {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  display: inline-block;
}
.shadowBox {
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.blue-btn {
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent-secondary) 0%, #047857 100%);
  color: #fff;
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.2px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
    background: linear-gradient(135deg, #047857 0%, #065f46 100%);
  }
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--border-color);
    box-shadow: none;
    color: var(--text-secondary);
  }
}
.tryAngle {
  font-size: 13px;
  margin-left: 7px;
  transition: 0.3s;
  display: inline-block;
  vertical-align: 2px;
}
.revert {
  transform: scaleY(-1) !important;
}
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(9, 13, 22, 0.7);
  backdrop-filter: blur(8px);
  width: 100%;
  height: 100%;
  z-index: 9999999;
}
.loading {
  z-index: 10000000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.v-fade {
  background-color: var(--accent-primary) !important;
}
.relative {
  position: relative;
}
.page-wrap {
  height: 100%;
  width: 100%;
  padding: 30px 40px;
  text-align: left;
  display: flex;
  flex-direction: column;
  min-height: max-content;
  overflow-y: auto;
  background: var(--bg-primary);
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    &:hover {
      background: var(--accent-primary);
    }
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}
.page-tit-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.blueScrollBar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.blueScrollBar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  &:hover {
    background: var(--accent-primary);
  }
}
.blueScrollBar::-webkit-scrollbar-track {
  background: transparent;
}
.page-wrap-inner {
  width: 100%;
  height: 100%;
}
.App-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background: var(--bg-primary);
}
.sec-wrap {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: max-content;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
}
.overHidden {
  overflow: hidden;
}
@media (max-width: 1300px) {}
@media (max-width: 1200px) {}
@media (max-width: 900px) {}
@media (max-width: 470px) {
  .page-wrap {
    padding: 20px;
  }
}
</style>
