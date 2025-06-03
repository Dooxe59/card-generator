<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-gray-800">
          Générateur de Cartes - Royaume des Guildes
        </h1>
        <NuxtLink
          to="/saved"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Cartes sauvegardées
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Formulaire -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <CardForm
            v-model:cardData="cardData"
            v-model:cardType="cardType"
            @load-preset="loadPreset"
            @export-card="exportCard"
          />
        </div>

        <!-- Prévisualisation -->
        <div class="flex justify-center">
          <CardPreview
            :card-data="cardData"
            :card-type="cardType"
            ref="cardPreview"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cardType = ref("artisan");
const cardData = ref({
  name: "Herboriste",
  guild: "nature",
  cost: 2,
  production: 1,
  effect: "+2 pièces si vous n'accomplissez aucun contrat ce tour",
  level: "apprenti",
  points: 2,
  requirements: "2 artisans verts",
  eventType: "permanent",
});

const cardPreview = ref(null);

const loadPreset = (preset) => {
  cardData.value = { ...cardData.value, ...preset };
};

const exportCard = () => {
  if (cardPreview.value) {
    cardPreview.value.exportToPNG();
  }
};
</script>
