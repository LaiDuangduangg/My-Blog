<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { getDefaultHue, getHue, setHue } from "@utils/setting-utils";

let hue = getHue();
const defaultHue = getDefaultHue();

function resetHue() {
	hue = getDefaultHue();
}

$: if (hue || hue === 0) {
	setHue(hue);
}
</script>

<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4">
    <div class="flex flex-row gap-2 mb-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            {i18n(I18nKey.themeColor)}
            <button aria-label="Reset to Default" class="reset-hue-btn btn-regular w-7 h-7 rounded-md  active:scale-90 will-change-transform"
                    class:opacity-0={hue === defaultHue} class:pointer-events-none={hue === defaultHue} on:click={resetHue}>
                <div class="text-[var(--btn-content)]">
                    <Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
                </div>
            </button>
        </div>
        <div class="flex gap-1">
            <div id="hueValue" class="hue-value transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
            font-bold text-sm items-center text-[var(--btn-content)]">
                {hue}
            </div>
        </div>
    </div>
    <div class="color-slider-shell w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
        <input aria-label={i18n(I18nKey.themeColor)} type="range" min="0" max="360" bind:value={hue}
               class="slider" id="colorSlider" step="5" style="width: 100%">
    </div>
</div>


<style>
    #display-setting {
      backdrop-filter: blur(18px) saturate(1.18);
      border: 1px solid color-mix(in oklch, var(--primary) 16%, transparent);
      box-shadow:
        0 18px 48px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.42);
    }

    .reset-hue-btn {
      transition:
        transform 180ms ease,
        background-color 180ms ease,
        opacity 180ms ease;
    }

    .reset-hue-btn:hover {
      transform: rotate(-22deg) scale(1.05);
    }

    .hue-value {
      box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--primary) 14%, transparent);
    }

    .color-slider-shell {
      position: relative;
      overflow: hidden;
      border-radius: 0.45rem;
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.35),
        0 8px 18px color-mix(in oklch, var(--primary) 12%, transparent);
    }

    .color-slider-shell::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.28),
        transparent 30%,
        rgba(255, 255, 255, 0.22)
      );
    }

    #display-setting input[type="range"] {
      -webkit-appearance: none;
      height: 1.5rem;
      background-image: var(--color-selection-bar);
      cursor: pointer;
      transition: background-image 0.15s ease-in-out;
    }

    #display-setting input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 0.72rem;
      height: 1.05rem;
      border-radius: 0.2rem;
      background: rgba(255, 255, 255, 0.9);
      box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.08),
        0 3px 10px rgba(0, 0, 0, 0.18);
    }

    #display-setting input[type="range"]::-webkit-slider-thumb:hover {
      background: rgba(255, 255, 255, 1);
    }

    #display-setting input[type="range"]::-webkit-slider-thumb:active {
      background: rgba(255, 255, 255, 0.6);
    }

    #display-setting input[type="range"]::-moz-range-thumb {
      -webkit-appearance: none;
      width: 0.72rem;
      height: 1.05rem;
      border-width: 0;
      border-radius: 0.2rem;
      background: rgba(255, 255, 255, 0.9);
      box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.08),
        0 3px 10px rgba(0, 0, 0, 0.18);
    }

    #display-setting input[type="range"]::-moz-range-thumb:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    #display-setting input[type="range"]::-moz-range-thumb:active {
      background: rgba(255, 255, 255, 0.6);
    }

    #display-setting input[type="range"]::-ms-thumb {
      -webkit-appearance: none;
      width: 0.72rem;
      height: 1.05rem;
      border-radius: 0.2rem;
      background: rgba(255, 255, 255, 0.9);
      box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.08),
        0 3px 10px rgba(0, 0, 0, 0.18);
    }

    #display-setting input[type="range"]::-ms-thumb:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    #display-setting input[type="range"]::-ms-thumb:active {
      background: rgba(255, 255, 255, 0.6);
    }
</style>
