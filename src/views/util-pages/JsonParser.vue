<template>
  <div class="page-wrap hiddenScroll">
    <div class="parser-wrap">
      <textarea v-model="inputJson" class="input-parser" spellcheck="false" />
      <div class="parsing-wrap">
        <div class="parsing-header">
          <span>String > JSON</span>
          <button @click="onClickCopy">복사</button>
        </div>
        <div class="parsing-sec blueScrollBar" v-html="getParsing()"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";

export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      inputJson: "",
      jsonToString: "",
    };
  },
  computed: {},
  presets: {},
  watch: {
    // inputJson() {
    //   console.log(JSON.stringify(this.inputJson));
    // },
  },
  mounted() {},
  methods: {
    getPlusAndMinus(key: string, type: string) {
      const text = type === "plus" ? "+" : "-";
      const style = `width: 10px;
        height: 10px;
        border-radius: 2px;
        border: 1px solid #333;
        font-size: 14px;
        display: inline-block;
        text-align: center;
        line-height: 10px;
        margin-left: 10px;
        cursor: pointer;
        `;
      // return `<span class="${key}" style="${style}" @click="console.log('ads')">${text}</span><br>`;
      return `<span></span>`;
    },
    onClickOpener() {
      console.log("click");
    },
    returnSection(v: any) {
      return `<span style="color: #94a3b8; font-weight: 500;">${v}</span>`;
    },
    returnValue(v: any, type: any) {
      let color = "";
      switch (type) {
        case "boolean":
          color = v ? "#10b981" : "#f87171";
          break;
        case "number":
          color = "#fbbf24";
          break;
        case "string":
          color = "#34d399";
          break;
      }
      return `<span class="parse-value" style="color: ${color}; font-weight: 500;">${v}</span>`;
    },
    getParsing() {
      if (this.inputJson) {
        try {
          let parsingObject = null;
          if (this.inputJson.charAt(0) === '"') {
            const parsingString = JSON.parse(this.inputJson);
            this.jsonToString = parsingString;
            parsingObject = JSON.parse(parsingString);
          } else {
            this.jsonToString = this.inputJson;
            parsingObject = JSON.parse(this.inputJson);
          }
          let parsed = `<span style="color: #94a3b8">{</span>`;
          parsed += this.parseObject(parsingObject, 0, "wrap");
          parsed += `<span style="color: #94a3b8">}</span>`;

          return parsed;
        } catch (error) {
          return `<span style="color: var(--accent-error)">유효하지 않은 데이터입니다.</span>`;
        }
      } else {
        return `<span style="color: var(--text-secondary)">데이터를 입력해주세요.</span>`;
      }
    },

    parseObject(obj: any, depth: any, title: string) {
      if (typeof obj !== "object" || obj === null) {
        if (typeof obj === "string") {
          return this.returnValue(`"${obj}"`, typeof obj);
        } else if (typeof obj === "boolean" || typeof obj === "number") {
          return this.returnValue(obj, typeof obj);
        } else {
          return JSON.stringify(obj);
        }
      }

      let parsed = ``;
      const keys = Object.keys(obj);

      keys.forEach((key, index) => {
        parsed += `<span class="parse-key" style="color: #818cf8; font-weight: 600;">"${key}": </span>`;

        const value = obj[key];

        if (Array.isArray(value)) {
          parsed += `${this.returnSection("[")}${this.getPlusAndMinus(
            key,
            "minus"
          )}`;
          parsed += this.parseObject(value, depth + 1, key);
          parsed += `${this.returnSection("]")}`;
        } else if (typeof value === "object" && value !== null) {
          parsed += `${this.returnSection("{")}${this.getPlusAndMinus(
            key,
            "minus"
          )}`;
          parsed += this.parseObject(value, depth + 1, key);
          parsed += `${this.returnSection("}")}`;
        } else {
          if (typeof value === "string") {
            parsed += this.returnValue(`"${value}"`, typeof value);
          } else if (typeof value === "boolean" || typeof value === "number") {
            parsed += this.returnValue(value, typeof value);
          } else {
            parsed += JSON.stringify(value);
          }
        }

        if (index < keys.length - 1) {
          parsed += `${this.returnSection(",")}<br>`;
        }
      });
      if (depth >= 0) {
        parsed = `<div class="div-${title}" style="margin-left: 20px">${parsed}</div>`;
      }

      return parsed;
    },
    onClickCopy() {
      MakeToast(`복사되었습니다.`, "success", 2000);
      console.log("COPY\n", this.jsonToString);
    },
  },
};
</script>

<style scoped lang="scss">
.parser-wrap {
  width: 100%;
  height: calc(100vh - 160px);
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  gap: 20px;
  
  .input-parser {
    text-align: start;
    background: rgba(10, 20, 16, 0.45);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    width: 40%;
    height: 100%;
    resize: none;
    padding: 20px;
    font-family: "Fira Code", Consolas, Monaco, "Courier New", monospace;
    font-size: 14px;
    line-height: 1.6;
    border-radius: 16px;
    backdrop-filter: blur(12px);
    
    &:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);
    }
  }
  
  .parsing-wrap {
    border: 1px solid var(--border-color);
    width: 60%;
    background: rgba(10, 20, 16, 0.45);
    height: 100%;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
    
    .parsing-header {
      background: rgba(10, 20, 16, 0.85);
      height: 48px;
      padding: 0 20px;
      text-align: left;
      color: var(--text-primary);
      font-weight: 700;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
      letter-spacing: -0.2px;
      
      button {
        border: 1px solid var(--border-color);
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-primary);
        font-weight: 600;
        border-radius: 20px;
        height: 28px;
        padding: 0 16px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-primary);
        }
      }
    }
    
    .parsing-sec {
      overflow-y: auto;
      flex: 1;
      text-align: left;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      font-family: "Fira Code", Consolas, Monaco, "Courier New", monospace;
      font-size: 14px;
      line-height: 1.6;
      
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 3px;
        &:hover {
          background: var(--accent-primary);
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .parser-wrap {
    flex-direction: column;
    height: auto;
    overflow-y: auto;
    
    .input-parser {
      width: 100%;
      height: 300px;
    }
    .parsing-wrap {
      width: 100%;
      height: 400px;
    }
  }
}
</style>
