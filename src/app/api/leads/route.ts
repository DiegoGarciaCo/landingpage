import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validations/lead-form';
import { z } from 'zod';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const X_API_KEY = process.env.X_API_KEY;

/**
 * POST /api/leads
 *
 * This API route acts as a secure proxy between the client and the Golang backend.
 * It keeps the API key secure on the server side while allowing the client to submit leads.
 */
export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const body = await request.json();
        const formData = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phone,
        };
        const source = body.source || 'Landing Page';


        // Validate the request data
        let validatedData;
        try {
            validatedData = leadFormSchema.parse(formData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Validation failed',
                        message: 'Please check your form data and try again.',
                    },
                    { status: 400 }
                );
            }
            throw error;
        }

        // Check if environment variables are configured
        if (!BASE_URL || !X_API_KEY) {
            console.error(`Missing environment variables: ${!BASE_URL ? 'BASE_URL ' : ''}${!X_API_KEY ? 'X_API_KEY' : ''}`);
            return NextResponse.json(
                {
                    success: false,
                    error: 'Server configuration error',
                    message: 'The server is not properly configured. Please contact support.',
                },
                { status: 500 }
            );
        }

        // Forward the request to the Golang backend
        const response = await fetch(`${BASE_URL}/landing-page-form?source=${source}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': X_API_KEY,
            },
            body: JSON.stringify({
                first_name: validatedData.firstName,
                last_name: validatedData.lastName,
                email: validatedData.email,
                phone_number: validatedData.phoneNumber,
            }),
        });

        // Handle non-OK responses from the backend
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Backend API error:', response.status, errorData);

            return NextResponse.json(
                {
                    success: false,
                    error: `Backend error: ${response.status}`,
                    message: errorData.message || 'Failed to submit your information. Please try again.',
                },
                { status: response.status }
            );
        }

        // Parse and return the successful response
        const data = await response.json();

        return NextResponse.json({
            success: true,
            message: 'Thank you! We\'ll be in touch soon.',
            data: data,
        });

    } catch (error) {
        console.error('Error in API route:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
                message: 'Failed to submit your information. Please try again.',
            },
            { status: 500 }
        );
    }
}

