<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-gray-800">Cartes Sauvegardées</h1>
        <NuxtLink
          to="/"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Créer une nouvelle carte
        </NuxtLink>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-2xl font-bold text-blue-600">
            {{ savedCards.length }}
          </div>
          <div class="text-sm text-gray-600">Total des cartes</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-2xl font-bold text-red-600">
            {{ getCardsByType("artisan").length }}
          </div>
          <div class="text-sm text-gray-600">Artisans</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-2xl font-bold text-blue-600">
            {{ getCardsByType("contract").length }}
          </div>
          <div class="text-sm text-gray-600">Contrats</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-2xl font-bold text-purple-600">
            {{ getCardsByType("event").length }}
          </div>
          <div class="text-sm text-gray-600">Événements</div>
        </div>
      </div>

      <!-- Filtres -->
      <div class="bg-white rounded-lg shadow p-4 mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Filtrer par type</label
            >
            <select
              v-model="filterType"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les types</option>
              <option value="artisan">Artisan</option>
              <option value="contract">Contrat</option>
              <option value="event">Événement</option>
            </select>
          </div>

          <div v-if="filterType === 'artisan'">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Filtrer par guilde</label
            >
            <select
              v-model="filterGuild"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les guildes</option>
              <option value="forge">🔨 Forge</option>
              <option value="commerce">💰 Commerce</option>
              <option value="artisanat">🛠 Artisanat</option>
              <option value="nature">🌿 Nature</option>
            </select>
          </div>

          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Rechercher</label
            >
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Nom de la carte..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Effacer les filtres
            </button>
          </div>
        </div>
      </div>

      <!-- Message si aucune carte -->
      <div v-if="savedCards.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">📋</div>
        <h2 class="text-2xl font-bold text-gray-600 mb-2">
          Aucune carte sauvegardée
        </h2>
        <p class="text-gray-500 mb-4">
          Créez votre première carte pour commencer votre collection !
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Créer une carte
        </NuxtLink>
      </div>

      <!-- Liste des cartes filtrées -->
      <div v-else-if="filteredCards.length === 0" class="text-center py-12">
        <div class="text-4xl mb-4">🔍</div>
        <h2 class="text-xl font-bold text-gray-600 mb-2">
          Aucune carte trouvée
        </h2>
        <p class="text-gray-500">
          Essayez de modifier vos critères de recherche.
        </p>
      </div>

      <!-- Grille des cartes -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="(card, index) in filteredCards"
          :key="index"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <!-- Prévisualisation miniature -->
          <div class="p-4 flex justify-center bg-gray-50">
            <div class="transform scale-50 origin-top">
              <CardPreview :card-data="card.data" :card-type="card.type" />
            </div>
          </div>

          <!-- Informations de la carte -->
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-bold text-lg truncate">
                {{ card.data.name || "Sans nom" }}
              </h3>
              <span
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="getTypeStyle(card.type)"
              >
                {{ getTypeLabel(card.type) }}
              </span>
            </div>

            <div
              v-if="card.type === 'artisan'"
              class="text-sm text-gray-600 mb-3"
            >
              <div class="flex items-center gap-2">
                <span>{{ getGuildIcon(card.data.guild) }}</span>
                <span>{{ getGuildName(card.data.guild) }}</span>
              </div>
              <div class="flex gap-4 mt-1">
                <span>Coût: {{ card.data.cost }}</span>
                <span>Production: {{ card.data.production }}</span>
              </div>
            </div>

            <div
              v-else-if="card.type === 'contract'"
              class="text-sm text-gray-600 mb-3"
            >
              <div>Niveau: {{ getContractLevelName(card.data.level) }}</div>
              <div>Points: {{ card.data.points }}</div>
            </div>

            <div class="text-xs text-gray-500 mb-4">
              Sauvegardé le {{ formatDate(card.savedAt) }}
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button
                @click="editCard(index)"
                class="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Modifier
              </button>

              <button
                @click="deleteCard(index)"
                class="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions en lot -->
      <div v-if="savedCards.length > 0" class="mt-8 text-center">
        <button
          @click="exportAllCards"
          class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mr-4"
        >
          Exporter toutes les cartes
        </button>
        <button
          @click="clearAllCards"
          class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Supprimer toutes les cartes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// États réactifs
