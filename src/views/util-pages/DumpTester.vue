<template>
  <div class="page-wrap" style="margin-bottom: 60px">
    <div class="upload-wrap">
      <div class="upload-test-wrap">
        <div class="file-wrap">
          <button style="margin-right: 10px" @click="downloadExampleFile">
            문제풀기 양식 다운로드
          </button>
          <div class="filebox">
            <label for="ex_file">파일 업로드</label>
            <input
              ref="fileInput"
              type="file"
              accept=".js"
              id="ex_file"
              @change="handleFileUpload"
            />
          </div>
        </div>
        <div v-if="uploadJs.length" class="score-wrap">
          정답 갯수 : {{ correctAnswers }}
        </div>
        <div class="save-question">
          <input
            type="text"
            v-model="saveQuestionTitle"
            style="height: 23px"
            placeholder="제목을 입력하세요."
          />
          <button
            @click="saveDump"
            :disabled="!uploadJs.length || saveQuestionTitle === ''"
          >
            업로드된 문제 저장
          </button>
        </div>
      </div>
      <div class="saved-question">
        <div v-for="(dump, index) in savedDumps" :key="index" class="dump-item">
          {{ dump.title }}
          <img
            src="../../assets/dump-tester/ic_download.svg"
            class="delete-saved"
            @click="onClickSavedDumps(index)"
          />
          <img
            src="../../assets/dump-tester/ic_del.svg"
            class="delete-saved"
            @click="deleteDump(index)"
          />
        </div>
      </div>
    </div>
    <div v-if="uploadJs.length" class="example-wrap">
      <div class="question-num">
        <div class="question-title">
          Question: #{{ nowQuestionNum }}/{{ allQuestionNum }}
        </div>
        <div class="question-btn-wrap">
          <button @click="changeOnlyAnswer" style="margin-right: 10px">
            정답만 보기
            <span v-if="onlyAnswer" style="color: blue">(ON)</span>
            <span v-else style="color: red">(OFF)</span>
          </button>
          <button @click="randomQuestion">문제섞기</button>
        </div>
      </div>
      <p class="question" v-html="question"></p>
      <div
        ref="example"
        class="example"
        v-for="(example, index) in examples"
        :key="index"
        @click="clickExample(index)"
      >
        <input
          class="example-ck"
          type="checkbox"
          v-model="checkedExamples[index]"
        />
        <div v-html="`${examplePrefix[index]}. ${example.text}`"></div>
      </div>
    </div>
    <div v-else>문제를 업로드하거나 불러와주세요.</div>
    <div v-if="uploadJs.length" class="btn-wrap">
      <button class="prev" :disabled="nowQuestionNum <= 1" @click="onPrevious">
        &lt;
      </button>
      <button
        @click="checkAnswer"
        :disabled="examples.length === 0 || !getNoChecked()"
      >
        정답확인
      </button>
      <button @click="retryQuestion" :disabled="examples.length === 0">
        다시풀기
      </button>
      <button
        class="prev"
        :disabled="nowQuestionNum === uploadJs.length"
        @click="onNext"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";

