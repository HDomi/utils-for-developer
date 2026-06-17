<template>
  <div class="page-wrap">
    <div class="pdf-header shadowBox">
      <div class="file-input-wrapper">
        <input
          type="file"
          @change="handleFileChange"
          accept=".pdf"
          style="display: none"
          ref="fileInput"
          multiple
        />
        <div class="flexRow">
          <button class="blue-btn" @click="openFileInput">파일 선택</button>
          <p v-if="pdfFiles.length">{{ pdfFiles.length }}개 선택됨</p>
        </div>
      </div>
      <div>
        <button
          v-if="pdfFiles.length"
          class="blue-btn"
          style="margin-right: 15px"
          @click="deleteAllPdf"
        >
          모두삭제
        </button>
        <button class="blue-btn" @click="mergeAndDownload">
          PDF 병합 및 다운로드
        </button>
      </div>
    </div>
    <div class="flexRow pdf-desc">
      <p class="normal-desc">
        모든 파일이 리스트의 순서대로 합쳐집니다. 리스트 아이템을 이동하여
        순서를 변경해주세요.
      </p>
    </div>
    <draggable
      :list="pdfFiles"
      :disabled="!enabled"
      item-key="name"
      class="uploaded-pdf-list"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element, index }">
        <div class="uploaded-pdf-item">
          <p class="normal-desc">{{ index + 1 }}. {{ element.name }}</p>
          <img
            src="../../assets/ic_del.svg"
            alt="del-image"
            class="del-btn"
            @click="deleteUploadedFile(index)"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";
import { PDFDocument } from "pdf-lib";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      pdfFiles: [] as File[],

      enabled: true,
      dragging: false,
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {
    openFileInput() {
      const fileInput = this.$refs.fileInput as HTMLInputElement | undefined;
      if (fileInput) {
        fileInput.click();
      }
    },
    deleteUploadedFile(index: number) {
      const name = this.pdfFiles[index].name;
      MakeToast(`${name}이(가) 삭제 되었습니다.`, "success", 2000);
      this.pdfFiles.splice(index, 1);
    },
    deleteAllPdf() {
      this.pdfFiles = [];
      MakeToast(`모든 PDF가 삭제 되었습니다.`, "success", 2000);
    },
    handleFileChange(event: any) {
      const uploadFiles = Array.from(event.target.files);
      if (uploadFiles) {
        const nameArray = uploadFiles.map((item: any) => item.name);
        MakeToast(
          `${nameArray.join(", ")}이(가) 업로드 되었습니다.`,
          "success",
          5000
        );
        this.pdfFiles.push(...(uploadFiles as File[]));
      }
    },
    checkMove(e: any) {
      console.log("Future index: " + e.draggedContext.futureIndex);
    },
    async mergeAndDownload() {
      try {
        const mergedPdfDoc = await PDFDocument.create();

        for (const pdfFile of this.pdfFiles) {
          const pdfBuffer = await pdfFile.arrayBuffer();
          const pdfDoc = await PDFDocument.load(pdfBuffer);

          const copiedPages = await mergedPdfDoc.copyPages(
            pdfDoc,
            pdfDoc.getPageIndices()
          );
          copiedPages.forEach((copiedPage) => {
            mergedPdfDoc.addPage(copiedPage);
          });
        }

        const mergedPdfBytes = await mergedPdfDoc.save();

        const mergedPdfBlob = new Blob([mergedPdfBytes], {
          type: "application/pdf",
        });
        const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

        const downloadLink = document.createElement("a");
        downloadLink.href = mergedPdfUrl;
        downloadLink.download = "Combined.pdf";
        downloadLink.click();

        URL.revokeObjectURL(mergedPdfUrl);
      } catch (err: any) {
        const errString = `${err}`;
        if (errString.includes("ignoreEncryption: true")) {
          MakeToast(`보안설정이 되어있는 PDF가 있습니다.`, "error", 2000);
        } else {
          MakeToast(`${err}`, "error", 2000);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.pdf-header {
  width: 100%;
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  gap: 15px;

  .file-input-wrapper {
    position: relative;
    overflow: hidden;
    .flexRow {
      gap: 12px;
      p {
        margin: 0;
        font-size: 13px;
        font-weight: 700;
        color: var(--accent-primary);
        background: rgba(56, 189, 248, 0.1);
        padding: 6px 12px;
        border-radius: 20px;
        border: 1px solid rgba(56, 189, 248, 0.25);
      }
    }
  }
  
  .blue-btn {
    font-size: 13px;
    padding: 8px 18px;
    height: 36px;
  }
}
.pdf-desc {
  justify-content: flex-start;
  margin: 20px 0 10px 0;
  p {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 6px;
    &::before {
      content: "•";
      color: var(--accent-primary);
      font-size: 18px;
    }
  }
}
.uploaded-pdf-list {
  border-radius: 16px;
  border: 1px solid var(--border-color);
  padding: 20px;
  width: 100%;
  min-height: 200px;
  background: rgba(30, 41, 59, 0.15);
  display: flex;
  gap: 10px;
  color: var(--text-primary);
  flex-direction: column;
  align-content: flex-start;
  
  .uploaded-pdf-item {
    cursor: grab;
    white-space: nowrap;
    height: 44px;
    width: 100%;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background: rgba(15, 23, 42, 0.45);
    transition: all 0.2s ease;
    
    &:hover {
      border-color: var(--border-hover);
      background: rgba(15, 23, 42, 0.75);
      transform: translateX(4px);
    }
    
    &:active {
      cursor: grabbing;
    }
    
    p {
      color: var(--text-primary);
      font-size: 14px;
      font-weight: 500;
    }
    
    img.del-btn {
      margin-left: 10px;
      width: 14px;
      height: 14px;
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.2s ease;
      &:hover {
        opacity: 1;
        transform: scale(1.15);
      }
    }
  }
  
  .ghost {
    opacity: 0.4;
    background: rgba(99, 102, 241, 0.1) !important;
    border: 1px dashed var(--accent-primary) !important;
  }
}
@media (max-width: 700px) {
  .pdf-header {
    flex-direction: column;
    align-items: stretch;
    .file-input-wrapper .flexRow {
      justify-content: space-between;
    }
    div {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      button {
        margin: 0 !important;
        flex: 1;
      }
    }
  }
}
</style>
