<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">
        Générateur de Cartes - Royaume des Guildes
      </h1>

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
