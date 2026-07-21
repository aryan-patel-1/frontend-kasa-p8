import {
  getApiConversationById,
  getApiConversations,
} from "@/api/conversations";
import { getApiFavoriteProperties } from "@/api/favorites";
import {
  getApiProperties,
  getApiPropertyById,
} from "@/api/properties";
import { getApiPropertyFormOptions } from "@/api/property-form-options";
import { mockConversations } from "@/mocks/conversations";
import { mockFavoritePropertyIds } from "@/mocks/favorites";
import { mockProperties } from "@/mocks/properties";
import { mockPropertyFormOptions } from "@/mocks/property-form-options";
import type { Conversation } from "@/types/message";
import type { Property } from "@/types/property";
import type { PropertyFormOptions } from "@/types/property-form-options";

// Impose les mêmes méthodes aux données mockées et aux données API
type DataProvider = {
  getProperties: () => Promise<Property[]>;
  getPropertyById: (id: string) => Promise<Property | null>;
  getFavoriteProperties: () => Promise<Property[]>;
  getConversations: () => Promise<Conversation[]>;
  getConversationById: (id: string) => Promise<Conversation | null>;
  getPropertyFormOptions: () => Promise<PropertyFormOptions>;
};

// Lit uniquement les fichiers locaux du dossier mocks
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

// Relie chaque méthode aux fichiers réseau encore à compléter
const apiDataProvider: DataProvider = {
  getProperties: getApiProperties,
  getPropertyById: getApiPropertyById,
  getFavoriteProperties: getApiFavoriteProperties,
  getConversations: getApiConversations,
  getConversationById: getApiConversationById,
  getPropertyFormOptions: getApiPropertyFormOptions,
};

// Active les mocks par défaut pour garder le frontend utilisable seul
export const USE_MOCK = process.env.USE_MOCK?.toLowerCase() !== "false";

export const dataProvider = USE_MOCK ? mockDataProvider : apiDataProvider;
