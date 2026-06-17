<template>
  <div class="page-wrap">
    <div v-if="searchUtilList.length" class="util-list-wrap">
      <div
        class="util-list-item-wrap"
        v-for="(item, idx) in searchUtilList"
        :key="`item-${idx}`"
      >
        <router-link
          :to="item.route"
          class="util-item shadowBox"
          @click="onClickUtil(item.name)"
        >
          <img :src="getIcon(item.name)" />
          <div>
            <div class="item-name">
              {{ item.name }}
            </div>
            <div class="item-desc">
              {{ item.desc }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else class="util-list-wrap">
      <div class="no-list">일치하는 항목이 없습니다.</div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import axios from "axios";
import MakeToast from "@/utils/makeToast";
import GraphIndicator from "@/components/GraphIndicator.vue";
import { UtilList, GetIcon } from "@/utils/UtilList";
export default {
  components: { GraphIndicator },
  mixins: [],
  props: {
    utilSearchText: String,
  },
  data() {
    return {
      utilList: UtilList,
      searchUtilList: [] as { name: string; desc: string; route: string }[],

      postList: [] as {
        title: string;
        writer: string;
        date: string;
        path: string;
      }[],
    };
  },
  computed: {},
  presets: {},
  watch: {
    utilSearchText() {
      this.getFilteredUtilList(this.utilSearchText);
    },
  },
  mounted() {
    this.searchUtilList = this.utilList;
  },
  methods: {
    getIcon(name: string) {
      return GetIcon(name);
    },
    getFilteredUtilList(searchValue: any) {
      if (
        searchValue === "" ||
        searchValue === null ||
        searchValue === undefined
      ) {
        this.searchUtilList = this.utilList;
        return;
      }
      this.searchUtilList = this.utilList.filter((util: any) =>
        util.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    },
    onClickUtil(name: any) {
      // MakeToast(`${name}으로 이동했습니다.`, "success", 2000);
    },
    loadingHandler(value: boolean) {
      this.$emit("loadingHandler", value);
    },
  },
};
</script>
<style scoped lang="scss">
.page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;

  .blue-wrap {
    width: 100%;
    height: 200px;
    border-radius: 16px;
    margin-bottom: 30px;
    background: linear-gradient(
      135deg,
      rgba(5, 150, 105, 0.2) 0%,
      rgba(16, 185, 129, 0.2) 100%
    );
    border: 1px solid var(--border-color);
    color: #fff;
    padding: 30px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    .dashboard-blue-title {
      text-align: left;
      font-size: 24px;
      font-weight: 800;
      line-height: 1.4;
      background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    img {
      position: absolute;
      right: 20px;
      bottom: -10px;
      width: 220px;
      height: 220px;
      opacity: 0.85;
      filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));
    }
  }

  .util-list-wrap {
    width: 100%;
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));

    .no-list {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-secondary);
      grid-column: 1 / -1;
      padding: 40px 0;
      text-align: center;
    }

    .util-list-item-wrap {
      width: 100%;
      height: 100%;

      .util-item {
        background: var(--bg-panel);
        border: 1px solid var(--border-color);
        padding: 24px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: left;
        min-height: 190px;
        height: 100%;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

        &:hover {
          transform: translateY(-6px);
          border-color: var(--border-hover);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3),
            0 0 15px rgba(16, 185, 129, 0.15);

          img {
            transform: scale(1.08) rotate(3deg);
            filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.45));
          }
        }

        img {
          width: 48px;
          height: 48px;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.2));
          transition: all 0.3s ease;
        }

        .item-name {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .item-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .page-wrap {
    padding: 20px;
  }
  .util-list-wrap {
    grid-template-columns: 1fr !important;
  }
}
</style>