const savedCards = ref([]);
const filterType = ref("");
const filterGuild = ref("");
const searchQuery = ref("");

// Charger les cartes depuis le localStorage
const loadSavedCards = () => {
  try {
    const cards = JSON.parse(localStorage.getItem("saved-cards") || "[]");
    savedCards.value = cards;
  } catch (error) {
    console.error("Erreur lors du chargement des cartes:", error);
    savedCards.value = [];
  }
};

// Cartes filtrées
const filteredCards = computed(() => {
  let cards = savedCards.value;

  // Filtrer par type
  if (filterType.value) {
    cards = cards.filter((card) => card.type === filterType.value);
  }

  // Filtrer par guilde (seulement pour les artisans)
  if (filterGuild.value && filterType.value === "artisan") {
    cards = cards.filter((card) => card.data.guild === filterGuild.value);
  }

  // Filtrer par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    cards = cards.filter(
      (card) =>
        card.data.name?.toLowerCase().includes(query) ||
        card.data.effect?.toLowerCase().includes(query) ||
        card.data.requirements?.toLowerCase().includes(query)
    );
  }

  return cards;
});

// Fonctions utilitaires
const getCardsByType = (type) => {
  return savedCards.value.filter((card) => card.type === type);
};

const clearFilters = () => {
  filterType.value = "";
  filterGuild.value = "";
  searchQuery.value = "";
};

const getTypeLabel = (type) => {
  const labels = {
    artisan: "Artisan",
    contract: "Contrat",
    event: "Événement",
  };
  return labels[type] || type;
};

const getTypeStyle = (type) => {
  const styles = {
    artisan: "bg-red-100 text-red-800",
    contract: "bg-blue-100 text-blue-800",
    event: "bg-purple-100 text-purple-800",
  };
  return styles[type] || "bg-gray-100 text-gray-800";
};

const getGuildIcon = (guild) => {
  const icons = {
    forge: "🔨",
    commerce: "💰",
    artisanat: "🛠",
    nature: "🌿",
  };
  return icons[guild] || "❓";
};

const getGuildName = (guild) => {
  const names = {
    forge: "Forge",
    commerce: "Commerce",
    artisanat: "Artisanat",
    nature: "Nature",
  };
  return names[guild] || guild;
};

const getContractLevelName = (level) => {
  const names = {
    apprenti: "Apprenti",
    maitre: "Maître",
    legendaire: "Légendaire",
  };
  return names[level] || level;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Actions sur les cartes
const deleteCard = (index) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
    savedCards.value.splice(index, 1);
    localStorage.setItem("saved-cards", JSON.stringify(savedCards.value));
  }
};

const clearAllCards = () => {
  if (
    confirm(
      "Êtes-vous sûr de vouloir supprimer TOUTES les cartes ? Cette action est irréversible."
    )
  ) {
    savedCards.value = [];
    localStorage.removeItem("saved-cards");
  }
};

const editCard = (index) => {
  // Stocker l'index de la carte à éditer
  localStorage.setItem("edit-card-index", index.toString());
  // Rediriger vers la page principale
  navigateTo("/");
};

// Fonction d'export des cartes (corrigée)
const exportAllCards = () => {
  try {
    // Créer un fichier JSON avec toutes les cartes
    const dataStr = JSON.stringify(savedCards.value, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `cartes-sauvegardees-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  } catch (error) {
    console.error("Erreur lors de l'export:", error);
    alert("Erreur lors de l'export des cartes");
  }
};

// Charger les cartes au montage du composant
onMounted(() => {
  loadSavedCards();
});
</script>
