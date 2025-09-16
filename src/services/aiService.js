import api from "./axios"; 

/**
 * FEATURE 1: 
 */
export const getAIInsights = async (stats) => {
    
    const response = await api.post('/api/ai/insights', { stats });
    return response.data; 
};

/**
 * FEATURE 2: 
 */
export const generateAIPersona = async (audienceQuery) => {
    
    const response = await api.post('/api/ai/persona', { audienceQuery });
    return response.data; 
};

