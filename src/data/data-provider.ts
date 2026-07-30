import {
  getApiProperties,
  getApiPropertyById,
} from "@/api/properties";
import { mockConversations } from "@/mocks/conversations";
import { mockFavoritePropertyIds } from "@/mocks/favorites";
import { mockProperties } from "@/mocks/properties";
import { mockPropertyFormOptions } from "@/mocks/property-form-options";
import type { Conversation } from "@/types/message";
import type { Property } from "@/types/property";
import type { PropertyFormOptions } from "@/types/property-form-options";

// Garantit que le mock et l'API fournissent les mêmes méthodes aux pages
type DataProvider = {
  getProperties: () => Promise<Property[]>;
  getPropertyById: (id: string) => Promise<Property | null>;
  getFavoriteProperties: () => Promise<Property[]>;
  getConversations: () => Promise<Conversation[]>;
  getConversationById: (id: string) => Promise<Conversation | null>;
  getPropertyFormOptions: () => Promise<PropertyFormOptions>;
};

// Retourne les données locales sans effectuer de requête réseau
const mockDataProvider: DataProvider = {
  async getProperties() {
    return [...mockProperties];
  },

  async getPropertyById(id: string) {
    return (
      mockProperties.find(
        (property) => property.id === id || property.slug === id,
      ) ?? null
    );
  },

  async getFavoriteProperties() {
    return mockProperties.filter((property) =>
      mockFavoritePropertyIds.includes(property.id),
    );
  },

  async getConversations() {
    return [...mockConversations];
  },

  async getConversationById(id: string) {
    return (
      mockConversations.find((conversation) => conversation.id === id) ?? null
    );
  },

  async getPropertyFormOptions() {
    return {
      equipments: [...mockPropertyFormOptions.equipments],
      categories: [...mockPropertyFormOptions.categories],
    };
  },
};

// Remplace seulement les méthodes dont les routes API sont prêtes
const apiDataProvider: DataProvider = {
  ...mockDataProvider,
  getProperties: getApiProperties,
  getPropertyById: getApiPropertyById,
};

// true utilise les mocks et false utilise le backend local
export const USE_MOCK = false;

// Les pages utilisent toujours ce fournisseur sans connaître la source choisie
export const dataProvider = USE_MOCK ? mockDataProvider : apiDataProvider;
