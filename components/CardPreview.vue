<template>
  <div ref="cardElement" class="select-none">
    <!-- Carte Artisan -->
    <div
      v-if="cardType === 'artisan'"
      :class="[
        'w-64 h-96 rounded-xl shadow-2xl relative overflow-hidden border-4 flex flex-col',
        guildStyles[cardData.guild]?.gradient || 'card-gradient-forge',
        guildStyles[cardData.guild]?.borderColor || '!border-red-600',
      ]"
      style="print-color-adjust: exact"
    >
      <!-- Header avec nom de l'artisan -->
      <div
        :class="[
          'backdrop-blur-sm p-3 text-center border-b-2 border-white border-opacity-20 flex-shrink-0',
          guildStyles[cardData.guild]?.headerBg || 'bg-red-800 bg-opacity-70',
        ]"
      >
        <h2 class="text-white font-bold text-lg tracking-wider drop-shadow-lg">
          {{ cardData.name?.toUpperCase() || "ARTISAN" }}
        </h2>
      </div>

      <!-- Zone d'illustration centrale avec icône de guilde -->
      <div
        class="h-4 m-4 mt-6 bg-white bg-opacity-15 rounded-lg border-2 border-white border-opacity-30 backdrop-blur-sm flex items-center justify-center relative overflow-hidden flex-shrink-0"
      >
        <div class="text-8xl opacity-80">
          {{ guildStyles[cardData.guild]?.icon || "🔨" }}
        </div>
      </div>

      <!-- Section Coût -->
      <div class="mx-4 mb-3 flex-shrink-0">
        <div
          class="bg-amber-600 text-white px-3 py-2 rounded-lg text-center font-bold shadow-md border border-amber-700"
        >
          <div class="flex items-center justify-center gap-2">
            <span class="text-sm">COÛT</span>
            <span class="text-xl">{{ cardData.cost }}</span>
          </div>
        </div>
      </div>

      <!-- Section Production -->
      <div class="mx-4 mb-3 flex-shrink-0">
        <div
          class="bg-blue-600 text-white px-3 py-2 rounded-lg text-center font-bold shadow-md border border-blue-700"
        >
          <div class="flex items-center justify-center gap-2">
            <span class="text-sm">PRODUCTION</span>
            <span class="text-xl">{{ cardData.production }}</span>
          </div>
        </div>
      </div>

      <!-- Zone d'effet - prend toute la hauteur restante -->
      <div class="mx-4 mb-4 flex-1 flex flex-col">
        <div
          class="bg-white bg-opacity-95 p-3 rounded-lg shadow-md border border-gray-200 flex-1 flex flex-col"
        >
          <div class="flex items-start gap-2 mb-2 flex-shrink-0">
            <div
              class="text-xs font-bold text-gray-700 underline uppercase tracking-wide"
            >
              EFFET SPÉCIAL
            </div>
          </div>
          <div class="flex-1 flex items-baseline">
            <p class="text-xs text-gray-800 leading-tight font-medium">
              {{
                cardData.effect === "-"
                  ? "Aucun effet spécial"
                  : cardData.effect
              }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Carte Contrat -->
    <div
      v-else-if="cardType === 'contract'"
      class="w-64 h-96 rounded-xl shadow-2xl relative overflow-hidden bg-gradient-to-br from-blue-800 to-blue-900 border-4 border-contract flex flex-col"
    >
      <!-- Header -->
      <div
        class="bg-contract-light bg-opacity-90 p-3 text-center border-b-2 border-contract-light flex-shrink-0"
      >
        <h2 class="text-white font-bold text-lg tracking-wider">
          {{ cardData.name?.toUpperCase() || "CONTRAT" }}
        </h2>
        <div class="text-blue-100 text-sm font-medium mt-1">
          CONTRAT
          {{ contractLevels[cardData.level]?.name.toUpperCase() || "APPRENTI" }}
        </div>
      </div>

      <!-- Zone centrale -->
      <div
        class="h-5 m-4 mt-6 bg-white bg-opacity-10 rounded-lg border-2 border-contract-light backdrop-blur-sm flex items-center justify-center flex-shrink-0"
      >
        <div class="text-6xl opacity-40">📜</div>
      </div>

      <!-- Conditions requises - prend toute la hauteur disponible -->
      <div class="mx-4 mb-4 flex-1 flex flex-col">
        <div
          class="bg-white bg-opacity-95 p-4 rounded-lg shadow-md flex-1 flex flex-col border-contract"
        >
          <div class="flex items-center gap-3 mb-3 flex-shrink-0">
            <div class="flex items-start gap-2 mb-2 flex-shrink-0">
              <div
                class="text-xs font-bold text-gray-700 uppercase underline tracking-wide"
              >
                CONDITIONS REQUISES
              </div>
            </div>
          </div>
          <div class="flex-1 flex items-baselineitems">
            <div class="w-full">
              <div class="bg-gray-50">
                <p class="text-sm text-gray-800 font-medium leading-relaxed">
                  {{ cardData.requirements || "Aucune condition spécifiée" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Badge niveau avec points de victoire - maintenant sur toute la largeur -->
      <div
        class="absolute bottom-2 left-2 right-2 px-3 py-2 rounded-lg text-sm font-bold text-white shadow-md text-center flex items-center justify-center gap-2"
        :class="contractLevels[cardData.level]?.bgColor || 'bg-contract'"
      >
        <span>Points de victoire: {{ cardData.points || 0 }}</span>
      </div>
    </div>

    <!-- Carte Événement -->
    <div
      v-else-if="cardType === 'event'"
      class="w-64 h-96 rounded-xl shadow-2xl relative overflow-hidden bg-gradient-to-br from-purple-700 to-purple-900 border-4 border-event flex flex-col"
    >
      <!-- Header -->
      <div
        class="bg-event-light bg-opacity-90 p-3 text-center border-b-2 border-event-light flex-shrink-0"
      >
        <div class="text-purple-200 text-sm font-bold mb-1">ÉVÉNEMENT</div>
        <h2 class="text-white font-bold text-lg tracking-wider">
          {{ cardData.name?.toUpperCase() || "ÉVÉNEMENT" }}
        </h2>
      </div>

      <!-- Zone centrale -->
      <div
        class="h-4 m-4 mt-16 bg-white bg-opacity-10 rounded-lg border-2 border-event-light backdrop-blur-sm flex items-center justify-center flex-shrink-0"
      >
        <div class="text-6xl opacity-50">⚡</div>
      </div>

      <!-- Effet de l'événement - prend toute la hauteur disponible -->
      <div class="mx-4 mb-4 flex-1 flex flex-col">
        <div
          class="bg-white bg-opacity-95 p-4 rounded-lg shadow-md flex-1 flex flex-col"
        >
          <div class="flex items-start gap-2 mb-2 flex-shrink-0">
            <div
              class="text-xs font-bold text-gray-700 underline uppercase tracking-wide"
            >
              EFFET
            </div>
          </div>
          <div class="flex-1 flex items-baseline">
            <p class="text-sm text-gray-800 font-medium leading-tight">
              {{ cardData.effect || "Aucun effet spécifié" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import html2canvas from "html2canvas";

const props = defineProps(["cardData", "cardType"]);

const cardElement = ref(null);

// Styles des guildes
const guildStyles = {
  forge: {
    gradient: "card-gradient-forge",
    bgColor: "bg-red-600",
    borderColor: "!border-red-600",
    headerBg: "bg-red-800 bg-opacity-70",
    icon: "🔨",
    color: "#C1440E",
  },
  commerce: {
    gradient: "card-gradient-commerce",
    bgColor: "bg-yellow-600",
    borderColor: "!border-yellow-600",
    headerBg: "bg-yellow-700 bg-opacity-70",
    icon: "💰",
    color: "#D4AF37",
  },
  artisanat: {
    gradient: "card-gradient-artisanat",
    bgColor: "bg-slate-500",
    borderColor: "!border-slate-500",
    headerBg: "bg-slate-700 bg-opacity-70",
    icon: "🛠",
    color: "#708090",
  },
  nature: {
    gradient: "card-gradient-nature",
    bgColor: "bg-green-600",
    borderColor: "!border-green-600",
    headerBg: "bg-green-800 bg-opacity-70",
    icon: "🌿",
    color: "#228B22",
  },
};

// Niveaux de contrats
const contractLevels = {
  apprenti: { name: "Apprenti", bgColor: "bg-blue-500" },
  maitre: { name: "Maître", bgColor: "bg-purple-600" },
  legendaire: { name: "Légendaire", bgColor: "bg-pink-600" },
};

// Fonction d'export
const exportToPNG = async () => {
  if (!cardElement.value) return;

  try {
    const canvas = await html2canvas(cardElement.value, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      logging: false,
    });

    // Créer un lien de téléchargement
    const link = document.createElement("a");
    link.download = `${props.cardData.name || "carte"}.png`;
    link.href = canvas.toDataURL();
    link.click();
  } catch (error) {
    console.error("Erreur lors de l'export:", error);
    alert("Erreur lors de l'export de la carte");
  }
};

// Exposer la fonction pour le composant parent
defineExpose({
  exportToPNG,
});
</script>

<style scoped>
/* Styles personnalisés pour l'impression */
@media print {
  .w-64 {
    width: 16rem !important;
  }
  .h-96 {
    height: 24rem !important;
  }
}
</style>
