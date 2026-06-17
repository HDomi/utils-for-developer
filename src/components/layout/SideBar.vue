<template>
  <div class="sidebar-wrap" :class="{ active: panelState }">
    <router-link to="/utils">
      <img class="side-main-icon" src="../../assets/domi_logo_color.svg" />
    </router-link>
    <div class="side-item-wrap">
      <router-link
        v-for="(item, idx) in utilList"
        :key="`item-${idx}`"
        :to="item.route"
      >
        <div class="item-title">
          <div class="icon-wrap">
            <img :src="getIcon(item.name)" class="side-icon" />
          </div>
          <div>{{ item.name }}</div>
        </div>
      </router-link>
      <router-link to="/about" style="margin-top: 20px">
        <div class="item-title">About</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { UtilList, GetIcon } from "@/utils/UtilList";
export default {
  components: {},
  mixins: [],
  props: {
    panelState: Boolean,
  },
  data() {
    return {
      utilList: UtilList,
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {
    getIcon(name: string) {
      return GetIcon(name);
    },
  },
};
</script>

<style scoped lang="scss">
.wait {
  font-size: 12px;
}
.active {
  transition: 0.3s;
  right: 0 !important;
}
.sidebar-wrap {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 280px;
  min-width: 280px;
  height: 100%;
  background: #0b111e;
  border-right: 1px solid var(--border-color);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 999;
  overflow-y: auto;
  align-items: center;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  img.side-main-icon {
    width: 130px;
    margin: 30px 0 40px 0;
    filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.3));
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
  .side-item-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 0 12px;
    a {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      border-radius: 10px;
      transition: all 0.2s ease;
      color: var(--text-secondary);
      border: 1px solid transparent;
      &:hover {
        background: rgba(255, 255, 255, 0.03);
        color: var(--text-primary);
        transform: translateX(4px);
      }
      &.router-link-active {
        background: rgba(99, 102, 241, 0.12);
        color: var(--text-primary);
        border: 1px solid rgba(99, 102, 241, 0.2);
        .icon-wrap {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
          img.side-icon {
            filter: drop-shadow(0 0 6px var(--accent-primary));
          }
        }
      }
      .item-title {
        width: 100%;
        font-size: 15px;
        font-weight: 600;
        height: 46px;
        line-height: 46px;
        text-align: left;
        display: flex;
        align-items: center;
        .icon-wrap {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          transition: all 0.2s ease;
          img.side-icon {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
}
@media (max-width: 970px) {
  .sidebar-wrap {
    display: none;
  }
}
</style>
