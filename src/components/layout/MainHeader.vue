<template>
  <div class="header-wrap">
    <router-link to="/utils">
      <div class="header-title">
        <img src="../../assets/domi_logo_color.svg" />
        <div>{{ headerTitle }}</div>
      </div>
    </router-link>
    <div class="search-bar" v-if="isHome">
      <input
        type="text"
        @input="onChangeSearch"
        placeholder="원하는 Util을 검색하세요."
      />
      <img src="../../assets/ic_search.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import Burger from "@/components/layout/Burger.vue";
export default {
  components: {
    Burger,
  },
  mixins: [],
  props: {
    dummydata: Boolean,
  },
  data() {
    return {
      headerTitle: "Utils for Developer",
      isHome: true,
    };
  },
  computed: {},
  presets: {},
  watch: {
    $route(to, from) {
      if (to.name === "home") {
        this.headerTitle = "Utils for Developer";
        this.isHome = true;
        return;
      }

      if (to.path !== from.path) {
        this.headerTitle = to.name;
        if (to.name === "home") {
          this.isHome = true;
        } else {
          this.isHome = false;
        }
        return;
      }
    },
  },
  mounted() {},
  methods: {
    onChangeSearch(event: any) {
      this.$emit("searchUtil", event.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.header-wrap {
  width: 100%;
  z-index: 997;
  padding: 16px 30px;
  display: flex;
  align-items: center;
  background: rgba(9, 13, 22, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: var(--text-primary);
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  .header-title {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--text-primary);
    img {
      width: 32px;
      margin-right: 12px;
      filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.3));
    }
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.3px;
  }
  .search-bar {
    position: relative;
    width: 280px;
    input[type="text"] {
      width: 100%;
      height: 36px;
      border-radius: 20px;
      outline: none;
      border: 1px solid var(--border-color);
      background: rgba(15, 23, 42, 0.5);
      color: var(--text-primary);
      padding: 0 40px 0 16px;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.25s ease;
      &::placeholder {
        color: var(--text-secondary);
      }
      &:focus {
        border-color: var(--accent-primary);
        box-shadow: 0 0 12px rgba(56, 189, 248, 0.15);
        background: rgba(15, 23, 42, 0.7);
      }
    }
    img {
      position: absolute;
      width: 16px;
      height: 16px;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      opacity: 0.5;
      transition: opacity 0.2s ease;
    }
    &:focus-within img {
      opacity: 0.9;
    }
  }
}
@media (max-width: 540px) {
  .header-title {
    div {
      display: none !important;
    }
  }
}
</style>
