<template>
  <div class="page-wrap">
    <div class="image-sec shadowBox">
      <div class="upload-img" v-if="uploadedImage">
        <img :src="uploadedSrc" alt="Uploaded Image" />
        <img
          src="../../assets/ic_del.svg"
          alt="del-image"
          class="del-btn"
          @click="deleteImageHandler"
        />
      </div>
      <div class="upload-img" v-else>
        <p class="normal-desc">
          이미지를 업로드 해주세요.<br />jpg, png만 가능합니다.
        </p>
        <div class="file-input-wrapper">
          <input
            type="file"
            @change="handleFileChange"
            accept=".jpg, .jpeg, .png"
            style="display: none"
            ref="fileInput"
          />
          <button class="blue-btn" @click="openFileInput">파일 선택</button>
        </div>
      </div>
    </div>
    <div class="convert-sec">
      <div class="setting-sec flexColumn">
        <label>
          <p class="normal-desc">가로</p>
          <input
            v-model="selectedWidth"
            type="number"
            min="1"
            @input="onChangeWidth"
        /></label>
        <label
          ><p class="normal-desc">세로</p>
          <input
            v-model="selectedHeight"
            type="number"
            min="1"
            :readonly="pinWidthHeight"
            :class="{ disabled: pinWidthHeight }"
        /></label>
        <label class="flex-row-label"
          ><p class="normal-desc" style="width: 100%">가로세로 비율 고정</p>
          <input v-model="pinWidthHeight" type="checkbox"
        /></label>
        <label
          ><p class="normal-desc" style="width: 100%">형식</p>
          <select
            id="imageType"
            v-model="selectedImageType"
            class="image-type-selecet"
          >
            <option
              v-for="(item, idx) in imageTypeItem"
              :key="`item-${idx}`"
              :value="item"
            >
              {{ item.toUpperCase() }}
            </option>
          </select></label
        >
      </div>
      <div class="btn-sec flexRow">
        <button class="blue-btn" @click="convertAndDownload">
          Convert to
          {{ imageTypeItem.filter((f) => uploadedImageType !== f)[0] }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";
import download from "downloadjs";
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      uploadedImage: null as File | null,
      uploadedSrc: "",
      uploadedImageType: "",

      selectedWidth: 1,
      selectedHeight: 1,
      pinWidthHeight: false,
      selectedImageType: "jpg",
      imageTypeItem: ["jpg", "png"],
    };
  },
  computed: {},
  presets: {},
  watch: {
    uploadedImageType() {
      this.selectedImageType = this.imageTypeItem.filter(
        (f) => this.uploadedImageType !== f
      )[0];
    },
    pinWidthHeight() {
      if (this.pinWidthHeight) {
        this.selectedHeight = this.selectedWidth;
      } else {
        this.selectedHeight = 0;
      }
    },
    selectedWidth() {
      if (this.selectedWidth === 0) {
        this.selectedWidth = 1;
      }
    },
    selectedHeight() {
      if (this.selectedHeight === 0) {
        this.selectedHeight = 1;
      }
    },
  },
  mounted() {},
  methods: {
    openFileInput() {
      const fileInput = this.$refs.fileInput as HTMLInputElement | undefined;
      if (fileInput) {
        fileInput.click();
      }
    },
    handleFileChange(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        const type = file.type.split("/")[1];
        this.uploadedImageType = type === "png" ? "png" : "jpg";
        MakeToast(
          `${inputElement.files[0].name}이(가) 업로드되었습니다. / 타입 : ${this.uploadedImageType}`,
          "success",
          2000
        );
        this.uploadedImage = file;
        const image = new Image();
        image.src = this.uploadedSrc = URL.createObjectURL(file);
        image.onload = async () => {
          this.selectedWidth = image.width;
          this.selectedHeight = image.height;
        };
      }
    },
    deleteImageHandler() {
      this.uploadedImage = null;
      this.uploadedSrc = "";
      this.uploadedImageType = "";
      this.selectedWidth = 0;
      this.selectedHeight = 0;
      this.pinWidthHeight = false;
      this.selectedImageType = "jpg";
    },
    onChangeWidth() {
      if (this.pinWidthHeight) {
        this.selectedHeight = this.selectedWidth;
      }
    },
    async convertAndDownload() {
      if (this.uploadedImage) {
        const image = new Image();
        image.src = URL.createObjectURL(this.uploadedImage);
        image.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = this.selectedWidth;
          canvas.height = this.selectedHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(image, 0, 0, this.selectedWidth, this.selectedHeight);
            const dataUrl = canvas.toDataURL(`image/${this.selectedImageType}`);
            download(
              dataUrl,
              `converted.${this.selectedImageType}`,
              `image/${this.selectedImageType}`
            );
          }
        };
      } else {
        MakeToast(`이미지를 먼저 업로드 해주세요.`, "error", 2000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.image-sec {
  width: 100%;
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 280px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);

  .upload-img {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      max-height: 360px;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    img.del-btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 24px;
      height: 24px;
      cursor: pointer;
      opacity: 0.8;
      transition: all 0.2s ease;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }
  .file-input-wrapper {
    position: relative;
    overflow: hidden;
    margin-top: 15px;
  }
}
.convert-sec {
  border-radius: 16px;
  border: 1px solid var(--border-color);
  background: var(--bg-panel);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);

  .setting-sec {
    padding: 24px;
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    border-right: 1px solid var(--border-color);
    gap: 16px;
    label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      width: 100%;
      &.flex-row-label {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        p {
          margin: 0;
        }
        input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: var(--accent-primary);
          cursor: pointer;
        }
      }
      p {
        margin: 0;
        font-size: 13px;
        font-weight: 600;
        color: var(--text-secondary);
      }
    }
    input[type="number"], .image-type-selecet {
      border-radius: 10px;
      padding: 0 16px;
      width: 100%;
      height: 38px;
      background: rgba(15, 23, 42, 0.6);
      color: var(--text-primary);
      font-weight: 600;
      border: 1px solid var(--border-color);
      box-sizing: border-box;
      font-size: 14px;
      &:focus {
        border-color: var(--accent-primary);
        outline: none;
      }
      &.disabled {
        color: var(--text-secondary);
        border-color: var(--border-color);
        background: rgba(255,255,255,0.02);
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    .image-type-selecet {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 16px;
      padding-right: 40px;
      
      option {
        background: var(--bg-secondary);
        color: var(--text-primary);
      }
    }
  }
  .btn-sec {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    
    .blue-btn {
      padding: 12px 30px;
      font-size: 15px;
      border-radius: 20px;
    }
  }
}
@media (max-width: 700px) {
  .convert-sec {
    flex-direction: column;
    .setting-sec {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
    }
  }
}
</style>
