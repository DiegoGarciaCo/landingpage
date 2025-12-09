import { LeadFormData, ApiResponse, LeadSubmissionResponse } from '../definitions/types';

/**
 * Submit lead information via the Next.js API route
 *
 * This function calls the Next.js API route (/api/leads) which securely
 * forwards the request to the Golang backend with the API key.
 * This keeps the API key secure on the server side.
 *
 * @param formData - The lead form data to submit
 * @returns Promise with API response
 */
export async function submitLead(
    formData: LeadFormData
): Promise<ApiResponse<LeadSubmissionResponse>> {
    try {
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || `HTTP error! status: ${response.status}`,
                message: data.message || 'Failed to submit your information. Please try again.',
            };
        }

        return data;
    } catch (error) {
        console.error('Error submitting lead:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
            message: 'Failed to submit your information. Please try again.',
        };
    }
}

