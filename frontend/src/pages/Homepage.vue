<script setup>
import formatText from "@composables/type_logic/formatText";
import { textContent } from "@composables/storiesAction.js";
import useTypingTest from "@composables/type_logic/useTypingLogic.js";
import { ref, onMounted, nextTick, computed, watch, onUnmounted } from "vue";
import Navbar from "../components/Navbar/Navbar.vue";
import TextNav from "../components/TextNav.vue";
import TypingArea from "../components/TypingArea.vue";
import LogoSVG from "@media/Logo.vue";
import useGraphToggle from "@/composables/useGraphToggle";
import TypingGraph from "../components/TypingGraph.vue";

const { showGraph } = useGraphToggle();

const formattedText = ref("");
const accuracy = ref(100);
const selectedTime = ref(15);
const wordRefs = ref([]);
const wordWrapperRef = ref(null);
const initializeText = () => {
  formattedText.value = formatText(
    textContent.value ||
      "Loading story... (If this persists, check your connection)"
  );
};

// Watch for changes in textContent
watch(textContent, (newValue) => {
  formattedText.value = formatText(newValue);
  resetTypingState();
});

// Load initial story on mount
onMounted(async () => {
  try {
    // Call storiesAction directly to fetch first story
    const storiesAction = (await import("@composables/storiesAction.js"))
      .default;
    await storiesAction();
    initializeText();
  } catch (error) {
    console.error("Failed to load initial story:", error);
    formattedText.value = formatText(
      "Failed to load initial story. Click Stories to retry."
    );
  }
});
const getLineMap = () => {
  const lineMap = {};
  let lastOffsetTop = null;
  let currentLine = 0;

  wordRefs.value.forEach((el, index) => {
    if (!el) return;

    const offsetTop = el.offsetTop;

    if (lastOffsetTop === null) {
      lastOffsetTop = offsetTop;
    } else if (offsetTop !== lastOffsetTop) {
      currentLine++;
      lastOffsetTop = offsetTop;
    }

    lineMap[index] = currentLine;
  });

  return lineMap;
};

const scrollToLine = (lineIndex) => {
  const wordEl = wordRefs.value.find((_, index) => {
    return getLineMap()[index] === lineIndex;
  });

  if (wordEl) {
    wordEl.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

const {
  inputRef,
  userInput,
  typedWords,
  currentWordIndex,
  isWordCorrect,
  splitUserInput,
  getLetterClass,
  getExtraLetters,
  focusInput,
  typingStarted,
  typingEnded,
  wpm,
  resetTypingState,
  formattedTime,
} = useTypingTest(
  formattedText,
  accuracy,
  selectedTime,
  getLineMap,
  scrollToLine
);

const handleTimeChange = async (newTime) => {
  selectedTime.value = newTime;
  accuracy.value = 100;
  resetTypingState();

  try {
    const storiesAction = (await import("@composables/storiesAction.js"))
      .default;
    ("");
    await storiesAction("time"); // fetch new stories used for time/stories category
    initializeText(); // format it
  } catch (error) {
    console.error("Failed to fetch new story on time change:", error);
    formattedText.value = formatText(
      "Failed to load story. Try clicking Stories again."
    );
  }
};
</script>

<template>
  <div
    class="h-screen w-screen bg-primary-grey p-4 flex items-center flex-col justify-start"
    @click="focusInput"
  >
    <div class="w-[70%] flex items-center justify-center mt-6">
      <router-link to="/" class="w-26 relative mr-6">
        <LogoSVG class="w-full h-auto cursor-pointer text-primary-paige" />
      </router-link>
      <div class="flex">
        <Navbar :selected-time="selectedTime" @update-time="handleTimeChange" />
      </div>
    </div>

    <div
      class="flex flex-col w-[70%] flex-1 items-center justify-center text-primary-grey text-4xl font-semibold relative overflow-hidden"
    >
      <TypingGraph
        v-if="showGraph"
        :typing-started="typingStarted"
        :typing-ended="typingEnded"
        :wpm="wpm"
        :accuracy="accuracy"
      />
      <TextNav
        :typing-started="typingStarted"
        :typing-ended="typingEnded"
        :accuracy-count="accuracy"
        :wpm="wpm"
        :formatted-time="formattedTime"
        :selected-time="selectedTime"
        @new-test="handleTimeChange(selectedTime)"
      />
      <TypingArea
        :wordRefs="wordRefs"
        :word-wrapper-ref="wordWrapperRef"
        :formatted-text="formattedText"
        :split-user-input="splitUserInput"
        :get-letter-class="getLetterClass"
        :get-extra-letters="getExtraLetters"
      />

      <input
        ref="inputRef"
        v-model="userInput"
        class="absolute opacity-0"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        :disabled="typingEnded"
      />
    </div>
  </div>
</template>
