/**
 * Type definitions for the realtor landing page
 */

export interface LeadFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface ApiResponse<T = void> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface LeadSubmissionResponse {
    success: boolean;
    requiresVerification?: boolean;
    email?: string;
    leadId?: string;
    timestamp?: string;
}

