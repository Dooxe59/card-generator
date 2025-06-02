<template>
  <div class="space-y-6">
    <!-- Sélecteur de type de carte -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Type de carte</label
      >
      <select
        v-model="cardType"
        @change="onCardTypeChange"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="artisan">Artisan</option>
        <option value="contract">Contrat</option>
        <option value="event">Événement</option>
      </select>
    </div>

    <!-- Presets -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Cartes prédéfinies</label
      >
      <select
        @change="loadPresetCard"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Choisir une carte existante...</option>
        <option
          v-for="(preset, index) in currentPresets"
          :key="index"
          :value="index"
        >
          {{ preset.name }}
        </option>
      </select>
    </div>

    <!-- Formulaire Artisan -->
    <div v-if="cardType === 'artisan'" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Nom de l'artisan</label
        >
        <input
          v-model="cardData.name"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Guilde</label
        >
        <select
          v-model="cardData.guild"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="forge">🔨 Forge (Rouge)</option>
          <option value="commerce">💰 Commerce (Jaune)</option>
          <option value="artisanat">🛠 Artisanat (Gris)</option>
          <option value="nature">🌿 Nature (Vert)</option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Coût</label
          >
          <input
            v-model.number="cardData.cost"
            type="number"
            min="0"
            max="6"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Production</label
          >
          <input
            v-model.number="cardData.production"
            type="number"
            min="1"
            max="5"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Effet spécial</label
        >
        <textarea
          v-model="cardData.effect"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Formulaire Contrat -->
    <div v-if="cardType === 'contract'" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Nom du contrat</label
        >
        <input
          v-model="cardData.name"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Niveau</label
        >
        <select
          v-model="cardData.level"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="apprenti">Apprenti (2-3 points)</option>
          <option value="maitre">Maître (4-5 points)</option>
          <option value="legendaire">Légendaire (6-8 points)</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Points de victoire</label
        >
        <input
          v-model.number="cardData.points"
          type="number"
          min="2"
          max="8"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Conditions requises</label
        >
        <textarea
          v-model="cardData.requirements"
          rows="2"
          placeholder="Ex: 2 artisans rouges"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Formulaire Événement -->
    <div v-if="cardType === 'event'" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Nom de l'événement</label
        >
        <input
          v-model="cardData.name"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Effet</label
        >
        <textarea
          v-model="cardData.effect"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-4 pt-4">
      <button
        @click="$emit('export-card')"
        class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Exporter PNG
      </button>
      <button
        @click="saveCard"
        class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
      >
        Sauvegarder
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["cardData", "cardType"]);
const emit = defineEmits([
  "update:cardData",
  "update:cardType",
  "load-preset",
  "export-card",
]);

// Modèles réactifs
const cardType = computed({
  get: () => props.cardType,
  set: (value) => emit("update:cardType", value),
});

const cardData = computed({
  get: () => props.cardData,
  set: (value) => emit("update:cardData", value),
});

// Données prédéfinies basées sur votre document
const presets = {
  artisan: [
    {
      name: "Apprenti Forgeron",
      guild: "forge",
      cost: 0,
      production: 1,
      effect: "-",
    },
    { name: "Forgeron", guild: "forge", cost: 1, production: 2, effect: "-" },
    {
      name: "Armurier",
      guild: "forge",
      cost: 2,
      production: 2,
      effect: "Les contrats Apprenti coûtent -1 pièce",
    },
    {
      name: "Maître Forgeron",
      guild: "forge",
      cost: 3,
      production: 3,
      effect: "Les autres artisans rouges coûtent -1 pièce",
    },
    {
      name: "Gardien de la Forge",
      guild: "forge",
      cost: 5,
      production: 3,
      effect: "+1 pièce par artisan rouge adverse",
    },
    {
      name: "Herboriste",
      guild: "nature",
      cost: 2,
      production: 1,
      effect: "+2 pièces si vous n'accomplissez aucun contrat ce tour",
    },
    {
      name: "Maître Marchand",
      guild: "commerce",
      cost: 3,
      production: 3,
      effect: "Les autres artisans jaunes coûtent -1 pièce",
    },
    {
      name: "Potier",
      guild: "artisanat",
      cost: 2,
      production: 2,
      effect: "Piochez 1 carte à la production",
    },
  ],
  contract: [
    {
      name: "Première Commande",
      level: "apprenti",
      points: 2,
      requirements: "2 artisans rouges",
    },
    {
      name: "Commerce Local",
      level: "apprenti",
      points: 2,
      requirements: "2 artisans jaunes",
    },
    {
      name: "Alliance Forge-Commerce",
      level: "apprenti",
      points: 3,
      requirements: "1 rouge + 1 jaune",
    },
    {
      name: "Triangle d'Or",
      level: "maitre",
      points: 5,
      requirements: "1 rouge + 1 jaune + 1 gris",
    },
    {
      name: "Empire Commercial",
      level: "maitre",
      points: 4,
      requirements: "3 artisans jaunes",
    },
    {
      name: "Maître de Toutes Guildes",
      level: "legendaire",
      points: 8,
      requirements: "2 rouge + 2 jaune + 2 gris + 2 vert",
    },
  ],
  event: [
    {
      name: "Foire Royale",
      effect: "Tous les artisans coûtent -1 pièce ce tour",
    },
    {
      name: "Guerre des Guildes",
      effect: "La guilde majoritaire produit +1 pièce par artisan",
    },
    { name: "Épidémie", effect: "Défaussez 1 artisan au hasard" },
    { name: "Prospérité", effect: "Tout le monde gagne 3 pièces" },
    { name: "Fin des Temps", effect: "Dernier tour après cette manche !" },
  ],
};

// Computed pour les presets actuels
const currentPresets = computed(() => {
  return presets[cardType.value] || [];
});

// Fonction pour charger un preset
const loadPresetCard = (event) => {
  const presetIndex = event.target.value;
  if (presetIndex !== "") {
    const preset = currentPresets.value[presetIndex];
    if (preset) {
      emit("load-preset", preset);
    }
  }
  // Reset le select
  event.target.value = "";
};

// Fonction pour changer le type de carte
const onCardTypeChange = () => {
  // Optionnel: réinitialiser les dados quand on change de type
};

// Fonction de sauvegarde
const saveCard = () => {
  // Pour l'instant, on sauvegarde dans le localStorage
  try {
    const savedCards = JSON.parse(localStorage.getItem("saved-cards") || "[]");
    const cardToSave = {
      type: cardType.value,
      data: { ...cardData.value },
      savedAt: new Date().toISOString(),
    };
    savedCards.push(cardToSave);
    localStorage.setItem("saved-cards", JSON.stringify(savedCards));
    alert("Carte sauvegardée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
    alert("Erreur lors de la sauvegarde de la carte");
  }
};
</script>
