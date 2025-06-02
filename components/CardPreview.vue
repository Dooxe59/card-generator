<template>
  <div ref="cardElement" class="select-none">
    <!-- Carte Artisan -->
    <div
      v-if="cardType === 'artisan'"
      :class="[
        'w-64 h-96 rounded-xl shadow-2xl relative overflow-hidden border-4',
        guildStyles[cardData.guild]?.gradient || 'card-gradient-forge',
        `border-${cardData.guild}`,
      ]"
      style="print-color-adjust: exact"
    >
      <!-- Header avec nom -->
      <div
        class="bg-black bg-opacity-30 backdrop-blur-sm p-3 text-center border-b-2 border-white border-opacity-20"
      >
        <h2 class="text-white font-bold text-lg tracking-wider drop-shadow-lg">
          {{ cardData.name.toUpperCase() }}
        </h2>
      </div>

      <!-- Coût (cercle en haut à gauche) -->
      <div
        class="absolute top-16 left-4 w-12 h-12 rounded-full bg-amber-100 border-3 border-amber-800 flex items-center justify-center text-2xl font-bold shadow-lg z-10"
      >
        <span class="text-amber-900">{{ cardData.cost }}</span>
      </div>

      <!-- Icône de guilde (cercle en haut à droite) -->
      <div
        class="absolute top-16 right-4 w-12 h-12 rounded-full bg-white bg-opacity-95 border-2 border-gray-300 flex items-center justify-center text-2xl shadow-lg z-10"
      >
        {{ guildStyles[cardData.guild]?.icon || "🔨" }}
      </div>

      <!-- Zone d'illustration centrale -->
      <div
        class="h-44 m-4 mt-20 bg-white bg-opacity-15 rounded-lg border-2 border-white border-opacity-30 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
      >
        <!-- Motif de fond -->
        <div class="absolute inset-0 opacity-10">
          <div class="w-full h-full flex items-center justify-center">
            <div class="text-8xl">
              {{ guildStyles[cardData.guild]?.icon || "🔨" }}
            </div>
          </div>
        </div>
        <!-- Illustration principale -->
        <div class="relative z-10 text-6xl opacity-60 drop-shadow-lg">
          {{ guildStyles[cardData.guild]?.icon || "🔨" }}
        </div>
      </div>

      <!-- Section Production -->
      <div class="mx-4 mb-3">
        <div
          class="bg-blue-600 text-white px-3 py-2 rounded-lg text-center font-bold shadow-md border border-blue-700"
        >
          <div class="flex items-center justify-center gap-2">
            <span class="text-sm">PRODUCTION</span>
            <span class="text-xl">{{ cardData.production }}</span>
          </div>
        </div>
      </div>

      <!-- Zone d'effet -->
      <div class="mx-4 mb-4">
        <div
          class="bg-white bg-opacity-95 p-3 rounded-lg shadow-md border border-gray-200"
        >
          <div class="flex items-start gap-2 mb-1">
            <div
              class="w-6 h-6 rounded-full flex items-center justify-center text-sm"
              :class="guildStyles[cardData.guild]?.bgColor || 'bg-red-600'"
            >
              <span class="text-white">{{
                guildStyles[cardData.guild]?.icon || "🔨"
              }}</span>
            </div>
            <div class="flex-1">
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

      <!-- Badge de coût en bas -->
      <div
        class="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-md"
      >
        {{ cardData.cost }}
      </div>
    </div>

    <!-- Carte Contrat -->
    <div
      v-else-if="cardType === 'contract'"
      class="w-64 h-96 rounded-xl shadow-2xl relative overflow-hidden bg-gradient-to-br from-blue-800 to-blue-900 border-4 border-blue-700"
    >
      <!-- Header -->
      <div
        class="bg-black bg-opacity-40 p-3 text-center border-b-2 border-blue-400"
      >
        <h2 class="text-white font-bold text-lg tracking-wider">
          {{ cardData.name.toUpperCase() }}
        </h2>
        <div class="text-blue-200 text-sm font-medium mt-1">
          CONTRAT
          {{ contractLevels[cardData.level]?.name.toUpperCase() || "APPRENTI" }}
        </div>
      </div>

      <!-- Points de victoire (grand cercle) -->
      <div
        class="absolute top-20 right-4 w-16 h-16 rounded-full bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center shadow-lg z-10"
      >
        <div class="text-center">
          <div class="text-2xl font-bold text-yellow-900">
            {{ cardData.points }}
          </div>
          <div class="text-xs text-yellow-800 font-bold">PTS</div>
        </div>
      </div>

      <!-- Zone centrale -->
      <div
        class="h-48 m-4 mt-20 bg-white bg-opacity-10 rounded-lg border-2 border-blue-400 backdrop-blur-sm flex items-center justify-center"
      >
        <div class="text-6xl opacity-40">📜</div>
      </div>

      <!-- Conditions requises -->
      <div class="mx-4 mb-4">
        <div class="bg-white bg-opacity-95 p-4 rounded-lg shadow-md">
          <h4
            class="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"
          >
            <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
            CONDITIONS REQUISES
          </h4>
          <p class="text-sm text-gray-800 font-medium leading-tight">
            {{ cardData.requirements || "Aucune condition spécifiée" }}
          </p>
        </div>
      </div>

      <!-- Badge niveau -->
      <div
        class="absolute bottom-2 left-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
        :class="contractLevels[cardData.level]?.bgColor || 'bg-blue-600'"
      >
        {{ contractLevels[cardData.level]?.name || "Apprenti" }}
      </div>
    </div>

    <!-- Carte Événement -->
    <div
      v-else-if="cardType === 'event'"
      class="w-64 h-96 rounded-xl shadow-2xl relative overflow-hidden bg-gradient-to-br from-purple-700 to-purple-900 border-4 border-purple-600"
    >
      <!-- Header -->
      <div
        class="bg-black bg-opacity-40 p-3 text-center border-b-2 border-purple-400"
      >
        <div class="text-purple-200 text-sm font-bold mb-1">ÉVÉNEMENT</div>
        <h2 class="text-white font-bold text-lg tracking-wider">
          {{ cardData.name.toUpperCase() }}
        </h2>
      </div>

      <!-- Icône événement -->
      <div
        class="absolute top-20 right-4 w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center text-2xl shadow-lg"
      >
        ⚡
      </div>

      <!-- Zone centrale -->
      <div
        class="h-48 m-4 mt-16 bg-white bg-opacity-10 rounded-lg border-2 border-purple-400 backdrop-blur-sm flex items-center justify-center"
      >
        <div class="text-6xl opacity-50">⚡</div>
      </div>

      <!-- Effet de l'événement -->
      <div class="mx-4 mb-4">
        <div class="bg-white bg-opacity-95 p-4 rounded-lg shadow-md">
          <h4
            class="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"
          >
            <span class="w-2 h-2 bg-purple-600 rounded-full"></span>
            EFFET
          </h4>
          <p class="text-sm text-gray-800 font-medium leading-tight">
            {{ cardData.effect || "Aucun effet spécifié" }}
          </p>
        </div>
      </div>

      <!-- Badge événement -->
      <div
        class="absolute bottom-2 left-2 px-3 py-1 bg-purple-600 rounded-full text-xs font-bold text-white shadow-md"
      >
        ÉVÉNEMENT
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
    icon: "🔨",
    color: "#C1440E",
  },
  commerce: {
    gradient: "card-gradient-commerce",
    bgColor: "bg-yellow-600",
    icon: "💰",
    color: "#D4AF37",
  },
  artisanat: {
    gradient: "card-gradient-artisanat",
    bgColor: "bg-slate-500",
    icon: "🛠",
    color: "#708090",
  },
  nature: {
    gradient: "card-gradient-nature",
    bgColor: "bg-green-600",
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
