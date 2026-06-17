<template>
  <div class="page-wrap">
    <div class="page-wrap-inner">
      <div class="posting-title">
        <h1>{{ mdTitle }}</h1>
      </div>
      <div class="cutBar"></div>
      <div class="posting-info-wrap">
        <div class="posting-golist" @click="goList">목록으로</div>
        <div class="posting-date">작성자 : {{ mdWriter }}</div>
      </div>
      <div class="posting-wrap">
        <div
          v-html="contents"
          class="article"
          style="padding-bottom: 100px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";
import axios from "axios";
import htmlConverter from "@/utils/htmlConverter";

export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      mdTitle: "",
      mdWriter: "",
      contents: "",
    };
  },
  async created() {
    this.loadingHandler(true);
    const path = this.$route.query.mdPath;
    await axios
      .get(`https://hdomi.github.io/util-posts/${path}`)
      .then((res: any) => {
        this.contents = htmlConverter(res.data);
        this.loadingHandler(false);
      })
      .catch((e: any) => {
        console.log(`ERROR🙄 ${e.response.status} : ${e.request.responseURL}`);
        this.loadingHandler(false);
      });
  },

  computed: {},
  presets: {},
  watch: {},
  mounted() {
    const mdTitle: any = this.$route.query.mdPath;
    const makeTitleDate = mdTitle.split("-");
    this.mdTitle = makeTitleDate[0];
    this.mdWriter = makeTitleDate[1];
  },
  methods: {
    goList() {
      this.$router.push({
        path: `/`,
      });
    },
    loadingHandler(value: boolean) {
      this.$emit("loadingHandler", value);
    },
  },
};
</script>

<style scoped lang="scss">
.page-wrap {
  height: 100%;
  min-height: min-content !important;
}
.cutBar {
  margin-bottom: 0px;
}
.posting-info-wrap {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.posting-golist {
  cursor: pointer;
  text-decoration: underline;
}
.posting-date {
  text-align: right;
}
.posting-wrap {
  word-break: keep-all;
}
pre code {
  font-size: 17px;
  font-weight: 300;
}
@media (max-width: 900px) {
  pre code {
    font-size: 14px;
  }
}
@media (max-width: 700px) {
}
</style>