export default {
  components: {},
  mixins: [],
  props: {
    panelState: Boolean,
  },
  data() {
    return {
      uploadJs: [] as Array<any>,
      showQuestionArr: [] as Array<any>,
      examplePrefix: ["A", "B", "C", "D", "E", "F", "G"],
      allQuestionNum: 0,
      //정답만 보기
      onlyAnswer: false,
      //점수 관련
      correctAnswers: 0,
      //문제 저장 관련
      savedDumps: [] as Array<any>,
      saveQuestionTitle: "",
      //지금문제 세팅
      nowQuestionNum: 0,
      question: "",
      examples: [] as Array<any>,
      answers: [],
      checkedExamples: new Array(this.examples?.length).fill(false),
    };
  },
  computed: {},
  presets: {},
  watch: {
    uploadJs() {
      if (this.uploadJs.length) {
        this.showQuestionArr = this.uploadJs;
        this.allQuestionNum = this.uploadJs.length;
        this.nowQuestionNum = 1;
        this.correctAnswers = 0;
      }
    },
    nowQuestionNum() {
      if (this.nowQuestionNum !== 0) {
        this.initExample();
      }
    },
    onlyAnswer() {
      this.initExample();
    },
  },
  mounted() {
    this.getDumps();
  },
  methods: {
    //업로드
    handleFileUpload(event: Event) {
      this.allClear();

      setTimeout(() => {
        const inputElement = this.$refs.fileInput as HTMLInputElement;
        const file = inputElement.files?.[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const fileContents = reader.result as string;
              const parsedArray = eval(fileContents);

              if (Array.isArray(parsedArray)) {
                this.uploadJs = parsedArray;
              } else {
                console.error("File does not contain a valid array.");
              }
            } catch (error) {
              console.error("Error parsing file:", error);
            }
          };
          if (inputElement.value) {
            const pathArr = inputElement.value.split("\\");
            MakeToast(
              `로컬에서 ${pathArr.pop()}을(를) 불러왔습니다.`,
              "success",
              2000
            );
          }
          reader.readAsText(file);
          inputElement.value = "";
        }
      }, 100);
    },
    //예제 다운로드
    downloadExampleFile() {
      const example = [
        {
          number: 1,
          question: `문제`,
          examples: [`답안1`, `답안2`, `답안3`, `답안4`],
          answers: ["A"],
        },
        {
          number: 2,
          question: `문제1`,
          examples: [`답안1`, `답안2`, `답안3`, `답안4`],
          answers: ["A"],
        },
        {
          number: 3,
          question: `문제2`,
          examples: [`답안1`, `답안2`, `답안3`, `답안4`],
          answers: ["A"],
        },
      ];
      const jsonContent = JSON.stringify(example, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "example.js";
      link.click();
      URL.revokeObjectURL(url);
    },
    //문제 세팅
    initExample() {
      this.setQuestion();
      this.setExamples();
      this.setAnswers();
    },
    setQuestion() {
      this.question = this.showQuestionArr[this.nowQuestionNum - 1].question;
    },
    setExamples() {
      this.examples = this.showQuestionArr[this.nowQuestionNum - 1].examples;

      const putPrefix: any = [];
      this.examples.forEach((r: any, index: number) => {
        putPrefix.push({
          prefix: this.examplePrefix[index],
          text: r as string,
        });
      });
      this.examples = this.shuffleArray(putPrefix);
      if (this.onlyAnswer) {
        //정답만보기
        const answer = this.showQuestionArr[this.nowQuestionNum - 1].answers;
        const onlyAnswer: any = [];
        answer.forEach((ans: any) => {
          this.examples.forEach((item: any) => {
            if (item.prefix === ans) {
              onlyAnswer.push({
                prefix: item.prefix,
                text: item.text as string,
              });
            }
          });
        });
        this.examples = onlyAnswer;
        this.clearExampleRef();
      }
    },
    setAnswers() {
      this.answers = this.showQuestionArr[this.nowQuestionNum - 1].answers;
    },
    getDumps() {
      const savedDumps = localStorage.getItem("SAVE_DUMPS");
      if (savedDumps !== null) {
        this.savedDumps = JSON.parse(savedDumps);
      } else {
        this.savedDumps = [];
      }
    },
    //덤프 불러오기
    onClickSavedDumps(index: number) {
      this.allClear();
      setTimeout(() => {
        const callDump = this.savedDumps[index];
        this.uploadJs = callDump.dump;
        this.checkedExamples = new Array(this.examples?.length).fill(false);
        this.onlyAnswer = false;
        MakeToast(`${callDump.title}이(가) 불러와졌습니다.`, "success", 2000);
      }, 100);
    },
    //덤프 저장 및 삭제
    saveDump() {
      this.savedDumps.push({
        title: this.saveQuestionTitle,
        dump: this.uploadJs,
      });
      localStorage.setItem("SAVE_DUMPS", JSON.stringify(this.savedDumps));
      this.saveQuestionTitle = "";
      MakeToast(
        `${this.saveQuestionTitle}이(가) 저장되었습니다.`,
        "success",
        2000
      );
    },
    deleteDump(index: number) {
      const deleteDump = this.savedDumps[index];
      const deletedArr = this.savedDumps.filter(
        (d: any, dIndex: number) => dIndex !== index
      );
      localStorage.setItem("SAVE_DUMPS", JSON.stringify(deletedArr));
      MakeToast(`${deleteDump.title}이(가) 삭제되었습니다.`, "success", 2000);
      this.getDumps();
    },
    //문제 클릭시
    clickExample(index: any) {
      this.checkedExamples[index] = !this.checkedExamples[index];
      if (!this.checkedExamples[index]) {
        this.clearRefForIndex(index);
      }
    },
    //버튼 동작
    onPrevious() {
      if (this.nowQuestionNum > 1) {
        this.clearExampleRef();
        this.nowQuestionNum = this.nowQuestionNum - 1;
      }
    },
    onNext() {
      if (this.nowQuestionNum < this.showQuestionArr.length) {
        this.clearExampleRef();
        this.nowQuestionNum = this.nowQuestionNum + 1;
      }
    },
    getNoChecked() {
      const hasTrue = this.checkedExamples.some((element) => element);
      return hasTrue;
    },
    changeOnlyAnswer() {
      this.onlyAnswer = !this.onlyAnswer;
    },
    //인덱스 기준으로 ref초기화
    clearRefForIndex(index: number) {
      const ref: any = this.$refs.example;
      ref[index].classList = ["example"];
    },
    //문제 섞기
    randomQuestion() {
      this.clearQuestion();
      this.clearExampleRef();
      setTimeout(() => {
        this.showQuestionArr = this.shuffleArray(this.showQuestionArr);
        this.initExample();
      }, 100);
    },
    shuffleArray(array: any) {
      return array.sort(() => Math.random() - 0.5);
    },
    //문제 다시풀기
    retryQuestion() {
      this.question = "";
      this.examples = [];
      this.answers = [];
      setTimeout(() => {
        this.initExample();
        this.checkedExamples = new Array(this.examples?.length).fill(false);
      }, 100);
    },
    //초기상태로 초기화
    allClear() {
      if (this.uploadJs.length) {
        this.nowQuestionNum = 0;
        this.question = "";
        this.examples = [];
        this.answers = [];
        this.uploadJs = [];
        this.showQuestionArr = [];
      }
    },
    //초기화
    clearQuestion() {
      this.nowQuestionNum = 1;
      this.question = "";
      this.examples = [];
      this.answers = [];
    },
    //정답 체크 초기화
    clearExampleRef() {
      this.checkedExamples = new Array(this.examples?.length).fill(false);
      this.examples.forEach((e: any, index) => {
        this.clearRefForIndex(index);
      });
    },
    checkAnswer() {
      this.examples.forEach((e: any, index) => {
        this.clearRefForIndex(index);
      });
      //체크한 체크박스 인덱스 추출
      const trueIndices = this.checkedExamples
        .map((element, index) => (element ? index : -1))
        .reduce((accumulator: any, currentIndex: any) => {
          if (currentIndex !== -1) {
            accumulator.push(currentIndex);
          }
          return accumulator;
        }, []);

      //답 찾기
      const checkedArr: any = [];
      trueIndices.forEach((num: any) => {
        checkedArr.push(this.examples[num].prefix);
      });
      const answer = this.answers.slice().sort();
      const check = checkedArr.slice().sort();
      const areArraysEqual =
        answer.length === check.length &&
        answer.every((element, index) => element === check[index]);
      const ref: any = this.$refs.example;
      if (areArraysEqual) {
        MakeToast("정답!", "success", 1500);
        trueIndices.forEach((num: any) => {
          ref[num].classList.add("success");
          this.correctAnswers = this.correctAnswers + 1;
        });
      } else {
        MakeToast("땡!", "error", 1500);
        trueIndices.forEach((num: any) => {
          ref[num].classList.add("fail");
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.upload-wrap {
  width: 100%;
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.upload-test-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}
.file-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  button {
    font-size: 13px;
    padding: 0 16px;
    cursor: pointer;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    font-weight: 600;
    border-radius: 20px;
    transition: all 0.2s ease;
    line-height: 1;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--text-secondary);
    }
  }
}
.filebox {
  label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    cursor: pointer;
    font-size: 13px;
    padding: 0 16px;
    height: 36px;
    background: linear-gradient(135deg, var(--accent-secondary) 0%, #4f46e5 100%);
    color: #fff;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
    transition: all 0.2s ease;
    line-height: 1;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
    }
  }
  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
}
.save-question {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  input[type="text"] {
    height: 36px;
    border: 1px solid var(--border-color);
    padding: 0 16px;
    background: rgba(15, 23, 42, 0.6);
    border-radius: 20px;
    color: var(--text-primary);
    font-size: 13px;
    line-height: 1;
    &::placeholder {
      color: var(--text-secondary);
    }
    &:focus {
      border-color: var(--accent-primary);
    }
  }
  button {
    font-size: 13px;
    padding: 0 16px;
    cursor: pointer;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    font-weight: 600;
    border-radius: 20px;
    transition: all 0.2s ease;
    line-height: 1;
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--accent-primary);
    }
    &:disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
}
.saved-question {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
  height: 48px;
  margin-top: 15px;
  padding-bottom: 4px;
  gap: 8px;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
}
.dump-item {
  min-width: max-content;
  padding: 6px 14px;
  height: 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--accent-primary);
  }
  .delete-saved {
    width: 12px;
    height: 12px;
    opacity: 0.6;
    transition: all 0.2s ease;
    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
}
.score-wrap {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent-primary);
  background: rgba(56, 189, 248, 0.1);
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid rgba(56, 189, 248, 0.2);
}
.example-wrap {
  width: 100%;
  max-width: 1200px;
  text-align: left;
}
.question-num {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.question-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--accent-primary);
}
.question-btn-wrap {
  display: flex;
  gap: 8px;
  button {
    font-size: 12px;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--text-secondary);
    }
  }
}
.question {
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--bg-panel);
  padding: 24px;
  margin-bottom: 24px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
}
.example {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 16px 20px;
  margin: 0 0 12px 0;
  border: 1px solid var(--border-color);
  background: rgba(30, 41, 59, 0.2);
  border-radius: 12px;
  transition: all 0.2s ease;
  gap: 12px;
  &:hover {
    background: rgba(255, 255, 255, 0.02);
    border-color: var(--border-hover);
  }
}
.example-ck {
  margin: 0;
  cursor: pointer;
  accent-color: var(--accent-primary);
  width: 16px;
  height: 16px;
}
.btn-wrap {
  width: 100%;
  max-width: 600px;
  margin: 30px auto 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  button {
    font-size: 14px;
    padding: 10px 24px;
    height: 40px;
    background: var(--bg-panel);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    border-radius: 20px;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover:not(:disabled) {
      border-color: var(--accent-primary);
      background: rgba(255, 255, 255, 0.05);
    }
    &:disabled {
      opacity: 0.3;
      pointer-events: none;
    }
    &.prev {
      width: 50px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.success {
  font-weight: 700;
  border-color: var(--accent-success) !important;
  background: var(--accent-success-bg) !important;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.15);
}
.fail {
  border-color: var(--accent-error) !important;
  background: var(--accent-error-bg) !important;
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.15);
}
@media (max-width: 700px) {
  .upload-test-wrap {
    align-items: flex-start;
    flex-direction: column;
  }
  .file-wrap {
    width: 100%;
    justify-content: space-between;
  }
  .save-question {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
  input[type="text"] {
    width: 100%;
    margin: 0;
  }
  .question-num {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .question-btn-wrap {
    width: 100%;
    justify-content: space-between;
  }
  .save-question button {
    margin-top: 5px;
    width: 100%;
  }
  .score-wrap {
    width: 100%;
    text-align: center;
  }
}
</style>
