const API_BASE_URL = 'https://35.207.211.198.nip.io/api/v1';

interface QueryParams {
  query: string;
  limit?: number;
  offset?: number;
  order_by?: string;
}

interface Citation {
  number: number;
  url: string;
  text: string;
  title: string;
}

interface GenerateResponse {
  answer: string;
  conversation_id: string;
  message_history: Array<{ role: string; content: string }>;
  citations: Citation[];
  sources: string[];
  query_params: QueryParams;
}

export const api = {
  async search(params: QueryParams) {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Search failed');
    }
    return response.json();
  },

  async generate(params: QueryParams, conversationId?: string): Promise<GenerateResponse> {
    const url = `${API_BASE_URL}/generate${conversationId ? `?conversation_id=${conversationId}` : ''}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Generation failed');
    }
    return response.json();
  },

  async getConversation(conversationId: string) {
    const response = await fetch(`${API_BASE_URL}/conversation/${conversationId}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to fetch conversation');
    }
    return response.json();
  },

  async deleteConversation(conversationId: string) {
    const response = await fetch(`${API_BASE_URL}/conversation/${conversationId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to delete conversation');
    }
    return response.json();
  },
};
